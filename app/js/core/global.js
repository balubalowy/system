// js/global.js
import { initFirebase, db, USER_NODE } from './firebase.js';
import { initTopBar, initDayTimeTrack, initSidebarToggle } from '../ui/layout.js';
import { initChecklists, initReadingList } from '../dashboard/routines.js';
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

    // Dashboard-only stats (requires local_data.js)
    if (window.localAgentStats) {
        const sp = document.getElementById('stat-photos');
        const se = document.getElementById('stat-excels');
        const ss = document.getElementById('stat-storms');
        const ssync = document.getElementById('stat-sync');
        
        if(sp) sp.textContent = window.localAgentStats.photos || 0;
        if(se) se.textContent = window.localAgentStats.excels || 0;
        if(ss) ss.textContent = window.localAgentStats.storms || 0;
        if(ssync) ssync.textContent = "Sync: " + (window.localAgentStats.lastSync || 'Brak');
        
        if(document.getElementById('stat-shunts')) document.getElementById('stat-shunts').textContent = window.localAgentStats.stormHunts || 0;
        if(document.getElementById('stat-sdays')) document.getElementById('stat-sdays').textContent = window.localAgentStats.stormDaysHunts || 0;
        if(document.getElementById('stat-stotal')) document.getElementById('stat-stotal').textContent = window.localAgentStats.stormTotal || 0;
        if(document.getElementById('stat-sdtotal')) document.getElementById('stat-sdtotal').textContent = window.localAgentStats.stormDaysTotal || 0;
        if(document.getElementById('stat-skm')) document.getElementById('stat-skm').textContent = (window.localAgentStats.stormKm || 0) + ' km';
        
        if(document.getElementById('s-brak')) document.getElementById('s-brak').textContent = window.localAgentStats.sBrak || 0;
        if(document.getElementById('s-slaba')) document.getElementById('s-slaba').textContent = window.localAgentStats.sSlaba || 0;
        if(document.getElementById('s-umiar')) document.getElementById('s-umiar').textContent = window.localAgentStats.sUmiar || 0;
        if(document.getElementById('s-silna')) document.getElementById('s-silna').textContent = window.localAgentStats.sSilna || 0;
        if(document.getElementById('s-bsilna')) document.getElementById('s-bsilna').textContent = window.localAgentStats.sBsilna || 0;
        if(document.getElementById('s-ekstr')) document.getElementById('s-ekstr').textContent = window.localAgentStats.sEkstr || 0;
        
        // Edukacja - Srednie
        const g1 = document.getElementById('edu-g1');
        if (g1) {
            document.getElementById('edu-g1').textContent = window.localAgentStats.g1 || '...';
            document.getElementById('edu-g2').textContent = window.localAgentStats.g2 || '...';
            document.getElementById('edu-g3').textContent = window.localAgentStats.g3 || '...';
            document.getElementById('edu-g4').textContent = window.localAgentStats.g4 || '...';
            document.getElementById('edu-g5').textContent = window.localAgentStats.g5 || '...';
            document.getElementById('edu-g6').textContent = window.localAgentStats.g6 || '...';
            
            let sum = 0;
            let count = 0;
            [window.localAgentStats.g1, window.localAgentStats.g2, window.localAgentStats.g3, window.localAgentStats.g4, window.localAgentStats.g5, window.localAgentStats.g6].forEach(g => {
                if (g) {
                    let val = parseFloat(g.replace(',','.'));
                    if (!isNaN(val)) { sum += val; count++; }
                }
            });
            if (count > 0) {
                let total = (sum / count).toFixed(2).replace('.', ',');
                document.getElementById('edu-gtotal').textContent = total;
            }
        }
        
        // Edukacja - Plan
        const pContainer = document.getElementById('edu-plan');
        if (pContainer && window.localAgentStats.plan) {
            pContainer.innerHTML = window.localAgentStats.plan.map((p, idx) => {
                const color = p.type === 'E' ? 'var(--accent-danger)' : 'var(--accent-success)';
                const bg = idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)';
                return `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 16px; background:${bg}; border-bottom:1px solid var(--border-subtle);">
                        <span style="font-size:0.9rem; color:var(--text-primary); flex:1;">${p.name}</span>
                        <div style="display:flex; gap:8px; align-items:center;">
                            <span style="font-size:0.75rem; color:var(--text-secondary); font-family:var(--font-mono);">${p.ects} ECTS</span>
                            <span style="font-size:0.75rem; font-weight:700; color:${color}; border:1px solid ${color}; border-radius:4px; padding:2px 6px;">${p.type}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
});
