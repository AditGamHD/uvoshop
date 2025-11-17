'use strict';

import { 
    auth, db, FISH_DATA, SHOP_ITEMS,
    registerWithEmail, loginWithEmail, setupPresence, 
    updateUserCoins, sendGlobalChatMessage, buyShopItem,
    searchUserByUsername, sendFriendRequest, removeFriend 
} from './sistem.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const screens = {
        splash: document.getElementById('splash-screen'),
        auth: document.getElementById('auth-screen'),
        game: document.getElementById('game-screen'),
    };
    const toastContainer = document.getElementById('toast-container');
    
    const authTitle = document.getElementById('auth-title');
    const emailInput = document.getElementById('email-input');
    const usernameInputContainer = document.getElementById('username-input-container');
    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');
    const authActionBtn = document.getElementById('auth-action-btn');
    const authToggleLink = document.getElementById('auth-toggle-link');
    
    const coinCountEl = document.getElementById('coin-count');
    const usernameDisplayEl = document.getElementById('username-display');
    const fishingActionBtn = document.getElementById('fishing-action-btn');
    
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    
    const modalBackdrop = document.getElementById('modal-backdrop');
    
    const chatBtn = document.getElementById('chat-btn');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    
    const shopBtn = document.getElementById('shop-btn');
    const shopBody = document.getElementById('shop-body');

    const inventoryBtn = document.getElementById('inventory-btn');
    const inventoryBody = document.getElementById('inventory-body');
    const inventorySlotsDisplay = document.getElementById('inventory-slots-display');
    
    const friendsBtn = document.getElementById('friends-btn');
    const friendSearchInput = document.getElementById('friend-search-input');
    const friendSearchBtn = document.getElementById('friend-search-btn');
    const friendSearchResults = document.getElementById('friend-search-results');
    const friendListBody = document.getElementById('friend-list-body');
    
    const reelMinigameUI = document.getElementById('reel-minigame-ui');
    const reelBar = document.getElementById('reel-bar');
    const reelFish = document.getElementById('reel-fish');

    let w, h;
    let currentUser = null;
    let playerState = {};
    let particleEmitters = [];
    let isRegisterMode = false;
    let chatListenerAttached = false;

    let gameState = 'IDLE'; 
    let gameLoopTimestamp = 0;
    let biteTimer = 0;
    let currentFish = null;
    
    let bobber = { x: 0, y: 0, angle: 0, visible: false };
    
    let reelState = {
        fishPos: 0.5,
        fishSpeed: 0.01,
        playerPos: 0.5,
        playerPower: 0,
        tension: 0,
        progress: 0
    };

    function resizeCanvas() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function showScreen(screenId) {
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        if (screens[screenId]) {
            screens[screenId].classList.add('active');
        }
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 4000);
    }

    function toggleAuthMode() {
        isRegisterMode = !isRegisterMode;
        if (isRegisterMode) {
            authTitle.textContent = "Daftar Akun Baru";
            usernameInputContainer.style.display = 'block';
            authActionBtn.textContent = "Daftar";
            authToggleLink.textContent = "Sudah punya akun? Login";
        } else {
            authTitle.textContent = "Login";
            usernameInputContainer.style.display = 'none';
            authActionBtn.textContent = "Login";
            authToggleLink.textContent = "Belum punya akun? Daftar";
        }
    }

    async function handleAuthAction() {
        const email = emailInput.value;
        const password = passwordInput.value;
        
        if (!email || !password) {
            showToast("Email dan Password harus diisi.", "error");
            return;
        }

        try {
            if (isRegisterMode) {
                const username = usernameInput.value;
                if (!username) {
                    showToast("Username harus diisi.", "error");
                    return;
                }
                showToast("Mendaftarkan akun...", "info");
                await registerWithEmail(email, password, username);
                showToast("Registrasi berhasil! Selamat datang.", "success");
            } else {
                showToast("Mencoba login...", "info");
                await loginWithEmail(email, password);
                showToast("Login berhasil! Selamat datang kembali.", "success");
            }
        } catch (error) {
            console.error("Auth Error:", error);
            showToast(error.message || "Terjadi kesalahan.", "error");
        }
    }

    function initAuth() {
        authToggleLink.addEventListener('click', toggleAuthMode);
        authActionBtn.addEventListener('click', handleAuthAction);
        
        toggleAuthMode();
        toggleAuthMode();
    }

    function initGame(user) {
        currentUser = user;
        showScreen('game');
        setupPresence(user);
        
        const userRef = db.ref(`/users/${user.uid}`);
        userRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
                playerState = snapshot.val();
                updateCoinDisplay(playerState.coins);
                usernameDisplayEl.textContent = playerState.username || user.displayName;
                updateInventoryUI();
            }
        });

        initModals();
        initChat();
        initShop();
        initFriends();
        
        fishingActionBtn.addEventListener('click', handleFishingAction);
        
        requestAnimationFrame(gameLoop);
    }

    function updateCoinDisplay(amount) {
        coinCountEl.textContent = amount;
    }
    
    function initModals() {
        document.querySelectorAll('.modal-close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                closeModal(btn.dataset.modal);
            });
        });
        
        modalBackdrop.addEventListener('click', () => {
            document.querySelectorAll('.modal.active').forEach(modal => {
                closeModal(modal.id);
            });
        });
        
        chatBtn.addEventListener('click', () => openModal('chat-modal'));
        shopBtn.addEventListener('click', () => openModal('shop-modal'));
        inventoryBtn.addEventListener('click', () => openModal('inventory-modal'));
        friendsBtn.addEventListener('click', () => openModal('friends-modal'));
    }
    
    function openModal(modalId) {
        modalBackdrop.classList.add('active');
        document.getElementById(modalId).classList.add('active');
    }
    
    function closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
        if (document.querySelectorAll('.modal.active').length === 0) {
            modalBackdrop.classList.remove('active');
        }
    }

    function initChat() {
        chatSendBtn.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendChatMessage();
        });

        if (chatListenerAttached) return;
        const chatRef = db.ref('/global_chat').limitToLast(50);
        chatRef.on('child_added', (snapshot) => {
            const msg = snapshot.val();
            const msgElement = document.createElement('div');
            msgElement.classList.add('chat-message');
            msgElement.innerHTML = `<strong>${msg.username}:</strong> ${msg.message}`;
            chatMessages.appendChild(msgElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
        chatListenerAttached = true;
    }
    
    function sendChatMessage() {
        const message = chatInput.value;
        if (message.trim().length > 0) {
            sendGlobalChatMessage(currentUser, message);
            chatInput.value = '';
        }
    }
    
    function initShop() {
        shopBody.innerHTML = '';
        
        ['rods', 'skins', 'upgrades'].forEach(type => {
            const header = document.createElement('h3');
            header.textContent = type.charAt(0).toUpperCase() + type.slice(1);
            header.style.color = 'var(--color-accent)';
            header.style.marginTop = '15px';
            shopBody.appendChild(header);
            
            SHOP_ITEMS[type].forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'shop-item';
                itemEl.innerHTML = `
                    <div class="item-info">
                        <strong>${item.name}</strong>
                        <p>${item.desc}</p>
                    </div>
                    <button class="btn buy-btn" data-item-id="${item.id}" data-item-type="${type}" ${item.price === 0 ? 'disabled' : ''}>
                        <svg width="20" height="20"><use href="#icon-coin"></use></svg>
                        <span>${item.price}</span>
                    </button>
                `;
                shopBody.appendChild(itemEl);
            });
        });
        
        shopBody.addEventListener('click', async (e) => {
            const buyButton = e.target.closest('.buy-btn');
            if (buyButton) {
                buyButton.disabled = true;
                const { itemId, itemType } = buyButton.dataset;
                try {
                    await buyShopItem(currentUser, itemId, itemType);
                    showToast(`Berhasil membeli ${itemId}!`, 'success');
                } catch (error) {
                    showToast(error.message || "Pembelian gagal. Koin tidak cukup?", 'error');
                }
                buyButton.disabled = false;
            }
        });
    }

    function updateInventoryUI() {
        inventoryBody.innerHTML = '';
        const items = playerState.inventory || {};
        let slotCount = 0;
        
        Object.entries(items).forEach(([itemId, count]) => {
            const allItems = [...SHOP_ITEMS.rods, ...SHOP_ITEMS.skins];
            const itemData = allItems.find(i => i.id === itemId);
            if (itemData) {
                slotCount += count;
                const itemEl = document.createElement('div');
                itemEl.className = 'inventory-item';
                itemEl.innerHTML = `
                    <div class="item-info">
                        <strong>${itemData.name} (x${count})</strong>
                        <p>${itemData.desc}</p>
                    </div>
                `;
                inventoryBody.appendChild(itemEl);
            }
        });
        
        inventorySlotsDisplay.textContent = `${slotCount}/${playerState.inventorySlots || 10}`;
    }
    
    function initFriends() {
        friendSearchBtn.addEventListener('click', async () => {
            const username = friendSearchInput.value;
            if (username.length < 3) return;
            
            friendSearchResults.innerHTML = '<p>Mencari...</p>';
            const user = await searchUserByUsername(username);
            
            if (user) {
                friendSearchResults.innerHTML = `
                    <div class="shop-item">
                        <div class="item-info">
                            <strong>${user.username}</strong>
                            <p>Level ${user.level || 1}</p>
                        </div>
                        <button class="btn btn-secondary" id="add-friend-btn" data-uid="${user.uid}">Tambah</button>
                    </div>
                `;
                document.getElementById('add-friend-btn').addEventListener('click', async (e) => {
                    const targetUid = e.target.dataset.uid;
                    try {
                        await sendFriendRequest(currentUser.uid, targetUid);
                        showToast("Permintaan teman terkirim!", 'success');
                        e.target.disabled = true;
                        e.target.textContent = "Terkirim";
                    } catch (error) {
                        showToast(error.message, 'error');
                    }
                });
            } else {
                friendSearchResults.innerHTML = '<p>User tidak ditemukan.</p>';
            }
        });
        
        db.ref(`/users/${currentUser.uid}/friends`).on('value', (snapshot) => {
            friendListBody.innerHTML = '';
            if(snapshot.exists()) {
                snapshot.forEach(friendSnap => {
                    const friendData = friendSnap.val();
                    const friendEl = document.createElement('div');
                    friendEl.className = 'shop-item';
                    friendEl.innerHTML = `
                        <div class="item-info">
                            <strong>${friendData.username}</strong>
                            <p>${friendData.online ? 'Online' : 'Offline'}</p>
                        </div>
                        <button class="btn" data-uid="${friendSnap.key}" style="background: var(--color-error); font-size: 0.9rem; padding: 10px 15px;">Hapus</button>
                    `;
                    friendEl.querySelector('button').addEventListener('click', async (e) => {
                        await removeFriend(currentUser.uid, e.target.dataset.uid);
                        showToast("Teman dihapus.", 'info');
                    });
                    friendListBody.appendChild(friendEl);
                });
            } else {
                friendListBody.innerHTML = '<p>Kamu belum punya teman.</p>';
            }
        });
    }

    function drawBackground() {
        const gradient = ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, '#003973');
        gradient.addColorStop(0.6, '#005f9e');
        gradient.addColorStop(1, '#008fcc');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
    }

    function drawWaves(timestamp) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        for (let i = 1; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(0, h);
            for (let x = 0; x < w; x++) {
                let y = Math.sin((x + timestamp / (100 * i)) / 30) * 10 * i + (h * 0.7) + (i * 20);
                ctx.lineTo(x, y);
            }
            ctx.lineTo(w, h);
            ctx.closePath();
            ctx.fill();
        }
    }
    
    function drawRod() {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(w * 0.1, h * 0.5);
        ctx.lineTo(w * 0.4, h * 0.6);
        ctx.stroke();
        
        if (bobber.visible) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(w * 0.4, h * 0.6);
            ctx.lineTo(bobber.x, bobber.y);
            ctx.stroke();
            
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(bobber.x, bobber.y + Math.sin(bobber.angle) * 2, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(bobber.x, bobber.y + Math.sin(bobber.angle) * 2, 5, Math.PI, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function drawFish(timestamp) {
        if(gameState === 'IDLE' || gameState === 'CASTING') {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            let x = (timestamp / 20) % (w + 50) - 50;
            let y = h * 0.8 + Math.sin(timestamp / 500) * 10;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.quadraticCurveTo(x + 15, y - 10, x + 30, y);
            ctx.quadraticCurveTo(x + 15, y + 10, x, y);
            ctx.fill();
        }
    }

    function gameLoop(timestamp) {
        if (!currentUser) return;
        const deltaTime = (timestamp - gameLoopTimestamp) / 1000;
        gameLoopTimestamp = timestamp;

        ctx.clearRect(0, 0, w, h);
        drawBackground();
        drawWaves(timestamp);
        drawRod();
        drawFish(timestamp);
        
        switch(gameState) {
            case 'CASTING':
                updateCasting(deltaTime);
                break;
            case 'WAITING':
                updateWaiting(deltaTime);
                break;
            case 'HOOKED':
                break;
            case 'REELING':
                updateReeling(deltaTime);
                break;
        }

        requestAnimationFrame(gameLoop);
    }
    
    function handleFishingAction() {
        switch(gameState) {
            case 'IDLE':
                startCasting();
                break;
            case 'HOOKED':
                startReeling();
                break;
            case 'REELING':
                playerReel();
                break;
        }
    }
    
    function startCasting() {
        gameState = 'CASTING';
        bobber.visible = true;
        bobber.x = w * 0.3;
        bobber.y = h * 0.6;
        fishingActionBtn.disabled = true;
        fishingActionBtn.textContent = 'MELEMPAR...';
    }
    
    function updateCasting(deltaTime) {
        bobber.x += 150 * deltaTime;
        bobber.y += 50 * deltaTime;
        
        if(bobber.x >= w * 0.7) {
            bobber.x = w * 0.7;
            bobber.y = h * 0.75;
            gameState = 'WAITING';
            fishingActionBtn.disabled = true;
            fishingActionBtn.textContent = 'MENUNGGU...';
            biteTimer = 3 + Math.random() * 5;
        }
    }
    
    function updateWaiting(deltaTime) {
        bobber.angle += 5 * deltaTime;
        biteTimer -= deltaTime;
        if(biteTimer <= 0) {
            currentFish = FISH_DATA[Math.floor(Math.random() * FISH_DATA.length)];
            gameState = 'HOOKED';
            showToast("ADA TARIKAN!", "warning");
            fishingActionBtn.disabled = false;
            fishingActionBtn.textContent = "TARIK!";
        }
    }
    
    function startReeling() {
        gameState = 'REELING';
        reelMinigameUI.style.display = 'block';
        fishingActionBtn.textContent = 'GULUNG!';
        
        reelState.fishPos = 0.5;
        reelState.playerPos = 0.5;
        reelState.playerPower = 0.1 + (playerState.rodEquipped === 'rod_pro' ? 0.1 : 0);
        reelState.fishSpeed = (currentFish.speed || 1.0) * 0.01;
        reelState.progress = 0;
    }
    
    function playerReel() {
        if (gameState !== 'REELING') return;
        reelState.playerPos = Math.max(0, reelState.playerPos - reelState.playerPower);
    }
    
    function updateReeling(deltaTime) {
        reelState.fishPos += (Math.random() - 0.45) * reelState.fishSpeed;
        reelState.fishPos = Math.max(0, Math.min(1, reelState.fishPos));
        
        if(reelState.playerPos < 1) {
            reelState.playerPos += 0.03 * deltaTime; 
        }

        const distance = Math.abs(reelState.fishPos - (1 - reelState.playerPos));
        
        if (distance < 0.1) {
            reelState.progress += 0.1 * deltaTime;
            reelBar.style.backgroundColor = 'var(--color-success)';
        } else {
            reelState.progress -= 0.05 * deltaTime;
            reelBar.style.backgroundColor = 'var(--color-warning)';
        }
        
        reelState.progress = Math.max(0, reelState.progress);
        
        reelFish.style.left = `${reelState.fishPos * 100}%`;
        reelBar.style.left = `${(1 - reelState.playerPos - 0.1) * 100}%`;
        reelBar.style.width = `20%`;
        
        bobber.x += (w * 0.1 - bobber.x) * 0.05;
        bobber.y += (h * 0.6 - bobber.y) * 0.05;

        if (reelState.progress >= 1) {
            finishCatch(true);
        }
    }
    
    function finishCatch(success) {
        gameState = 'IDLE';
        reelMinigameUI.style.display = 'none';
        fishingActionBtn.disabled = false;
        fishingActionBtn.textContent = 'LEMPAR';
        bobber.visible = false;
        
        if (success) {
            showToast(`Dapat ikan: ${currentFish.name}! (Nilai: ${currentFish.baseValue})`, "success");
            updateUserCoins(currentUser.uid, currentFish.baseValue)
                .then(() => showToast(`+${currentFish.baseValue} Koin`, "success"))
                .catch(error => showToast("Gagal simpan koin", "error"));
        } else {
            showToast("Ikan lepas!", "error");
        }
        currentFish = null;
    }

    auth.onAuthStateChanged((user) => {
        if (user) {
            initGame(user);
        } else {
            currentUser = null;
            initAuth();
            showScreen('auth');
        }
    });

    setTimeout(() => {
        if (screens.splash.classList.contains('active')) {
            showToast("Memeriksa sesi...");
        }
    }, 1500);
});
