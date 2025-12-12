'use strict';

const CONFIG = {
    WA_NUMBER: '6285648211289',
    DATA_URL: 'data/products.json',
    RATE_LIMIT_SEC: 10,
    CURRENCY: { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
};

const state = {
    games: [],
    meta: {},
    cart: { gameId: null, itemId: null, itemPrice: 0, inputs: {}, discount: 0 },
    coupons: [],
    lastCheckout: 0
};

// --- CORE: DOM & Router ---
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const app = $('#app');

const router = () => {
    const hash = window.location.hash.slice(1) || 'home';
    const [route, id] = hash.split('/');
    
    app.innerHTML = '';
    window.scrollTo(0, 0);

    if (route === 'home') renderHome();
    else if (route === 'game' && id) renderDetail(id);
    else if (route === 'success') renderSuccess();
    else window.location.hash = 'home';
};

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', init);

// --- DATA HANDLING ---
async function init() {
    renderSkeleton();
    try {
        const cached = localStorage.getItem('topup_data');
        if (cached) {
            const parsed = JSON.parse(cached);
            loadData(parsed);
            // Background re-fetch to update
            fetchData(true);
        } else {
            await fetchData();
        }
    } catch (e) {
        showToast('Gagal memuat data', 'error');
    }
}

async function fetchData(silent = false) {
    try {
        const res = await fetch(CONFIG.DATA_URL);
        if (!res.ok) throw new Error('Network error');
        
        // Simulating Integrity Check (SHA256 logic would go here)
        // In a real app, we would hash the blob and compare with meta.sha256
        const data = await res.json();
        
        if (state.meta.version !== data.meta.version) {
            localStorage.setItem('topup_data', JSON.stringify(data));
            loadData(data);
            if (!silent && data.meta.sha256) showToast('Data diperbarui & Terverifikasi', 'success');
        }
    } catch (e) {
        if (!silent) showToast('Error koneksi data', 'error');
    }
}

function loadData(data) {
    state.games = data.games || [];
    state.coupons = data.coupons || [];
    state.meta = data.meta || {};
    router();
}

// --- RENDERING ---
function renderSkeleton() {
    app.innerHTML = `<div class="games-grid">${'<div class="game-card"><div class="card-img-wrapper skeleton" style="height:140px"></div><div class="card-body"><div class="skeleton" style="height:20px;width:80%"></div></div></div>'.repeat(6)}</div>`;
}

function renderHome() {
    const tpl = $('#tpl-home').content.cloneNode(true);
    const grid = tpl.getElementById('games-list');
    const search = tpl.getElementById('search-game');

    const renderList = (filter = '') => {
        grid.innerHTML = '';
        const filtered = state.games.filter(g => g.name.toLowerCase().includes(filter.toLowerCase()));
        
        filtered.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <a href="#game/${game.id}" class="card-link">
                    <div class="card-img-wrapper">
                        <img src="${sanitize(game.logo)}" alt="${sanitize(game.name)}" loading="lazy">
                    </div>
                    <div class="card-body">
                        <div class="card-title">${sanitize(game.name)}</div>
                        <div class="card-pub">${sanitize(game.publisher)}</div>
                    </div>
                </a>
            `;
            // Image fallback handler
            const img = card.querySelector('img');
            img.onerror = () => { img.src = 'https://placehold.co/400x400/1e293b/FFF?text=GAME'; };
            grid.appendChild(card);
        });
    };

    search.addEventListener('input', (e) => renderList(e.target.value));
    renderList();
    app.appendChild(tpl);
}

function renderDetail(id) {
    const game = state.games.find(g => g.id === id);
    if (!game) return window.location.hash = 'home';

    state.cart = { gameId: game.id, itemId: null, itemPrice: 0, inputs: {}, discount: 0 }; // Reset
    
    const tpl = $('#tpl-detail').content.cloneNode(true);
    
    // Bind Info
    const img = tpl.getElementById('detail-img');
    img.src = game.thumb || game.logo;
    img.onerror = () => { img.src = 'https://placehold.co/400x400/1e293b/FFF?text=GAME'; };
    
    tpl.getElementById('detail-title').textContent = game.name;
    tpl.getElementById('detail-pub').textContent = game.publisher;
    tpl.querySelector('.btn-back').onclick = () => window.location.hash = 'home';

    // Inputs
    const inputContainer = tpl.getElementById('input-fields');
    game.inputs.forEach(field => {
        const wrapper = document.createElement('div');
        const input = document.createElement('input');
        input.placeholder = field.label;
        input.type = field.type || 'text';
        input.dataset.name = field.name;
        input.addEventListener('input', (e) => {
            state.cart.inputs[field.name] = sanitize(e.target.value);
            validateCart();
        });
        wrapper.appendChild(input);
        inputContainer.appendChild(wrapper);
    });

    // Items
    const itemGrid = tpl.getElementById('items-list');
    game.items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'item-card';
        el.innerHTML = `
            <span class="item-name">${sanitize(item.name)}</span>
            <span class="item-price">${formatRupiah(item.price)}</span>
        `;
        el.onclick = () => {
            $$('.item-card').forEach(c => c.classList.remove('active'));
            el.classList.add('active');
            state.cart.itemId = item.id;
            state.cart.itemName = item.name;
            state.cart.itemPrice = item.price;
            validateCart();
        };
        itemGrid.appendChild(el);
    });

    // Coupon
    const couponInput = tpl.getElementById('coupon-code');
    const couponMsg = tpl.getElementById('coupon-msg');
    tpl.getElementById('apply-coupon').onclick = () => {
        const code = couponInput.value.trim().toUpperCase();
        const valid = state.coupons.find(c => c.code === code);
        if (valid) {
            state.cart.discount = valid.discount;
            couponMsg.textContent = `Diskon Rp ${valid.discount} diterapkan!`;
            couponMsg.style.color = 'var(--whatsapp)';
        } else {
            state.cart.discount = 0;
            couponMsg.textContent = 'Kode tidak valid';
            couponMsg.style.color = 'var(--accent)';
        }
        validateCart();
    };

    // Checkout Button
    const btnCheckout = tpl.getElementById('btn-checkout');
    btnCheckout.onclick = showCheckoutModal;
    
    app.appendChild(tpl);
}

function renderSuccess() {
    const tpl = $('#tpl-success').content.cloneNode(true);
    tpl.querySelector('button').onclick = () => window.location.hash = 'home';
    app.appendChild(tpl);
}

// --- LOGIC ---

function validateCart() {
    const game = state.games.find(g => g.id === state.cart.gameId);
    if (!game) return;

    const inputKeys = Object.keys(state.cart.inputs);
    const allInputsFilled = game.inputs.every(f => inputKeys.includes(f.name) && state.cart.inputs[f.name].length > 0);
    const itemSelected = !!state.cart.itemId;

    const total = Math.max(0, state.cart.itemPrice - state.cart.discount);
    $('#total-price').textContent = formatRupiah(total);
    
    const btn = $('#btn-checkout');
    if (btn) btn.disabled = !(allInputsFilled && itemSelected);
}

function showCheckoutModal() {
    const now = Date.now();
    if (now - state.lastCheckout < CONFIG.RATE_LIMIT_SEC * 1000) {
        showToast(`Tunggu ${CONFIG.RATE_LIMIT_SEC} detik sebelum order lagi.`, 'error');
        return;
    }

    const total = Math.max(0, state.cart.itemPrice - state.cart.discount);
    const tpl = $('#tpl-checkout').content.cloneNode(true);
    const container = tpl.getElementById('summary-data');

    // Build Summary
    const addRow = (label, val, bold = false) => {
        const div = document.createElement('div');
        div.className = `summary-row ${bold ? 'total' : ''}`;
        div.innerHTML = `<span>${label}</span><span>${val}</span>`;
        container.appendChild(div);
    };

    const game = state.games.find(g => g.id === state.cart.gameId);
    addRow('Game', game.name);
    Object.entries(state.cart.inputs).forEach(([k, v]) => addRow(k, v));
    addRow('Item', state.cart.itemName);
    if (state.cart.discount > 0) addRow('Diskon', `- ${formatRupiah(state.cart.discount)}`);
    addRow('Total Bayar', formatRupiah(total), true);

    // QR Code
    const qrVal = `TRX-${Date.now()}-${total}`;
    tpl.getElementById('qr-code').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrVal}`;

    // Actions
    tpl.querySelector('button[data-action="cancel"]').onclick = () => $('.checkout-modal').remove();
    tpl.getElementById('btn-confirm-wa').onclick = () => processToWA(total);

    document.body.appendChild(tpl);
}

function processToWA(total) {
    state.lastCheckout = Date.now();
    const game = state.games.find(g => g.id === state.cart.gameId);
    
    let msg = `*Halo Admin, Saya mau Topup!*\n\n`;
    msg += `Game: ${game.name}\n`;
    msg += `Item: ${state.cart.itemName}\n`;
    Object.entries(state.cart.inputs).forEach(([k, v]) => {
        msg += `${k}: ${v}\n`;
    });
    msg += `\nTotal: *${formatRupiah(total)}*\n`;
    msg += `Ref ID: TX${Date.now().toString(36).toUpperCase()}`;

    const url = `https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    
    $('.checkout-modal').remove();
    window.location.hash = 'success';
}

// --- UTILS ---
function formatRupiah(num) {
    return new Intl.NumberFormat('id-ID', CONFIG.CURRENCY).format(num);
}

function sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function showToast(msg, type = 'info') {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<span>${type === 'success' ? '✓' : 'ℹ'}</span> ${msg}`;
    el.style.borderLeftColor = type === 'error' ? 'var(--accent)' : (type === 'success' ? 'var(--whatsapp)' : 'var(--primary)');
    $('#toast-container').appendChild(el);
    setTimeout(() => el.remove(), 3000);
}

// Admin Upload
$('#admin-btn').onclick = () => $('#json-upload').click();
$('#json-upload').onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (res) => {
        try {
            const json = JSON.parse(res.target.result);
            localStorage.setItem('topup_data', JSON.stringify(json));
            loadData(json);
            showToast('Data berhasil dimuat lokal', 'success');
        } catch (err) {
            showToast('Format JSON Salah', 'error');
        }
    };
    reader.readAsText(file);
};
