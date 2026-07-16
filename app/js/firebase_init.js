// Współdzielony plik konfiguracji dla środowiska Antigravity / Twój System
const firebaseConfig = {
    apiKey: "AIzaSyAmHUmkWe6SG5YR8hkYOB8ZVLKG5giLerI",
    authDomain: "system-operacyjny.firebaseapp.com",
    projectId: "system-operacyjny",
    storageBucket: "system-operacyjny.firebasestorage.app",
    messagingSenderId: "471093064554",
    appId: "1:471093064554:web:bf0d140f83cc4623cf6b13",
    databaseURL: "https://system-operacyjny-default-rtdb.europe-west1.firebasedatabase.app"
};

if(!firebaseConfig.databaseURL) { firebaseConfig.databaseURL = "https://system-operacyjny.firebaseio.com"; }

// Ochrona przed duplikacją inicjalizacji (np. gdy podpinamy i to, i stare app.js)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();
const auth = firebase.auth();

// Stała bazy zmigrowana do struktury, która istnieje
const USER_NODE = 'users/bartek/';

// SYSTEM THE FIREWALL (Auth Guard)
if (!window.location.pathname.endsWith('login.html')) {
    auth.onAuthStateChanged(user => {
        if (!user) {
            window.location.replace('login.html');
        }
    });
}
