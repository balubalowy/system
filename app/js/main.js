// js/main.js
import { initFirebase, db, USER_NODE } from './firebase.js';
import { initTopBar, initDayTimeTrack, initSidebarToggle, initIdeasEngine, initChecklists, initDailyTasks, initReadingList } from './ui.js';
import { initTimersAndFocus } from './timers.js';
import { initCalendar } from './calendar.js';
import { initInteractiveTasks } from './tasks.js';
import { initSRS } from './srs.js';
import { initCharts } from './charts.js';

document.addEventListener('DOMContentLoaded', () => {
    initFirebase();
    
    // Knowledge Tree Inicjalizacja do globalnego obiektu, jako jedyny potrzebny w locie wyjątek
    window.KnowledgeTree = {};
    if (db && USER_NODE) {
        db.ref(USER_NODE + 'knowledge_tree').on('value', snap => {
            window.KnowledgeTree = snap.val() || {};
        });
    }

    // Theme Switcher
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    const themeBtn = document.getElementById('theme-toggle-btn');
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let next = theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    initTopBar();
    initChecklists();
    initDailyTasks();
    initTimersAndFocus();
    initSRS();
    initCalendar();
    initReadingList();
    initDayTimeTrack();
    initSidebarToggle();
    initIdeasEngine();
    initInteractiveTasks();
    
    setTimeout(() => { initCharts(); }, 500);
    
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
