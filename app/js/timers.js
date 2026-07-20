// js/timers.js
import { db, USER_NODE } from './firebase.js';
import { getTodayStr } from './utils.js';

let focusInterval;
let isFocusPaused = false;
let currentFocusDuration = 0; // w sekundach
let currentFocusTotal = 0; 
let currentFocusTitle = "";

export function initTimersAndFocus() {
    const startBtns = document.querySelectorAll('.start-block-btn');
    startBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(!e.target.hasAttribute('data-target')) return;
            const blockNum = e.target.getAttribute('data-target');
            const durationMins = parseInt(e.target.getAttribute('data-time'));
            const card = document.getElementById(`block-${blockNum}`);
            if(!card) return;
            const title = card.querySelector('h3').textContent;
            startTimerAndFocus(blockNum, durationMins, title, e.target);
        });
    });

    const exitBtn = document.getElementById('focus-exit-btn');
    if(exitBtn) exitBtn.addEventListener('click', () => exitFocusMode(false));
    
    const finishBtn = document.getElementById('focus-finish-btn');
    if(finishBtn) finishBtn.addEventListener('click', () => exitFocusMode(true));
    
    const pauseBtn = document.getElementById('focus-pause-btn');
    if(pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            isFocusPaused = !isFocusPaused;
            if(isFocusPaused) {
                pauseBtn.innerHTML = '<i data-lucide="play"></i> Wznów';
                clearInterval(focusInterval);
            } else {
                pauseBtn.innerHTML = '<i data-lucide="pause"></i> Zastopuj';
                resumeFocusInterval();
            }
            if(window.lucide) window.lucide.createIcons();
        });
    }

    // Globalne Escape do wyjścia
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const fOverlay = document.getElementById('focus-overlay');
            if (fOverlay && fOverlay.style.display === 'flex') {
                exitFocusMode(false);
            }
        }
    });
}

function resumeFocusInterval() {
    const focusDisplay = document.getElementById('focus-timer-display');
    focusInterval = setInterval(() => {
        if(isFocusPaused) return;
        currentFocusDuration--;
        let m = Math.floor(currentFocusDuration / 60);
        let s = currentFocusDuration % 60;
        let str = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        focusDisplay.textContent = str;
        
        if(currentFocusDuration <= 0) {
            exitFocusMode(true);
            let audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'); 
            audio.play().catch(e=>{});
        }
    }, 1000);
}

function startTimerAndFocus(blockNum, minutes, title, btnElement) {
    const focusOverlay = document.getElementById('focus-overlay');
    currentFocusDuration = minutes * 60;
    currentFocusTotal = minutes * 60;
    currentFocusTitle = title;
    isFocusPaused = false;
    
    const pauseBtn = document.getElementById('focus-pause-btn');
    if(pauseBtn) pauseBtn.innerHTML = '<i data-lucide="pause"></i> Zastopuj';
    
    focusOverlay.style.display = 'flex';
    try {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
    } catch(e) { console.log('Fullscreen rejected'); }

    resumeFocusInterval();
}

function exitFocusMode(saveSession) {
    clearInterval(focusInterval);
    const overlay = document.getElementById('focus-overlay');
    if(overlay) overlay.style.display = 'none';
    if (document.fullscreenElement) document.exitFullscreen().catch(e=>{});
    
    if(saveSession) {
        const spentSeconds = currentFocusTotal - currentFocusDuration;
        const spentMins = Math.round(spentSeconds / 60);
        if(spentMins > 0) {
            const todayStr = getTodayStr();
            const d = new Date();
            const endH = d.getHours();
            const endM = d.getMinutes();
            d.setMinutes(d.getMinutes() - spentMins);
            const startH = d.getHours();
            const startM = d.getMinutes();
            
            const sessionData = {
                title: "Focus: " + currentFocusTitle,
                startMins: startH * 60 + startM,
                durationMins: spentMins,
                timeStr: `${startH.toString().padStart(2,'0')}:${startM.toString().padStart(2,'0')} - ${endH.toString().padStart(2,'0')}:${endM.toString().padStart(2,'0')}`,
                colorHex: "rgba(255,255,255,0.05)",
                dateStr: todayStr
            };
            db.ref(USER_NODE + 'focus_history/' + todayStr).push(sessionData);
            
            if(window.refreshCalendar) setTimeout(window.refreshCalendar, 500); 
        }
    }
}
