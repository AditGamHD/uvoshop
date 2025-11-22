import { auth, db, functions } from './firebase-config.js';
import { BASE_SEEDS, BLOCKS_DATA, SHOP_ITEMS } from './seeds-data.js';

class UVOWorldGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentUser = null;
        this.inventory = { coins: 0, gems: 0, items: [], mixerSlots: 3, ownedWorlds: [] };
        this.currentWorld = null;
        this.playerPosition = { x: 50, y: 90 };
        this.worldData = {};
        this.chunkSize = 10;
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.setupFirebaseAuth();
        this.setupCanvas();
        this.gameLoop();
    }

    setupEventListeners() {
        // Auth modals
        document.getElementById('showRegister').addEventListener('click', () => this.showModal('registerModal'));
        document.getElementById('showLogin').addEventListener('click', () => this.showModal('loginModal'));
        
        // Auth forms
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('registerForm').addEventListener('submit', (e) => this.handleRegister(e));
        
        // Game controls
        document.getElementById('moveLeft').addEventListener('click', () => this.movePlayer(-1, 0));
        document.getElementById('moveRight').addEventListener('click', () => this.movePlayer(1, 0));
        document.getElementById('jump').addEventListener('click', () => this.jump());
        document.getElementById('placeBlock').addEventListener('click', () => this.placeBlock());
        document.getElementById('extractSeed').addEventListener('click', () => this.extractSeed());
        
        // UI buttons
        document.getElementById('inventoryBtn').addEventListener('click', () => this.showInventory());
        document.getElementById('seedMixerBtn').addEventListener('click', () => this.showSeedMixer());
        document.getElementById('shopBtn').addEventListener('click', () => this.showShop());
        document.getElementById('domainSearchBtn').addEventListener('click', () => this.showDomainSearch());
        document.getElementById('tradeBtn').addEventListener('click', () => this.showTrade());
        document.getElementById('vendingBtn').addEventListener('click', () => this.showVending());
        document.getElementById('profileBtn').addEventListener('click', () => this.showProfile());
        
        // Modal close buttons
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.hideModal(modal.id);
            });
        });
        
        // Seed mixer controls
        document.getElementById('combineSeeds').addEventListener('click', () => this.combineSeeds());
        document.getElementById('clearMixer').addEventListener('click', () => this.clearMixer());
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // Touch events for mobile
        this.setupTouchControls();
    }

    setupFirebaseAuth() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                this.currentUser = user;
                await this.loadUserData();
                this.hideModal('loginModal');
                this.hideModal('registerModal');
                this.updateUI();
            } else {
                this.showModal('loginModal');
            }
        });
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            this.showError('Login failed: ' + error.message);
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        
        if (username.length < 4 || username.length > 10) {
            this.showError('Username must be 4-10 characters long');
            return;
        }
        
        if (password.length < 5 || password.length > 15) {
            this.showError('Password must be 5-15 characters long');
            return;
        }
        
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            await this.createUserProfile(userCredential.user, username);
        } catch (error) {
            this.showError('Registration failed: ' + error.message);
        }
    }

    async createUserProfile(user, username) {
        const userData = {
            username: username,
            email: user.email,
            coins: 100,
            gems: 10,
            items: [],
            mixerSlots: 3,
            ownedWorlds: [`${username}.domain`],
            createdAt: new Date()
        };
        
        await db.collection('users').doc(user.uid).set(userData);
        
        // Create default world
        await this.createDefaultWorld(`${username}.domain`);
    }

    async createDefaultWorld(domain) {
        const worldData = {
            domain: domain,
            owner: this.currentUser.uid,
            createdAt: new Date(),
            chunks: {}
        };
        
        // Create default world composition
        for (let y = 0; y < 100; y++) {
            for (let x = 0; x < 100; x++) {
                if (y < 2) {
                    // Lava at bottom
                    worldData.chunks[this.getChunkKey(x, y)] = {
                        blocks: { [`${x},${y}`]: 'lava' }
                    };
                } else if (y < 12) {
                    // Dirt layer
                    worldData.chunks[this.getChunkKey(x, y)] = {
                        blocks: { [`${x},${y}`]: 'dirt' }
                    };
                }
            }
        }
        
        // Add random wood spawns
        for (let i = 0; i < Math.floor(Math.random() * 7) + 1; i++) {
            const x = Math.floor(Math.random() * 100);
            const y = Math.floor(Math.random() * 50) + 12;
            worldData.chunks[this.getChunkKey(x, y)] = {
                blocks: { [`${x},${y}`]: 'wood' }
            };
        }
        
        await db.collection('worlds').doc(domain).set(worldData);
    }

    async loadUserData() {
        const userDoc = await db.collection('users').doc(this.currentUser.uid).get();
        if (userDoc.exists) {
            this.inventory = userDoc.data();
            this.updateCurrencyDisplay();
        }
    }

    setupCanvas() {
        // Set canvas size based on device
        this.canvas.width = Math.min(800, window.innerWidth - 40);
        this.canvas.height = Math.min(600, window.innerHeight - 200);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.canvas.width = Math.min(800, window.innerWidth - 40);
            this.canvas.height = Math.min(600, window.innerHeight - 200);
        });
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderWorld();
        this.renderPlayer();
        requestAnimationFrame(() => this.gameLoop());
    }

    renderWorld() {
        // Render grid and basic world
        const blockSize = Math.min(this.canvas.width / 100, this.canvas.height / 100);
        
        for (let x = 0; x < 100; x++) {
            for (let y = 0; y < 100; y++) {
                const blockType = this.getBlockAt(x, y);
                if (blockType) {
                    this.ctx.fillStyle = this.getBlockColor(blockType);
                    this.ctx.fillRect(
                        x * blockSize,
                        (99 - y) * blockSize, // Flip Y axis
                        blockSize,
                        blockSize
                    );
                    
                    // Add block border
                    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                    this.ctx.strokeRect(
                        x * blockSize,
                        (99 - y) * blockSize,
                        blockSize,
                        blockSize
                    );
                }
            }
        }
    }

    renderPlayer() {
        const blockSize = Math.min(this.canvas.width / 100, this.canvas.height / 100);
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.fillRect(
            this.playerPosition.x * blockSize,
            (99 - this.playerPosition.y) * blockSize,
            blockSize,
            blockSize
        );
    }

    getBlockAt(x, y) {
        const chunkKey = this.getChunkKey(x, y);
        if (this.worldData.chunks && this.worldData.chunks[chunkKey]) {
            return this.worldData.chunks[chunkKey].blocks[`${x},${y}`];
        }
        return null;
    }

    getBlockColor(blockType) {
        const colors = {
            'dirt': '#8B4513',
            'lava': '#FF4500',
            'wood': '#8B6914',
            'stone': '#696969',
            'grass': '#228B22',
            'water': '#1E90FF'
        };
        return colors[blockType] || '#CCCCCC';
    }

    getChunkKey(x, y) {
        const chunkX = Math.floor(x / this.chunkSize);
        const chunkY = Math.floor(y / this.chunkSize);
        return `${chunkX},${chunkY}`;
    }

    movePlayer(dx, dy) {
        const newX = this.playerPosition.x + dx;
        const newY = this.playerPosition.y + dy;
        
        // Boundary check
        if (newX >= 0 && newX < 100 && newY >= 0 && newY < 100) {
            // Collision check
            if (!this.getBlockAt(newX, newY)) {
                this.playerPosition.x = newX;
                this.playerPosition.y = newY;
            }
        }
    }

    jump() {
        // Simple jump implementation
        if (this.playerPosition.y < 99) {
            this.playerPosition.y += 1;
        }
    }

    async placeBlock() {
        if (!this.currentWorld) return;
        
        // Get selected block from inventory (simplified)
        const selectedBlock = 'dirt'; // In real implementation, get from UI
        
        try {
            // Call Cloud Function for block placement
            const placeBlockFunction = functions.httpsCallable('placeBlock');
            await placeBlockFunction({
                world: this.currentWorld,
                x: this.playerPosition.x,
                y: this.playerPosition.y,
                blockType: selectedBlock
            });
        } catch (error) {
            this.showError('Failed to place block: ' + error.message);
        }
    }

    async extractSeed() {
        if (!this.currentWorld) return;
        
        const x = this.playerPosition.x;
        const y = this.playerPosition.y;
        const block = this.getBlockAt(x, y);
        
        if (!block) {
            this.showError('No block to extract from');
            return;
        }
        
        try {
            const extractFunction = functions.httpsCallable('extractSeedResult');
            const result = await extractFunction({
                uid: this.currentUser.uid,
                world: this.currentWorld,
                x: x,
                y: y,
                hits: 1 // Simplified - in real implementation track hits per block
            });
            
            if (result.data.success) {
                this.showMessage(`Extracted: ${result.data.seed}`);
                await this.loadUserData(); // Refresh inventory
            } else {
                this.showError('Extraction failed');
            }
        } catch (error) {
            this.showError('Extraction failed: ' + error.message);
        }
    }

    showInventory() {
        this.updateInventoryDisplay();
        this.showModal('inventoryModal');
    }

    updateInventoryDisplay() {
        const inventoryGrid = document.getElementById('inventoryGrid');
        inventoryGrid.innerHTML = '';
        
        this.inventory.items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'inventory-item';
            itemElement.textContent = `${item.itemId} x${item.qty || 1}`;
            itemElement.addEventListener('click', () => this.selectItem(item));
            inventoryGrid.appendChild(itemElement);
        });
    }

    showSeedMixer() {
        this.showModal('seedMixerModal');
    }

    combineSeeds() {
        const slots = document.querySelectorAll('.mixer-slot');
        const selectedSeeds = Array.from(slots)
            .map(slot => slot.dataset.seedId)
            .filter(id => id);
        
        if (selectedSeeds.length === 0) {
            this.showError('No seeds selected');
            return;
        }
        
        // Find matching recipe
        const resultBlock = this.findMatchingRecipe(selectedSeeds);
        const resultDiv = document.getElementById('mixerResult');
        
        if (resultBlock) {
            resultDiv.textContent = `Created: ${resultBlock.name}`;
            resultDiv.className = 'success';
            
            // Add to inventory (simplified)
            this.addToInventory(resultBlock.seedID, 1);
        } else {
            resultDiv.textContent = 'Mix failed - created Compost Seed';
            resultDiv.className = 'error';
            
            // Add compost seed
            this.addToInventory('compost-seed', 1);
        }
        
        this.clearMixer();
    }

    findMatchingRecipe(seedIds) {
        return BLOCKS_DATA.find(block => {
            if (block.recipe.length !== seedIds.length) return false;
            return block.recipe.every(seedId => seedIds.includes(seedId));
        });
    }

    clearMixer() {
        document.querySelectorAll('.mixer-slot').forEach(slot => {
            slot.classList.remove('has-item');
            delete slot.dataset.seedId;
            slot.innerHTML = '';
        });
        document.getElementById('mixerResult').textContent = '';
    }

    showShop() {
        this.updateShopDisplay();
        this.showModal('shopModal');
    }

    updateShopDisplay() {
        const shopItems = document.getElementById('shopItems');
        shopItems.innerHTML = '';
        
        SHOP_ITEMS.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'shop-item';
            
            const priceText = item.priceCoins 
                ? `${item.priceCoins} coins` 
                : `${item.priceGems} gems`;
            
            itemElement.innerHTML = `
                <div class="shop-item-info">
                    <strong>${item.name}</strong>
                    <p>${item.description}</p>
                </div>
                <div class="shop-item-price">
                    <span>${priceText}</span>
                    <button class="buy-btn" data-item-id="${item.id}">Buy</button>
                </div>
            `;
            
            shopItems.appendChild(itemElement);
        });
        
        // Add event listeners to buy buttons
        document.querySelectorAll('.buy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = e.target.dataset.itemId;
                this.purchaseItem(itemId);
            });
        });
    }

    async purchaseItem(itemId) {
        try {
            const purchaseFunction = functions.httpsCallable('purchaseShopItem');
            await purchaseFunction({
                uid: this.currentUser.uid,
                itemId: itemId
            });
            
            this.showMessage('Purchase successful!');
            await this.loadUserData(); // Refresh inventory
        } catch (error) {
            this.showError('Purchase failed: ' + error.message);
        }
    }

    showDomainSearch() {
        this.showModal('domainSearchModal');
    }

    showTrade() {
        this.showModal('tradeModal');
    }

    showVending() {
        this.showModal('vendingModal');
    }

    showProfile() {
        document.getElementById('profileUsername').textContent = this.inventory.username || 'Unknown';
        document.getElementById('profileEmail').textContent = this.currentUser.email;
        document.getElementById('profileDomains').textContent = this.inventory.ownedWorlds?.join(', ') || 'None';
        this.showModal('profileModal');
    }

    setupTouchControls() {
        // Add touch event listeners for mobile controls
        let touchStartX = 0;
        let touchStartY = 0;
        
        this.canvas.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            e.preventDefault();
        });
        
        this.canvas.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            
            if (Math.abs(diffX) > Math.abs(diffY)) {
                // Horizontal swipe
                if (diffX > 0) this.movePlayer(1, 0);
                else this.movePlayer(-1, 0);
            } else {
                // Vertical swipe
                if (diffY < 0) this.jump();
            }
            
            e.preventDefault();
        });
    }

    handleKeyDown(e) {
        switch(e.key) {
            case 'ArrowLeft':
            case 'a':
                this.movePlayer(-1, 0);
                break;
            case 'ArrowRight':
            case 'd':
                this.movePlayer(1, 0);
                break;
            case 'ArrowUp':
            case 'w':
            case ' ':
                this.jump();
                break;
            case 'e':
                this.showInventory();
                break;
            case 'm':
                this.showSeedMixer();
                break;
            case 's':
                this.showShop();
                break;
        }
    }

    showModal(modalId) {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.setAttribute('aria-hidden', 'true');
        });
        
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.setAttribute('aria-hidden', 'false');
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.setAttribute('aria-hidden', 'true');
        }
    }

    updateUI() {
        this.updateCurrencyDisplay();
        document.getElementById('domainName').textContent = this.currentWorld || 'UVOWORLD';
    }

    updateCurrencyDisplay() {
        document.getElementById('coinCounter').textContent = this.inventory.coins || 0;
        document.getElementById('gemCounter').textContent = this.inventory.gems || 0;
    }

    addToInventory(itemId, quantity = 1) {
        // Simplified inventory management
        const existingItem = this.inventory.items.find(item => item.itemId === itemId);
        if (existingItem) {
            existingItem.qty += quantity;
        } else {
            this.inventory.items.push({ itemId, qty: quantity });
        }
    }

    showError(message) {
        // Simple error display - in real implementation use a proper notification system
        alert('Error: ' + message);
    }

    showMessage(message) {
        // Simple message display
        alert(message);
    }

    selectItem(item) {
        // Handle item selection for various actions
        console.log('Selected item:', item);
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UVOWorldGame();
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error('Logout failed:', error);
    }
});
