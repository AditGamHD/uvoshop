document.addEventListener('DOMContentLoaded', function() {
    // Data produk (akan digantikan dengan produk.json)
    const produkData = {
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

    // Inisialisasi komponen
    initSlider();
    loadPopularItems();
    loadCategories();
    loadAllItems();
    setupEventListeners();

    // Fungsi untuk inisialisasi slider banner
    function initSlider() {
        const slides = document.querySelectorAll('.slide');
        const dotsContainer = document.querySelector('.slider-dots');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;
        let slideInterval;

        // Buat dots untuk setiap slide
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        // Fungsi untuk pergi ke slide tertentu
        function goToSlide(n) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        // Fungsi untuk slide berikutnya
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        // Fungsi untuk slide sebelumnya
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        // Event listener untuk tombol next dan prev
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Mulai slider otomatis
        function startSlider() {
            slideInterval = setInterval(nextSlide, 3000);
        }

        // Hentikan slider otomatis saat hover
        const slider = document.querySelector('.slider');
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slider.addEventListener('mouseleave', startSlider);

        // Mulai slider
        startSlider();
    }

    // Fungsi untuk memuat item populer
    function loadPopularItems() {
        const popularItemsContainer = document.getElementById('popular-items');
        const popularProducts = produkData.produk.filter(produk => produk.populer);
        
        popularItemsContainer.innerHTML = '';
        
        popularProducts.forEach(produk => {
            const itemCard = createItemCard(produk);
            popularItemsContainer.appendChild(itemCard);
        });
    }

    // Fungsi untuk memuat kategori
    function loadCategories() {
        const categoriesContainer = document.getElementById('categories-list');
        
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

    // Fungsi untuk memuat semua item
    function loadAllItems() {
        const categoryItemsContainer = document.getElementById('category-items');
        
        categoryItemsContainer.innerHTML = '';
        
        produkData.produk.forEach(produk => {
            const itemCard = createItemCard(produk);
            categoryItemsContainer.appendChild(itemCard);
        });
    }

    // Fungsi untuk membuat kartu item
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

    // Fungsi untuk memfilter item berdasarkan kategori
    function filterByCategory(categoryId, categoryName) {
        const categoryItemsContainer = document.getElementById('category-items');
        const categoryTitle = document.getElementById('category-title');
        const categoryButtons = document.querySelectorAll('.category-btn');
        
        // Update tombol kategori aktif
        categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === categoryId) {
                btn.classList.add('active');
            }
        });
        
        // Update judul kategori
        categoryTitle.textContent = categoryName;
        
        // Filter produk
        let filteredProducts;
        if (categoryId === 'all') {
            filteredProducts = produkData.produk;
        } else {
            filteredProducts = produkData.produk.filter(produk => produk.kategori === categoryId);
        }
        
        // Render produk yang difilter
        categoryItemsContainer.innerHTML = '';
        filteredProducts.forEach(produk => {
            const itemCard = createItemCard(produk);
            categoryItemsContainer.appendChild(itemCard);
        });
    }

    // Fungsi untuk setup event listener
    function setupEventListeners() {
        // Modal login
        const loginBtn = document.querySelector('.login-btn');
        const loginModal = document.getElementById('login-modal');
        const closeLoginModal = loginModal.querySelector('.close-btn');
        
        loginBtn.addEventListener('click', () => {
            loginModal.style.display = 'flex';
        });
        
        closeLoginModal.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
        
        // Form login
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simulasi login
            alert(`Login berhasil! Selamat datang, ${username}`);
            loginModal.style.display = 'none';
            loginForm.reset();
        });
        
        // Modal beli
        const buyModal = document.getElementById('buy-modal');
        const closeBuyModal = buyModal.querySelector('.close-btn');
        
        // Event delegation untuk tombol beli
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
        
        // Form beli
        const buyForm = document.getElementById('buy-form');
        buyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const gameId = document.getElementById('game-id').value;
            const server = document.getElementById('server').value;
            
            // Simulasi pembelian
            alert(`Pembelian berhasil! ID Game: ${gameId}, Server: ${server}. Silakan tunggu proses top up.`);
            buyModal.style.display = 'none';
            buyForm.reset();
        });
        
        // Tutup modal saat klik di luar konten modal
        window.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
            if (e.target === buyModal) {
                buyModal.style.display = 'none';
            }
        });
        
        // Pencarian
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
                    
                    // Reset tombol kategori aktif
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Update judul kategori
                    categoryTitle.textContent = `Hasil Pencarian: "${searchTerm}"`;
                    
                    // Render hasil pencarian
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
