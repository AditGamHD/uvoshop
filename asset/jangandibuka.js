document.addEventListener('DOMContentLoaded', function() {
    const oldData = {
        "kategori": [
            {
                "id": "all",
                "nama": "Semua Game"
            },
            {
                "id": "mobile",
                "nama": "Mobile Games"
            },
            {
                "id": "pc",
                "nama": "PC Games"
            },
            {
                "id": "console",
                "nama": "Console Games"
            }
        ],
        "produk": [
            {
                "id": 1,
                "nama": "Mobile Legends",
                "developer": "Moonton",
                "harga": "Rp 10.000 - Rp 500.000",
                "gambar": "https://via.placeholder.com/300x150?text=Mobile+Legends",
                "kategori": "mobile",
                "populer": true
            },
            {
                "id": 2,
                "nama": "Genshin Impact",
                "developer": "miHoYo",
                "harga": "Rp 15.000 - Rp 1.000.000",
                "gambar": "https://via.placeholder.com/300x150?text=Genshin+Impact",
                "kategori": "pc",
                "populer": true
            },
            {
                "id": 3,
                "nama": "Free Fire",
                "developer": "Garena",
                "harga": "Rp 5.000 - Rp 300.000",
                "gambar": "https://via.placeholder.com/300x150?text=Free+Fire",
                "kategori": "mobile",
                "populer": true
            },
            {
                "id": 4,
                "nama": "PUBG Mobile",
                "developer": "Tencent Games",
                "harga": "Rp 8.000 - Rp 400.000",
                "gambar": "https://via.placeholder.com/300x150?text=PUBG+Mobile",
                "kategori": "mobile",
                "populer": false
            },
            {
                "id": 5,
                "nama": "Valorant",
                "developer": "Riot Games",
                "harga": "Rp 20.000 - Rp 800.000",
                "gambar": "https://via.placeholder.com/300x150?text=Valorant",
                "kategori": "pc",
                "populer": true
            },
            {
                "id": 6,
                "nama": "Call of Duty: Mobile",
                "developer": "Activision",
                "harga": "Rp 12.000 - Rp 600.000",
                "gambar": "https://via.placeholder.com/300x150?text=COD+Mobile",
                "kategori": "mobile",
                "populer": false
            },
            {
                "id": 7,
                "nama": "Apex Legends",
                "developer": "Respawn Entertainment",
                "harga": "Rp 25.000 - Rp 900.000",
                "gambar": "https://via.placeholder.com/300x150?text=Apex+Legends",
                "kategori": "pc",
                "populer": false
            },
            {
                "id": 8,
                "nama": "FIFA 23",
                "developer": "EA Sports",
                "harga": "Rp 30.000 - Rp 1.200.000",
                "gambar": "https://via.placeholder.com/300x150?text=FIFA+23",
                "kategori": "console",
                "populer": true
            },
            {
                "id": 9,
                "nama": "Roblox",
                "developer": "Roblox Corporation",
                "harga": "Rp 5.000 - Rp 200.000",
                "gambar": "https://via.placeholder.com/300x150?text=Roblox",
                "kategori": "pc",
                "populer": false
            },
            {
                "id": 10,
                "nama": "Clash of Clans",
                "developer": "Supercell",
                "harga": "Rp 10.000 - Rp 500.000",
                "gambar": "https://via.placeholder.com/300x150?text=Clash+of+Clans",
                "kategori": "mobile",
                "populer": false
            },
            {
                "id": 11,
                "nama": "Fortnite",
                "developer": "Epic Games",
                "harga": "Rp 15.000 - Rp 700.000",
                "gambar": "https://via.placeholder.com/300x150?text=Fortnite",
                "kategori": "console",
                "populer": true
            },
            {
                "id": 12,
                "nama": "Honkai: Star Rail",
                "developer": "miHoYo",
                "harga": "Rp 12.000 - Rp 600.000",
                "gambar": "https://via.placeholder.com/300x150?text=Honkai+Star+Rail",
                "kategori": "mobile",
                "populer": false
            }
        ]
    };

    const newData = {
      "kategori": [
        {
          "id": "all",
          "nama": "Semua Layanan"
        },
        {
          "id": "pulsa",
          "nama": "Pulsa Reguler"
        },
        {
          "id": "paket-data",
          "nama": "Paket Data & Internet"
        },
        {
          "id": "pln",
          "nama": "Token & Tagihan PLN"
        },
        {
          "id": "pdam",
          "nama": "PDAM"
        },
        {
          "id": "bpjs",
          "nama": "BPJS"
        },
        {
          "id": "telekom-internet",
          "nama": "Telekom & Internet Rumah"
        },
        {
          "id": "e-wallet",
          "nama": "E-Wallet Topup"
        },
        {
          "id": "voucher-game",
          "nama": "Voucher Game"
        },
        {
          "id": "voucher-digital",
          "nama": "Voucher Digital & Streaming"
        }
      ],
      "produk": [
        {
          "id": 1,
          "nama": "Pulsa Telkomsel 5.000",
          "developer": "Telkomsel",
          "harga": "Rp 5.000",
          "gambar": "",
          "kategori": "pulsa",
          "populer": true
        },
        {
          "id": 2,
          "nama": "Pulsa Indosat 10.000",
          "developer": "Indosat IM3",
          "harga": "Rp 10.000",
          "gambar": "",
          "kategori": "pulsa",
          "populer": true
        },
        {
          "id": 3,
          "nama": "Pulsa XL 25.000",
          "developer": "XL Axiata",
          "harga": "Rp 25.000",
          "gambar": "",
          "kategori": "pulsa",
          "populer": false
        },
        {
          "id": 4,
          "nama": "Paket Data Telkomsel 5GB",
          "developer": "Telkomsel",
          "harga": "Rp 25.000",
          "gambar": "",
          "kategori": "paket-data",
          "populer": true
        },
        {
          "id": 5,
          "nama": "Paket Data Indosat 10GB",
          "developer": "Indosat IM3",
          "harga": "Rp 50.000",
          "gambar": "",
          "kategori": "paket-data",
          "populer": false
        },
        {
          "id": 6,
          "nama": "Token PLN 20.000",
          "developer": "PLN",
          "harga": "Rp 20.000",
          "gambar": "",
          "kategori": "pln",
          "populer": true
        },
        {
          "id": 7,
          "nama": "Token PLN 50.000",
          "developer": "PLN",
          "harga": "Rp 50.000",
          "gambar": "",
          "kategori": "pln",
          "populer": false
        },
        {
          "id": 8,
          "nama": "Tagihan PLN Pascabayar",
          "developer": "PLN",
          "harga": "Sesuai Tagihan",
          "gambar": "",
          "kategori": "pln",
          "populer": true
        },
        {
          "id": 9,
          "nama": "Tagihan PDAM Jakarta",
          "developer": "PDAM",
          "harga": "Sesuai Tagihan",
          "gambar": "",
          "kategori": "pdam",
          "populer": false
        },
        {
          "id": 10,
          "nama": "BPJS Kesehatan",
          "developer": "BPJS",
          "harga": "Sesuai Iuran",
          "gambar": "",
          "kategori": "bpjs",
          "populer": true
        },
        {
          "id": 11,
          "nama": "IndiHome",
          "developer": "Telkom",
          "harga": "Sesuai Paket",
          "gambar": "",
          "kategori": "telekom-internet",
          "populer": true
        },
        {
          "id": 12,
          "nama": "Topup Dana 50.000",
          "developer": "DANA",
          "harga": "Rp 50.000",
          "gambar": "",
          "kategori": "e-wallet",
          "populer": true
        },
        {
          "id": 13,
          "nama": "Topup OVO 100.000",
          "developer": "OVO",
          "harga": "Rp 100.000",
          "gambar": "",
          "kategori": "e-wallet",
          "populer": false
        },
        {
          "id": 14,
          "nama": "Mobile Legends 86 Diamonds",
          "developer": "Moonton",
          "harga": "Rp 20.000",
          "gambar": "",
          "kategori": "voucher-game",
          "populer": true
        },
        {
          "id": 15,
          "nama": "Free Fire 140 Diamonds",
          "developer": "Garena",
          "harga": "Rp 30.000",
          "gambar": "",
          "kategori": "voucher-game",
          "populer": true
        },
        {
          "id": 16,
          "nama": "Google Play 100.000",
          "developer": "Google",
          "harga": "Rp 100.000",
          "gambar": "",
          "kategori": "voucher-digital",
          "populer": true
        },
        {
          "id": 17,
          "nama": "Spotify Premium 1 Month",
          "developer": "Spotify",
          "harga": "Rp 55.000",
          "gambar": "",
          "kategori": "voucher-digital",
          "populer": false
        },
        {
          "id": 18,
          "nama": "Pulsa Tri 100.000",
          "developer": "Tri (3)",
          "harga": "Rp 100.000",
          "gambar": "",
          "kategori": "pulsa",
          "populer": false
        },
        {
          "id": 19,
          "nama": "Genshin Impact 300 GC",
          "developer": "miHoYo",
          "harga": "Rp 75.000",
          "gambar": "",
          "kategori": "voucher-game",
          "populer": true
        },
        {
          "id": 20,
          "nama": "Topup GoPay 25.000",
          "developer": "Gojek",
          "harga": "Rp 25.000",
          "gambar": "",
          "kategori": "e-wallet",
          "populer": false
        }
      ]
    };

    function mergeData(base, incoming) {
        const catMap = new Map();
        base.kategori.forEach(c => catMap.set(c.id, c));
        incoming.kategori.forEach(c => catMap.set(c.id, c));
        const mergedKategori = Array.from(catMap.values());

        const baseIds = new Set(base.produk.map(p => p.id));
        let maxId = base.produk.length ? Math.max.apply(null, base.produk.map(p => p.id)) : 0;
        const mergedProduk = base.produk.map(p => {
            if (!p.gambar) p.gambar = 'https://via.placeholder.com/300x150?text=' + encodeURIComponent(p.nama);
            return p;
        });

        incoming.produk.forEach(p => {
            const copy = Object.assign({}, p);
            if (!copy.gambar) copy.gambar = 'https://via.placeholder.com/300x150?text=' + encodeURIComponent(copy.nama);
            if (baseIds.has(copy.id)) {
                maxId++;
                copy.id = maxId;
            } else {
                if (copy.id > maxId) maxId = copy.id;
            }
            mergedProduk.push(copy);
        });

        return { kategori: mergedKategori, produk: mergedProduk };
    }

    const produkData = mergeData(oldData, newData);

    initSlider();
    loadPopularItems();
    loadCategories();
    loadAllItems();
    setupEventListeners();

    function initSlider() {
        const slides = document.querySelectorAll('.slide');
        const dotsContainer = document.querySelector('.slider-dots');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;
        let slideInterval;

        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function goToSlide(n) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        function startSlider() {
            slideInterval = setInterval(nextSlide, 3000);
        }

        const slider = document.querySelector('.slider');
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slider.addEventListener('mouseleave', startSlider);

        startSlider();
    }

    function loadPopularItems() {
        const popularItemsContainer = document.getElementById('popular-items');
        const popularProducts = produkData.produk.filter(produk => produk.populer);
        popularItemsContainer.innerHTML = '';
        popularProducts.forEach(produk => {
            const itemCard = createItemCard(produk);
            popularItemsContainer.appendChild(itemCard);
        });
    }

    function loadCategories() {
        const categoriesContainer = document.getElementById('categories-list');
        categoriesContainer.innerHTML = '';
        produkData.kategori.forEach(kategori => {
            const categoryBtn = document.createElement('button');
            categoryBtn.classList.add('category-btn');
            if (kategori.id === 'all') categoryBtn.classList.add('active');
            categoryBtn.textContent = kategori.nama;
            categoryBtn.dataset.category = kategori.id;
            categoryBtn.addEventListener('click', () => filterByCategory(kategori.id, kategori.nama));
            categoriesContainer.appendChild(categoryBtn);
        });
    }

    function loadAllItems() {
        const categoryItemsContainer = document.getElementById('category-items');
        categoryItemsContainer.innerHTML = '';
        produkData.produk.forEach(produk => {
            const itemCard = createItemCard(produk);
            categoryItemsContainer.appendChild(itemCard);
        });
    }

    function createItemCard(produk) {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card');
        itemCard.dataset.id = produk.id;
        itemCard.innerHTML = `
            <img src="${produk.gambar}" alt="${produk.nama}" class="item-image">
            <div class="item-content">
                <h3 class="item-name">${produk.nama}</h3>
                <p class="item-developer">${produk.developer}</p>
                <p class="item-price">${produk.harga}</p>
                <button class="buy-btn" data-id="${produk.id}">Beli Sekarang</button>
            </div>
        `;
        return itemCard;
    }

    function filterByCategory(categoryId, categoryName) {
        const categoryItemsContainer = document.getElementById('category-items');
        const categoryTitle = document.getElementById('category-title');
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === categoryId) {
                btn.classList.add('active');
            }
        });
        categoryTitle.textContent = categoryName;
        let filteredProducts;
        if (categoryId === 'all') {
            filteredProducts = produkData.produk;
        } else {
            filteredProducts = produkData.produk.filter(produk => produk.kategori === categoryId);
        }
        categoryItemsContainer.innerHTML = '';
        filteredProducts.forEach(produk => {
            const itemCard = createItemCard(produk);
            categoryItemsContainer.appendChild(itemCard);
        });
    }

    function setupEventListeners() {
        const loginBtn = document.querySelector('.login-btn');
        const loginModal = document.getElementById('login-modal');
        const closeLoginModal = loginModal.querySelector('.close-btn');

        loginBtn.addEventListener('click', () => {
            loginModal.style.display = 'flex';
        });

        closeLoginModal.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });

        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            alert(`Login berhasil! Selamat datang, ${username}`);
            loginModal.style.display = 'none';
            loginForm.reset();
        });

        const buyModal = document.getElementById('buy-modal');
        const closeBuyModal = buyModal.querySelector('.close-btn');

        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('buy-btn')) {
                const productId = e.target.dataset.id;
                const product = produkData.produk.find(p => p.id == productId);
                if (product) {
                    document.getElementById('buy-title').textContent = `Beli ${product.nama}`;
                    document.getElementById('buy-image').src = product.gambar;
                    document.getElementById('buy-name').textContent = product.nama;
                    document.getElementById('buy-developer').textContent = product.developer;
                    document.getElementById('buy-price').textContent = product.harga;
                    buyModal.style.display = 'flex';
                }
            }
        });

        closeBuyModal.addEventListener('click', () => {
            buyModal.style.display = 'none';
        });

        const buyForm = document.getElementById('buy-form');
        buyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const gameId = document.getElementById('game-id').value;
            const server = document.getElementById('server').value;
            alert(`Pembelian berhasil! ID Game: ${gameId}, Server: ${server}. Silakan tunggu proses top up.`);
            buyModal.style.display = 'none';
            buyForm.reset();
        });

        window.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
            if (e.target === buyModal) {
                buyModal.style.display = 'none';
            }
        });

        const searchInput = document.querySelector('.search-bar input');
        const searchBtn = document.querySelector('.search-bar button');

        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            if (searchTerm) {
                const searchResults = produkData.produk.filter(produk =>
                    produk.nama.toLowerCase().includes(searchTerm) ||
                    produk.developer.toLowerCase().includes(searchTerm)
                );
                if (searchResults.length > 0) {
                    const categoryItemsContainer = document.getElementById('category-items');
                    const categoryTitle = document.getElementById('category-title');
                    const categoryButtons = document.querySelectorAll('.category-btn');
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    categoryTitle.textContent = `Hasil Pencarian: "${searchTerm}"`;
                    categoryItemsContainer.innerHTML = '';
                    searchResults.forEach(produk => {
                        const itemCard = createItemCard(produk);
                        categoryItemsContainer.appendChild(itemCard);
                    });
                } else {
                    alert(`Tidak ditemukan hasil untuk "${searchTerm}"`);
                }
            }
        }

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});
