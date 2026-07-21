// js/firebase.js
const firebaseConfig = {
    apiKey: "AIzaSyAmHUmkWe6SG5YR8hkYOB8ZVLKG5giLerI",
    authDomain: "system-operacyjny.firebaseapp.com",
    projectId: "system-operacyjny",
    storageBucket: "system-operacyjny.firebasestorage.app",
    messagingSenderId: "471093064554",
    appId: "1:471093064554:web:bf0d140f83cc4623cf6b13",
    databaseURL: "https://system-operacyjny-default-rtdb.europe-west1.firebasedatabase.app"
};

if (!window.firebase.apps.length) {
    window.firebase.initializeApp(firebaseConfig);
}
export const db = window.firebase.database();
export const auth = window.firebase.auth();

export const USER_NODE = 'users/bartek/';

// SYSTEM THE FIREWALL (Auth Guard)
if (!window.location.pathname.endsWith('login.html')) {
    auth.onAuthStateChanged(user => {
        if (!user) {
            window.location.replace('login.html');
        }
    });
}

export function initFirebase() {
    // Left for backwards compatibility if needed
}
