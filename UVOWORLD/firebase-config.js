// Firebase configuration - Replace with your actual Firebase config
// This file should contain only placeholders - actual keys should be stored in Firebase Console / environment

// Firebase configuration object - to be replaced with actual values from Firebase Console
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase only if not already initialized
let app;
let auth;
let db;
let functions;

try {
    // Check if Firebase is available
    if (typeof firebase !== 'undefined' && firebase.app) {
        app = firebase.app();
        auth = firebase.auth();
        db = firebase.firestore();
        functions = firebase.functions();
        
        console.log('Firebase initialized successfully');
    } else {
        // Fallback for development without Firebase
        console.warn('Firebase not available - running in offline mode');
        
        // Mock Firebase objects for development
        app = {
            name: '[DEFAULT]',
            options: {}
        };
        
        auth = {
            currentUser: null,
            onAuthStateChanged: (callback) => {
                // Mock auth state change
                setTimeout(() => callback(null), 100);
                return () => {};
            },
            signInWithEmailAndPassword: (email, password) => {
                return Promise.reject(new Error('Firebase not configured'));
            },
            createUserWithEmailAndPassword: (email, password) => {
                return Promise.reject(new Error('Firebase not configured'));
            },
            signOut: () => Promise.resolve()
        };
        
        db = {
            collection: () => ({
                doc: () => ({
                    get: () => Promise.resolve({ exists: false, data: () => null }),
                    set: () => Promise.resolve(),
                    update: () => Promise.resolve(),
                    onSnapshot: () => () => {}
                }),
                where: () => ({
                    get: () => Promise.resolve({ empty: true, docs: [] })
                })
            })
        };
        
        functions = {
            httpsCallable: (name) => () => Promise.reject(new Error('Firebase not configured'))
        };
    }
} catch (error) {
    console.error('Error initializing Firebase:', error);
    
    // Create minimal mock objects to prevent crashes
    app = { name: '[DEFAULT]', options: {} };
    auth = { 
        currentUser: null, 
        onAuthStateChanged: () => () => {},
        signInWithEmailAndPassword: () => Promise.reject(new Error('Firebase error')),
        createUserWithEmailAndPassword: () => Promise.reject(new Error('Firebase error')),
        signOut: () => Promise.resolve()
    };
    db = { 
        collection: () => ({ 
            doc: () => ({ 
                get: () => Promise.resolve({ exists: false }),
                set: () => Promise.resolve(),
                onSnapshot: () => () => {}
            }) 
        }) 
    };
    functions = { 
        httpsCallable: () => () => Promise.reject(new Error('Firebase not available')) 
    };
}

// Export Firebase services
export { app, auth, db, functions };
export default firebaseConfig;
