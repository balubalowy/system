// js/layout.js
import { db, USER_NODE } from '../core/firebase.js';
import { getTodayStr } from '../core/utils.js';

export function initTopBar() {
    const dateElement = document.getElementById('current-date');
    const todayStr = getTodayStr();
    if(dateElement) dateElement.textContent = todayStr;

    // Live Sync & Cloud Status Monitoring
    const cloudStatus = document.getElementById('cloud-status');
    const miniSyncStatus = document.getElementById('mini-sync-status');
    const syncBtn = document.getElementById('btn-force-srs-sync');

    function updateSyncTime() {
        const now = new Date();
        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        if (miniSyncStatus) miniSyncStatus.textContent = `Zsynch. ${timeStr}`;
        if (cloudStatus) {
            cloudStatus.textContent = 'Synced';
            cloudStatus.style.color = 'var(--accent-success)';
        }
    }

    if (db) {
        db.ref('.info/connected').on('value', snap => {
            if (snap.val() === true) {
                updateSyncTime();
            } else {
                if (miniSyncStatus) miniSyncStatus.textContent = 'Offline';
                if (cloudStatus) {
                    cloudStatus.textContent = 'Offline';
                    cloudStatus.style.color = 'var(--accent-warning)';
                }
            }
        });
    }

    if (syncBtn) {
        syncBtn.addEventListener('click', () => {
            if (miniSyncStatus) miniSyncStatus.textContent = 'Łączenie...';
            setTimeout(() => {
                updateSyncTime();
                if (typeof window.refreshSRS === 'function') window.refreshSRS();
            }, 300);
        });
    }

    db.ref(USER_NODE + 'energy').once('value').then(snap => {
        const val = snap.val();
        if (typeof val === 'number') {
            const currentVal = val;
            db.ref(USER_NODE + 'energy').set({
                "2026-07-14": 6,
                "2026-07-15": 8,
                [todayStr]: currentVal
            });
        } else if (val && typeof val === 'object') {
            if (!val["2026-07-14"]) db.ref(USER_NODE + 'energy/2026-07-14').set(6);
            if (!val["2026-07-15"]) db.ref(USER_NODE + 'energy/2026-07-15').set(8);
        }
    });

    const track = document.getElementById('energy-track');
    const fill = document.getElementById('energy-fill');
    const display = document.getElementById('energy-val-display');
    
    if(track && fill && display) {
        db.ref(USER_NODE + 'energy/' + todayStr).on('value', (snapshot) => {
            const val = snapshot.val();
            if(val !== null) {
                fill.style.width = `${(val / 10) * 100}%`;
                display.textContent = `${val}/10`;
            }
        });

        track.addEventListener('click', (e) => {
            const rect = track.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            let percentage = clickX / rect.width;
            if(percentage < 0) percentage = 0;
            if(percentage > 1) percentage = 1;
            
            const newValue = Math.round(percentage * 10);
            const finalValue = Math.max(1, Math.min(10, newValue));
            
            fill.style.width = `${(finalValue / 10) * 100}%`;
            display.textContent = `${finalValue}/10`;
            
            db.ref(USER_NODE + 'energy/' + todayStr).set(finalValue);
        });
    }

    const btnZero = document.getElementById('btn-zero-energy');
    if(btnZero) {
        btnZero.addEventListener('click', () => {
            db.ref(USER_NODE + 'energy/' + todayStr).set(2);
            document.documentElement.style.filter = 'grayscale(100%)';
            setTimeout(() => document.documentElement.style.filter = 'none', 3000); 
        });
    }
}

export function initDayTimeTrack() {
    const timeFill = document.getElementById('time-fill');
    const timeVal = document.getElementById('time-val-display');
    if(!timeFill) return;
    
    function update() {
        const now = new Date();
        const start = 7 * 60; 
        const end = 22 * 60;  
        const current = now.getHours() * 60 + now.getMinutes();
        
        let pct = ((current - start) / (end - start)) * 100;
        if(pct < 0) pct = 0;
        if(pct > 100) pct = 100;
        
        timeFill.style.width = pct + '%';
        timeVal.textContent = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        
        const timeLine = document.getElementById('current-time-line');
        const sidebarLine = document.getElementById('sidebar-red-line');
        
        if(pct >= 0 && pct <= 100) {
            if(timeLine) { timeLine.style.top = pct + '%'; timeLine.style.display = 'block'; }
            if(sidebarLine) { sidebarLine.style.top = pct + '%'; sidebarLine.style.display = 'block'; }
        } else {
            if(timeLine) timeLine.style.display = 'none';
            if(sidebarLine) sidebarLine.style.display = 'none';
        }
    }
    window._updateTimeTrack = update;
    update();
    setInterval(update, 60000);
}

export function initSidebarToggle() {
    const btnDesktop = document.getElementById('sidebar-toggle-btn');
    const btnMobile = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const body = document.querySelector('body');
    const backdrop = document.getElementById('sidebar-backdrop');
    
    if(!sidebar) return;

    if(btnDesktop) {
        btnDesktop.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            body.classList.toggle('sidebar-collapsed');
        });
    }

    if(btnMobile) {
        btnMobile.addEventListener('click', () => {
            sidebar.classList.add('mobile-open');
            if(backdrop) backdrop.classList.add('active');
        });
    }

    if(backdrop) {
        backdrop.addEventListener('click', () => {
            sidebar.classList.remove('mobile-open');
            backdrop.classList.remove('active');
        });
    }

    const links = sidebar.querySelectorAll('a, .btn:not(#sidebar-toggle-btn)');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 1024) {
                sidebar.classList.remove('mobile-open');
                if(backdrop) backdrop.classList.remove('active');
            }
        });
    });
}
