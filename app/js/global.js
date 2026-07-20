// js/global.js
import { initFirebase, db, USER_NODE } from './firebase.js';
import { initTopBar, initDayTimeTrack, initSidebarToggle } from './layout.js';
import { initChecklists, initReadingList } from './routines.js';
import { initCalendar } from './calendar.js';

document.addEventListener('DOMContentLoaded', () => {
    initFirebase();
    
    // Global Knowledge Tree initialization (used by modals across pages)
    window.KnowledgeTree = {};
    if (db && USER_NODE) {
        db.ref(USER_NODE + 'knowledge_tree').on('value', snap => {
            window.KnowledgeTree = snap.val() || {};
        });
    }

    if (typeof window.renderSidebar === 'function') {
        window.renderSidebar();
    }

    // Theme Switcher — cycles through all available themes
    const THEMES = ['dark', 'light', 'amber-night', 'ocean-deep', 'rose-dusk', 'arctic'];
    const THEME_LABELS = {
        'dark': '🌑 Ciemny',
        'light': '☀️ Jasny',
        'amber-night': '🌙 Amber Noc',
        'ocean-deep': '🌊 Ocean',
        'rose-dusk': '🌸 Różowy Zmierzch',
        'arctic': '❄️ Arktyczny'
    };
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    const themeBtn = document.getElementById('theme-toggle-btn');
    if(themeBtn) {
        themeBtn.title = THEME_LABELS[currentTheme] || currentTheme;
        themeBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let idx = THEMES.indexOf(theme);
            let next = THEMES[(idx + 1) % THEMES.length];
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            themeBtn.title = THEME_LABELS[next] || next;
        });
    }

    if(window.lucide) window.lucide.createIcons();

    // Initialize global layout and sidebar components
    initTopBar();
    initDayTimeTrack();
    initSidebarToggle();
    initChecklists();
    initReadingList();
    initCalendar();

    const cloudStatus = document.getElementById('cloud-status');
    if(cloudStatus) cloudStatus.style.display = 'inline';

    if (window.localAgentStats) {
        const miniSync = document.getElementById('mini-sync-status');
        if(miniSync) {
            const updateMiniSync = () => {
                const now = new Date();
                miniSync.textContent = now.toISOString().split('T')[0] + " " + now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
            };
            updateMiniSync();
            setInterval(updateMiniSync, 30000); 
        }
        
        const sp = document.getElementById('stat-photos');
        const se = document.getElementById('stat-excels');
        const ss = document.getElementById('stat-storms');
        const ssync = document.getElementById('stat-sync');
        
        if(sp) sp.textContent = window.localAgentStats.photos || 0;
        if(se) se.textContent = window.localAgentStats.excels || 0;
        if(ss) ss.textContent = window.localAgentStats.storms || 0;
        if(ssync) ssync.textContent = "Sync: " + (window.localAgentStats.lastSync || 'Brak');
    }
});
