// js/global.js
import { initFirebase, db, USER_NODE } from './firebase.js';
import { initTopBar, initDayTimeTrack, initSidebarToggle } from '../ui/layout.js';
import { initChecklists } from '../dashboard/routines.js';
import { initEducation } from '../dashboard/education.js';
import { initCalendar } from '../dashboard/calendar.js';
import { initNotifications, initForegroundMessaging } from '../notifications/notifications.js';
import { initSettings } from '../notifications/settings.js';
import { DEFAULT_KNOWLEDGE_AREAS, DEFAULT_KNOWLEDGE_TREE } from '../knowledge/data/index.js';

document.addEventListener('DOMContentLoaded', () => {
    initFirebase();
    
    // Global Knowledge Tree initialization (used by modals across pages)
    if (!window.appData) window.appData = {};
    window.appData.knowledgeAreas = DEFAULT_KNOWLEDGE_AREAS;
    window.KnowledgeTree = DEFAULT_KNOWLEDGE_TREE;
    
    if (db && USER_NODE) {
        db.ref(USER_NODE + 'knowledge_tree').on('value', snap => {
            const val = snap.val();
            if (val && Object.keys(val).length > 0) {
                window.KnowledgeTree = val;
            }
        });
    }

    if (typeof window.renderSidebar === 'function') {
        window.renderSidebar();
    }

    // Theme Switcher — cycles through all available themes
    const THEMES = ['dark', 'light', 'amber-night', 'ocean-deep', 'rose-dusk', 'arctic'];
    const THEME_LABELS = {
        'dark': 'Ciemny',
        'light': 'Jasny',
        'amber-night': 'Amber Noc',
        'ocean-deep': 'Ocean',
        'rose-dusk': 'Różowy Zmierzch',
        'arctic': 'Arktyczny'
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
    initEducation();
    initCalendar();
    initSettings();
    initNotifications();
    initForegroundMessaging();

    const cloudStatus = document.getElementById('cloud-status');
    if(cloudStatus) cloudStatus.style.display = 'inline';

    // Mini sync clock — works on every page
    const miniSync = document.getElementById('mini-sync-status');
    if(miniSync) {
        const updateMiniSync = () => {
            const now = new Date();
            miniSync.textContent = now.toISOString().split('T')[0] + " " + now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
        };
        updateMiniSync();
        setInterval(updateMiniSync, 30000); 
    }

    function renderStatsUI(stats) {
        const setTxt = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = (val !== undefined && val !== null) ? val : 0;
        };

        setTxt('stat-photos', stats.photos);
        setTxt('stat-excels', stats.excels);
        setTxt('stat-storms', stats.storms);
        
        const ssync = document.getElementById('stat-sync');
        if (ssync) ssync.textContent = "Sync: " + (stats.lastSync || 'Brak');

        setTxt('stat-shunts', stats.stormHunts);
        setTxt('stat-sdays', stats.stormDaysHunts);
        setTxt('stat-stotal', stats.stormTotal);
        setTxt('stat-sdtotal', stats.stormDaysTotal);

        const skm = document.getElementById('stat-skm');
        if (skm) skm.textContent = (stats.stormKm || 0) + ' km';

        setTxt('s-brak', stats.sBrak);
        setTxt('s-slaba', stats.sSlaba);
        setTxt('s-umiar', stats.sUmiar);
        setTxt('s-silna', stats.sSilna);
        setTxt('s-bsilna', stats.sBsilna);
        setTxt('s-ekstr', stats.sEkstr);
    }

    const defaultStats = window.localAgentStats || {};
    if (db && USER_NODE) {
        db.ref(USER_NODE + 'stats').on('value', snap => {
            renderStatsUI(snap.val() || defaultStats);
        });
    } else {
        renderStatsUI(defaultStats);
    }
});
