// topbar.js - Obsługa dynamicznego paska górnego na podstronach (inbox, knowledge)
import { db, USER_NODE } from './firebase.js';
function getTodayStr() {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    return (new Date(Date.now() - tzoffset)).toISOString().split('T')[0];
}

function updateTimeProgress() {
    const timeFill = document.getElementById('time-fill');
    const timeDisplay = document.getElementById('time-val-display');
    if(!timeFill || !timeDisplay) return;

    const now = new Date();
    const hrs = now.getHours();
    const mins = now.getMinutes();
    timeDisplay.textContent = `${now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}`;

    const START_HOUR = 7;
    const END_HOUR = 22;
    const totalMinutes = (END_HOUR - START_HOUR) * 60;
    const currentMinutes = (hrs - START_HOUR) * 60 + mins;

    let percent = (currentMinutes / totalMinutes) * 100;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;

    timeFill.style.width = percent + '%';
}

function initEnergySync() {
    const energyFill = document.getElementById('energy-fill');
    const energyDisplay = document.getElementById('energy-val-display');
    const energyTrack = document.getElementById('energy-track');
    
    if(!energyFill || !energyDisplay || !db || !USER_NODE) return;

    const todayStr = getTodayStr();

    // Samonaprawa struktury energii w bazie danych
    db.ref(USER_NODE + 'energy').once('value').then(snap => {
        const val = snap.val();
        if (typeof val === 'number') {
            const currentVal = val;
            db.ref(USER_NODE + 'energy').set({
                [todayStr]: currentVal
            });
        }
    });

    const ref = db.ref(USER_NODE + 'energy/' + todayStr);

    // Odczyt z chmury dla dzisiejszego dnia
    ref.on('value', snap => {
        const val = snap.val() !== null ? snap.val() : 5;
        energyFill.style.width = (val * 10) + '%';
        energyDisplay.textContent = val + '/10';
    });

    // Ustawianie kliknięciem
    if(energyTrack) {
        energyTrack.style.cursor = 'pointer';
        energyTrack.addEventListener('click', (e) => {
            const rect = energyTrack.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            let val = Math.round((clickX / width) * 10);
            if(val < 0) val = 0;
            if(val > 10) val = 10;
            ref.set(val);
        });
    }
}

function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if(!themeBtn) return;
    themeBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let next = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

function initZeroEnergy() {
    const zeroBtn = document.getElementById('btn-zero-energy');
    if(!zeroBtn || !db || !USER_NODE) return;
    zeroBtn.addEventListener('click', () => {
        const todayStr = getTodayStr();
        db.ref(USER_NODE + 'energy/' + todayStr).set(2);
        document.documentElement.style.filter = 'grayscale(100%)';
        setTimeout(() => document.documentElement.style.filter = 'none', 3000);
    });
}

function initSyncStatus() {
    const cloudStatus = document.getElementById('cloud-status');
    const miniSync = document.getElementById('mini-sync-status');
    if(!cloudStatus || !miniSync) return;

    if(!db || !USER_NODE) {
        miniSync.textContent = 'Offline';
        return;
    }

    // Pokaż "Synced" od razu - połączenie z Firebase istnieje
    cloudStatus.style.display = 'inline';

    // Słuchaj ostatniej zmiany w całym węźle użytkownika
    db.ref(USER_NODE).limitToLast(1).on('value', () => {
        const now = new Date();
        const stamp = now.toISOString().split('T')[0] + '  ' + now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        miniSync.textContent = stamp;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    updateTimeProgress();
    setInterval(updateTimeProgress, 30000);
    
    initEnergySync();
    initThemeToggle();
    initZeroEnergy();
    initSyncStatus();
    
    if(window.lucide) window.lucide.createIcons();
});
