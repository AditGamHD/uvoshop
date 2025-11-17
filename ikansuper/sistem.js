'use strict';

const firebaseConfig = {
    apiKey: "AIzaSyChIz1UoitjZM092QbNeDvtRIrAveK451Q",
    authDomain: "iwaksuper1.firebaseapp.com",
    databaseURL: "https://iwaksuper1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iwaksuper1",
    storageBucket: "iwaksuper1.firebasestorage.app",
    messagingSenderId: "441905684206",
    appId: "1:441905684206:web:82bd547f1b9f8eb8645dff",
    measurementId: "G-EGX1BRK535"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.database();

export const FISH_DATA = [
    {"id":"f001","name":"Ikan Teri","rarity":"common","size":0.5,"baseValue":2,"speed":1.1,"aggressiveness":0.1,"pattern":"sine","preferredBait":"worm","depthRange":"shallow"},
    {"id":"f002","name":"Bandeng","rarity":"common","size":2,"baseValue":10,"speed":1.0,"aggressiveness":0.45,"pattern":"zigzag","preferredBait":"shrimp","depthRange":"shallow"},
    {"id":"f003","name":"Nila","rarity":"common","size":1.5,"baseValue":8,"speed":0.9,"aggressiveness":0.3,"pattern":"sine","preferredBait":"worm","depthRange":"shallow"},
    {"id":"f004","name":"Lele","rarity":"common","size":2.5,"baseValue":12,"speed":0.8,"aggressiveness":0.5,"pattern":"bottom","preferredBait":"pellet","depthRange":"mid"},
    {"id":"f010","name":"Ikan Emas","rarity":"rare","size":4,"baseValue":120,"speed":0.9,"aggressiveness":0.6,"pattern":"sine","preferredBait":"golden_lure","depthRange":"mid"},
    {"id":"f011","name":"Gurame","rarity":"uncommon","size":5,"baseValue":75,"speed":0.7,"aggressiveness":0.4,"pattern":"slow_drift","preferredBait":"leaf_bait","depthRange":"mid"},
    {"id":"f012","name":"Patin","rarity":"uncommon","size":6,"baseValue":100,"speed":0.8,"aggressiveness":0.6,"pattern":"bottom_fast","preferredBait":"shrimp","depthRange":"deep"},
    {"id":"f020","name":"Si Kaku","rarity":"epic","size":7,"baseValue":450,"speed":0.8,"aggressiveness":0.7,"pattern":"erratic","preferredBait":"spicy_bait","depthRange":"deep"},
    {"id":"f021","name":"Arwana Emas","rarity":"epic","size":3,"baseValue":700,"speed":1.3,"aggressiveness":0.5,"pattern":"dart","preferredBait":"golden_lure","depthRange":"mid"},
    {"id":"f030","name":"Hiu Bakau","rarity":"legendary","size":10,"baseValue":2500,"speed":1.5,"aggressiveness":0.9,"pattern":"patrol","preferredBait":"fish_chunk","depthRange":"open_sea"},
    {"id":"f099","name":"Leviathan Legendaris","rarity":"legendary","size":15,"baseValue":5000,"speed":0.6,"aggressiveness":0.9,"pattern":"boss","preferredBait":"kraken_bait","depthRange":"open_sea"},
    {"id":"m001","name":"Cumi Bercahaya","rarity":"rare","size":1,"baseValue":200,"speed":1.4,"aggressiveness":0.2,"pattern":"pulse","preferredBait":"shiny_lure","depthRange":"night_lake"},
    {"id":"m002","name":"Belut Listrik","rarity":"epic","size":3,"baseValue":600,"speed":1.0,"aggressiveness":0.8,"pattern":"electric_zip","preferredBait":"spicy_bait","depthRange":"mangrove"},
    {"id":"p001","name":"Ikan Mas Koki","rarity":"common","size":1,"baseValue":15,"speed":0.5,"aggressiveness":0.1,"pattern":"pet","preferredBait":"worm","depthRange":"shallow","behaviorTags":["pet","schooling"]},
    {"id":"p002","name":"Ikan Cupang","rarity":"uncommon","size":0.8,"baseValue":50,"speed":1.1,"aggressiveness":0.7,"pattern":"pet","preferredBait":"shrimp","depthRange":"shallow","behaviorTags":["pet","aggressive"]}
];

export const SHOP_ITEMS = {
    "rods": [
        {"id":"rod_basic","name":"Pancing Kayu","desc":"Pancing standar.","price":0, "power": 10},
        {"id":"rod_fiber","name":"Pancing Fiber","desc":"Lebih kuat, memudahkan tarikan.","price":500, "power": 15},
        {"id":"rod_pro","name":"Pancing Pro","desc":"Pancingan master, tarikan stabil.","price":5000, "power": 25}
    ],
    "skins": [
        {"id":"skin_gold","name":"Skin Pancing Emas","desc":"Membuat pancinganmu berkilau.","price":10000},
        {"id":"skin_neon","name":"Skin Pancing Neon","desc":"Menyala dalam gelap.","price":15000}
    ],
    "upgrades": [
        {"id":"inv_upgrade_1","name":"Upgrade Gudang (+10)","desc":"Menambah 10 slot gudang.","price":200, "slots": 10}
    ]
};

export async function registerWithEmail(email, password, username) {
    const sanitizedUsername = sanitizeInput(username).toLowerCase();
    if (sanitizedUsername.length < 3) {
        throw new Error("Username minimal 3 karakter.");
    }

    const usernameCheck = await db.ref(`usernames/${sanitizedUsername}`).once('value');
    if(usernameCheck.exists()) {
        throw new Error("Username sudah dipakai.");
    }

    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    await userCredential.user.updateProfile({
        displayName: sanitizedUsername
    });
    
    await db.ref(`usernames/${sanitizedUsername}`).set(userCredential.user.uid);
    
    await createUserData(userCredential.user, sanitizedUsername);
    return userCredential.user;
}

export function loginWithEmail(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

export function createUserData(user, username) {
    const userRef = db.ref(`/users/${user.uid}`);
    return userRef.set({
        uid: user.uid,
        email: user.email,
        username: username,
        coins: 100,
        level: 1,
        inventory: {
            "rod_basic": 1
        },
        inventorySlots: 10,
        rodEquipped: "rod_basic",
        friends: {},
        joined: firebase.database.ServerValue.TIMESTAMP
    });
}

export function setupPresence(user) {
    const userStatusRef = db.ref(`/presence/${user.uid}`);
    const isOffline = {
        state: 'offline',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
    };
    const isOnline = {
        state: 'online',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
        username: user.displayName
    };

    db.ref('.info/connected').on('value', (snapshot) => {
        if (snapshot.val() === false) {
            return;
        }
        userStatusRef.onDisconnect().set(isOffline).then(() => {
            userStatusRef.set(isOnline);
        });
    });
}

export function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

export function updateUserCoins(userId, amountChange) {
    const userCoinsRef = db.ref(`/users/${userId}/coins`);
    return userCoinsRef.transaction((currentCoins) => {
        if (currentCoins === null) {
            currentCoins = 0;
        }
        const newCoins = currentCoins + amountChange;
        if (newCoins < 0) {
            return;
        }
        return newCoins;
    });
}

export function sendGlobalChatMessage(user, message) {
    const chatRef = db.ref('/global_chat');
    const sanitizedMessage = sanitizeInput(message).substring(0, 200);
    if(sanitizedMessage.length === 0) return;
    
    chatRef.push({
        uid: user.uid,
        username: user.displayName,
        message: sanitizedMessage,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
}

export async function buyShopItem(user, itemId, itemType) {
    const item = SHOP_ITEMS[itemType].find(i => i.id === itemId);
    if (!item) throw new Error("Item tidak ditemukan.");

    const userRef = db.ref(`/users/${user.uid}`);
    
    return userRef.transaction((userData) => {
        if (!userData) return userData;

        if (userData.coins < item.price) {
            return; 
        }

        if (itemType === 'upgrades' && item.id.startsWith('inv_upgrade')) {
            userData.inventorySlots = (userData.inventorySlots || 10) + item.slots;
        } else {
            if (!userData.inventory) userData.inventory = {};
            userData.inventory[itemId] = (userData.inventory[itemId] || 0) + 1;
        }
        
        userData.coins -= item.price;

        return userData;
    });
}

export async function searchUserByUsername(username) {
    const saneUsername = sanitizeInput(username).toLowerCase();
    const usernameRef = db.ref(`usernames/${saneUsername}`);
    const snapshot = await usernameRef.once('value');
    
    if(snapshot.exists()) {
        const uid = snapshot.val();
        const userSnap = await db.ref(`users/${uid}`).once('value');
        return { uid, ...userSnap.val() };
    }
    return null;
}

export async function sendFriendRequest(currentUserUid, targetUserUid) {
    if (currentUserUid === targetUserUid) throw new Error("Tidak bisa menambah diri sendiri.");
    
    const userRef = db.ref(`users/${currentUserUid}/friends/${targetUserUid}`);
    const targetRef = db.ref(`users/${targetUserUid}/friends/${currentUserUid}`);
    const userSnap = await userRef.once('value');
    const targetSnap = await targetRef.once('value');

    if(userSnap.exists() || targetSnap.exists()) throw new Error("Sudah berteman atau permintaan terkirim.");

    const requestRef = db.ref(`friend_requests/${targetUserUid}/${currentUserUid}`);
    return requestRef.set({
        fromUid: currentUserUid,
        fromUsername: auth.currentUser.displayName,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
}

export async function removeFriend(currentUserUid, friendUid) {
    await db.ref(`users/${currentUserUid}/friends/${friendUid}`).remove();
    await db.ref(`users/${friendUid}/friends/${currentUserUid}`).remove();
}
