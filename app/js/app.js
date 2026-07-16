// app.js - System Życia V7 (Z pełnym fukusem, bazą fiszek, wykresami i gridem)

const CATEGORY_COLORS = {
    "Matematyka & Statystyka": "#2F81F7", 
    "Ekonomia & Finanse": "#3FB950",      
    "Technologie & Analityka": "#A371F7", 
    "Języki & Komunikacja": "#D29922",    
    "Specjalistyczne & Rozwój": "#F85149" 
};

// --- BAZA "SYSTEMU ŻYCIA" (GIGANTYCZNY DECK) ---
const HUGE_DECK = {
    "s1": { q: "P-value", a: "Prawdopodobieństwo uzyskania statystyki testowej równej lub bardziej ekstremalnej niż obserwowana, przy założeniu, że H0 jest prawdziwa.", interval:0, ef:2.5 },
    "s2": { q: "Wariancja a Odch. Std.", a: "Wariancja to średnia kwadratów odchyleń od średniej. Odch. Std. to jej pierwiastek (wraca do pierwotnej jednostki).", interval:0, ef:2.5 },
    "s3": { q: "Rozkład Normalny (3 sigmy)", a: "68% obs. w 1 odch. std., 95% w 2, a 99.7% w 3.", interval:0, ef:2.5 },
    "s4": { q: "Błąd I i II rodzaju", a: "I: Odrzucenie prawdziwej H0 (alfa). II: Przyjęcie fałszywej H0 (beta).", interval:0, ef:2.5 },
    "p1": { q: "Pandas: Usunięcie braków", a: "df.dropna()", interval:0, ef:2.5 },
    "p2": { q: "Pandas: Grupowanie (Miasto i średnia Cen)", a: "df.groupby('Miasto')['Ceny'].mean()", interval:0, ef:2.5 },
    "p3": { q: "Pandas: Odczyt CSV i Excel", a: "pd.read_csv('plik.csv'), pd.read_excel('plik.xlsx')", interval:0, ef:2.5 },
    "p4": { q: "Numpy: Tablica zer (2 wiersze, 3 kol)", a: "np.zeros((2, 3))", interval:0, ef:2.5 },
    "e1": { q: "VLOOKUP a XLOOKUP", a: "XLOOKUP szuka w obie strony (lewo/prawo), nie wymaga liczenia numeru kolumny, radzi sobie z wstawianiem nowych wierszy.", interval:0, ef:2.5 },
    "e2": { q: "Funkcja SUMIFS", a: "Sumuje wartości tylko gdy spełnione jest wiele kryteriów (np. suma dla Region=Wawa ORAZ Rok=2026).", interval:0, ef:2.5 },
    "e3": { q: "Skrót: Twarde blokowanie komórki ($)", a: "Klawisz F4. Pozwala na zablokowanie rzędu/kolumny przy przeciąganiu wzoru.", interval:0, ef:2.5 },
    "f1": { q: "EBITDA", a: "Zysk operacyjny przed odsetkami, podatkami i amortyzacją. Proxy cash-flow na działalności operacyjnej firmy.", interval:0, ef:2.5 },
    "f2": { q: "Wycena modelem DCF", a: "Suma przyszłych, przewidywanych przepływów pieniężnych (FCF) zdyskontowanych na dzisiaj przy użyciu WACC.", interval:0, ef:2.5 },
    "f3": { q: "Risk-Free Rate (Stopa wolna od ryzyka)", a: "Rentowność superbezpiecznych aktywów (głównie 10-letnie obligacje skarbowe USA/Państwa), podstawa do obliczania WACC.", interval:0, ef:2.5 },
    "f4": { q: "CAPM (Capital Asset Pricing Model)", a: "Wzór na koszt kapitału własnego: R_f + Beta * (R_m - R_f). Gdzie R_m to rynkowa stopa zwrotu.", interval:0, ef:2.5 },
    "l1": { q: "Zasada 5 minut dla ADHD", a: "Bariera rozpoczęcia pracy to iluzja dopaminowa. Zobowiąż się tylko na 5 minut bez oceny. Ciało migdałowate w mózgu puści strach.", interval:0, ef:2.5 },
    "l2": { q: "Dopamina poranna", a: "Żadnych ekranów (social media/newsy) przed pierwszą głęboką pracą. Scrollowanie ustawia tani Baseline dopaminy na cały dzień, niszcząc zapał do trudnych akcji.", interval:0, ef:2.5 },
    "l3": { q: "Prawo Parkinsona", a: "Praca rozszerza się tak, aby wypełnić czas dostępny na jej ukończenie. Skracaj deadliny celowo.", interval:0, ef:2.5 }
};


// --- FIREBASE INIT ---
// Konfiguracja przeniesiona do firebase_init.js by zasilać inne podstrony (np. knowledge.html, inbox.html)
// db oraz USER_NODE są tam zdefiniowane i ładowane globalnie.

document.addEventListener('DOMContentLoaded', () => {
    const isAuth = localStorage.getItem('ag_auth');
    if(!isAuth) {
        document.getElementById('pin-overlay').style.display = 'flex';
        document.getElementById('pin-submit-btn').addEventListener('click', checkPin);
    } else {
        document.getElementById('pin-overlay').style.display = 'none';
        initApp();
    }
});

// Nasłuchiwanie klawisza Escape w systemie
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const kModal = document.getElementById('knowledge-modal');
        if (kModal && kModal.style.display !== 'none') {
            kModal.style.display = 'none';
        }
        
        const fOverlay = document.getElementById('focus-overlay');
        if (fOverlay && fOverlay.style.display === 'flex') {
            // Zakończenie Focus Mode przez escape to odrzucenie bez zapisu
            exitFocusMode(false);
        }
    }
});

function checkPin() {
    const p = document.getElementById('pin-input').value;
    db.ref(USER_NODE + 'auth/pin').once('value').then(snap => {
        const validPin = snap.val() || '1234'; // Domyślny 1234 jeśli brak w DB
        if(p === validPin) {
            localStorage.setItem('ag_auth', '1');
            document.getElementById('pin-overlay').style.display = 'none';
            initApp();
            initReadingList();
        } else {
            document.getElementById('pin-error').style.display = 'block';
        }
    });
}

function initApp() {
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
    document.getElementById('cloud-status').style.display = 'inline';

    if (window.localAgentStats) {
        const miniSync = document.getElementById('mini-sync-status');
        if(miniSync) {
            miniSync.textContent = (window.localAgentStats.lastSync || '');
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
}

function getTodayStr() {
    return new Date().toISOString().split('T')[0];
}

function initTopBar() {
    const dateElement = document.getElementById('current-date');
    const todayStr = getTodayStr();
    if(dateElement) dateElement.textContent = todayStr;

    const track = document.getElementById('energy-track');
    const fill = document.getElementById('energy-fill');
    const display = document.getElementById('energy-val-display');
    
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

    // Zero Energy Button
    document.getElementById('btn-zero-energy').addEventListener('click', () => {
        db.ref(USER_NODE + 'energy/' + todayStr).set(2); // low energy fallback
        document.documentElement.style.filter = 'grayscale(100%)';
        setTimeout(() => document.documentElement.style.filter = 'none', 3000); // wizualny feedback
    });
}

function initDayTimeTrack() {
    const timeFill = document.getElementById('time-fill');
    const timeVal = document.getElementById('time-val-display');
    if(!timeFill) return;
    
    function update() {
        const now = new Date();
        const start = 7 * 60; // 07:00 (420 mins)
        const end = 22 * 60;  // 22:00 (1320 mins)
        const current = now.getHours() * 60 + now.getMinutes();
        
        let pct = ((current - start) / (end - start)) * 100;
        if(pct < 0) pct = 0;
        if(pct > 100) pct = 100;
        
        timeFill.style.width = pct + '%';
        timeVal.textContent = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        
        // Pasek na kalendarzu tygodniowym i Mini Timeline w Szufladzie
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

function initSidebarToggle() {
    const btn = document.getElementById('sidebar-toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    const body = document.querySelector('body');
    if(!btn || !sidebar) return;
    btn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        body.classList.toggle('sidebar-collapsed');
    });
}

function initIdeasEngine() {
    const btn = document.getElementById('btn-save-idea');
    const dump = document.getElementById('ai-dump');
    if(!btn || !dump) return;
    
    btn.addEventListener('click', () => {
        const text = dump.value.trim();
        if(!text) return;
        
        btn.innerHTML = '<i data-lucide="loader"></i> Zapisywanie...';
        if(window.lucide) lucide.createIcons();
        
        db.ref(USER_NODE + 'ideas').push({
            text: text,
            date: new Date().toISOString(),
            status: 'idea'
        }).then(() => {
            dump.value = '';
            btn.innerHTML = '<i data-lucide="check"></i> Zapisano w bazie';
            btn.style.color = 'var(--accent-success)';
            if(window.lucide) lucide.createIcons();
            setTimeout(() => {
                btn.innerHTML = '<i data-lucide="download-cloud"></i> Wrzuć do Bazy';
                btn.style.color = '';
                if(window.lucide) lucide.createIcons();
            }, 3000);
        });
    });
}


// --- CHECKLISTS (SYNCED) ---
function initChecklists() {
    renderChecklist('morning-routine', window.appData.routines.morning);
    renderChecklist('evening-routine', window.appData.routines.evening);
}

function renderChecklist(elementId, items) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    const todayStr = getTodayStr();
    
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'notion-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'notion-checkbox';
        checkbox.id = item.id;
        
        db.ref(USER_NODE + 'routines/' + todayStr + '/' + item.id).on('value', (snapshot) => {
            const val = snapshot.val() || false;
            checkbox.checked = val;
            if(val) div.classList.add('checked'); else div.classList.remove('checked');
        });
        
        checkbox.addEventListener('change', (e) => {
            db.ref(USER_NODE + 'routines/' + todayStr + '/' + item.id).set(e.target.checked);
        });

        const label = document.createElement('label');
        label.className = 'notion-label';
        label.htmlFor = item.id;
        label.textContent = item.title;
        label.style.cursor = 'pointer';
        label.style.flexGrow = '1';
        label.style.fontSize = '0.85rem';

        div.appendChild(checkbox);
        div.appendChild(label);
        container.appendChild(div);
    });
}

// --- DAILY TASKS ---
function initDailyTasks() {
    const todayStr = getTodayStr();
    const taskRef = db.ref(USER_NODE + 'daily_tasks/' + todayStr);
    
    taskRef.once('value').then((snapshot) => {
        let tasks = snapshot.val();
        if(!tasks) {
            // Wczytujemy z Inboxa (zrzutni) zamiast losować
            db.ref(USER_NODE + 'inbox').once('value').then(inboxSnap => {
                let inbox = inboxSnap.val() || {};
                
                function extractFirstTask(categoryKey, fallbackText) {
                    if(!inbox[categoryKey]) return fallbackText;
                    let lines = inbox[categoryKey].split('\n').filter(l => l.trim().length > 0);
                    if(lines.length === 0) return fallbackText;
                    let firstTask = lines.shift();
                    inbox[categoryKey] = lines.join('\n');
                    return firstTask;
                }

                tasks = {
                    priority: extractFirstTask('priority', "Zdefiniuj zadanie w Zrzutni."),
                    admin: extractFirstTask('admin', "Brak zaplanowanej administracji."),
                    light: extractFirstTask('light', "Brak zadań lekkich w bazie."),
                    sensory: extractFirstTask('sensory', "Mata z kolcami lub spacer.")
                };
                
                taskRef.set(tasks);
                db.ref(USER_NODE + 'inbox').set(inbox); // Kasuje pobrane linijki
                renderSuggestedTasks(tasks);
            });
        } else {
            renderSuggestedTasks(tasks);
        }
    });
}

function renderSuggestedTasks(tasks) {
    const p = document.getElementById('suggested-priority');
    if(p) p.textContent = tasks.priority || "Brak zadania.";
    
    const a = document.getElementById('suggested-admin');
    if(a) a.textContent = tasks.admin || "Brak zadania.";
    
    const l = document.getElementById('suggested-light');
    if(l) l.textContent = tasks.light || "Brak zadania.";
    
    const s = document.getElementById('suggested-sensory');
    if(s) s.textContent = tasks.sensory || "Brak zadania.";
}

// --- TIMERS & FOCUS MODE (V7) ---
let focusInterval;
let isFocusPaused = false;
let currentFocusDuration = 0; // w sekundach
let currentFocusTotal = 0; 
let currentFocusTitle = "";

function initTimersAndFocus() {
    const startBtns = document.querySelectorAll('.start-block-btn');
    startBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(!e.target.hasAttribute('data-target')) return;
            const blockNum = e.target.getAttribute('data-target');
            const durationMins = parseInt(e.target.getAttribute('data-time'));
            const card = document.getElementById(`block-${blockNum}`);
            const title = card.querySelector('h3').textContent;
            startTimerAndFocus(blockNum, durationMins, title, e.target);
        });
    });

    document.getElementById('focus-exit-btn').addEventListener('click', () => exitFocusMode(false));
    document.getElementById('focus-finish-btn').addEventListener('click', () => exitFocusMode(true));
    
    const pauseBtn = document.getElementById('focus-pause-btn');
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
    document.getElementById('focus-pause-btn').innerHTML = '<i data-lucide="pause"></i> Zastopuj';
    
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
    document.getElementById('focus-overlay').style.display = 'none';
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
            if(window.initCalendar) setTimeout(window.initCalendar, 500); // Odśwież kalendarz!
        }
    }
}

// --- SRS CHMURA Z SYNCEM BAZY ŻYCIA ---
window.refreshSRS = null;

function initSRS() {
    const qDisplay = document.getElementById('srs-q');
    const revealBtn = document.getElementById('srs-reveal');
    const actionsPanel = document.getElementById('srs-actions');
    const statusText = document.getElementById('srs-status');
    
    const dbSrsRef = db.ref(USER_NODE + 'srs_deck');
    
    const syncHugeDeck = () => {
        qDisplay.textContent = "Synchronizacja Life System Deck...";
        const todayStr = getTodayStr();
        let compiledDeck = {};
        for(let k in HUGE_DECK) {
            compiledDeck[k] = { ...HUGE_DECK[k], nextReview: todayStr };
        }
        dbSrsRef.set(compiledDeck).then(() => {
            alert("Baza Życia została zsynchronizowana z Firebase! Powodzenia w potężnej nauce.");
            loadDueCard();
        });
    };

    document.getElementById('btn-force-srs-sync').addEventListener('click', syncHugeDeck);

    dbSrsRef.once('value').then(snap => {
        if(!snap.exists()) { syncHugeDeck(); } else { loadDueCard(); }
    });

    let currentCardKey = null;
    let currentCardData = null;
    
    window.refreshSRS = loadDueCard;

    function loadDueCard() {
        const todayStr = getTodayStr();
        const activeCat = window.ACTIVE_SRS_CATEGORY || "all";
        
        dbSrsRef.once('value').then(snap => {
            const deck = snap.val();
            let dueCards = [];
            
            for(let key in deck) {
                // Heurystyka prefiksowa: dopasowanie kategorii z litery klucza
                let itemCat = "Unknown";
                if(key.startsWith('s')) itemCat = "Matematyka & Statystyka";
                if(key.startsWith('f')) itemCat = "Ekonomia & Finanse";
                if(key.startsWith('p') || key.startsWith('e')) itemCat = "Technologie & Analityka";
                if(key.startsWith('l')) itemCat = "Specjalistyczne & Rozwój";
                
                if(deck[key].nextReview <= todayStr) {
                    if(activeCat === "all" || activeCat === itemCat) {
                        dueCards.push({ key: key, data: deck[key] });
                    }
                }
            }
            
            if(dueCards.length > 0) {
                const rnd = dueCards[Math.floor(Math.random() * dueCards.length)];
                currentCardKey = rnd.key;
                currentCardData = rnd.data;
                
                qDisplay.textContent = rnd.data.q;
                revealBtn.style.display = 'block';
                actionsPanel.style.display = 'none';
                statusText.textContent = `Fiszek w kolejce dożywiania mózgu: ${dueCards.length}`;
            } else {
                qDisplay.textContent = "Zero fiszek. Pamięć na najwyższych obrotach.";
                revealBtn.style.display = 'none';
                actionsPanel.style.display = 'none';
                statusText.textContent = "Ukończono trening.";
            }
        });
    }

    revealBtn.addEventListener('click', () => {
        qDisplay.innerHTML = `<strong>P:</strong> ${currentCardData.q} <br><br> <strong style="color:#3FB950">Odp:</strong> ${currentCardData.a}`;
        revealBtn.style.display = 'none';
        actionsPanel.style.display = 'grid';
    });

    const processSM2 = (quality) => {
        let { interval, ef } = currentCardData;
        if (quality === 0) {
            interval = 0;
        } else {
            if (interval === 0) interval = 1;
            else if (interval === 1) interval = 3;
            else interval = Math.round(interval * ef);
        }

        ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        if (ef < 1.3) ef = 1.3; 

        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + interval);
        
        dbSrsRef.child(currentCardKey).update({
            interval: interval,
            ef: ef,
            nextReview: nextDate.toISOString().split('T')[0]
        }).then(() => {
            loadDueCard();
        });
    };

    document.getElementById('srs-bad').addEventListener('click', () => processSM2(0));
    document.getElementById('srs-mid').addEventListener('click', () => processSM2(3));
    document.getElementById('srs-good').addEventListener('click', () => processSM2(5));
}

// --- CALENDAR INTEGRATION (TIME-GRID + LIST) ---
const START_HOUR = 7;
const END_HOUR = 22;
const TOTAL_MINS = (END_HOUR - START_HOUR) * 60;

let currentWeekOffset = 0;
let calendarEventsRaw = [];
let focusEventsRaw = [];
let currentCalendarMode = 'week';

function initCalendar() {
    drawTimeAxis();
    bindCalendarControls();
    
    const calPanelToday = document.getElementById('sidebar-timeline');
    const proxyUrlV2 = "https://script.google.com/macros/s/AKfycbx5x6wNjwrWdAysQoroCW-OhsvDWgUU8Z17MPEWfoeeb9iXLyeKZoAQ666-gpq838NmPA/exec";

    if(calPanelToday) {
        calPanelToday.innerHTML = "<div style='padding:10px; font-size:0.85rem; color:var(--text-secondary);'>Wczytywanie Hubu Czasu...</div>";
    }
    
    fetch(proxyUrlV2)
      .then(res => res.json())
      .then(data => {
          calendarEventsRaw = (data.events || []).map(e => {
              let t = e.title.toLowerCase();
              if(t.includes('kognitywn')) e.colorHex = '#2BBF71';
              else if(t.includes('administracj')) e.colorHex = '#0A84FF';
              else if(t.includes('zadanie lekkie') || t.includes('lekk')) e.colorHex = '#FF9F0A';
              else if(t.includes('spotkanie') || t.includes('wydarzenie') || t.includes('call')) e.colorHex = '#BF5AF2';
              return e;
          });
          db.ref(USER_NODE + 'focus_history').once('value').then(snap => {
              const fData = snap.val();
              focusEventsRaw = [];
              if(fData) {
                  for(let dateStr in fData) {
                      for(let key in fData[dateStr]) {
                          let item = fData[dateStr][key];
                          let dObj = new Date(dateStr);
                          let dIdx = dObj.getDay() === 0 ? 6 : dObj.getDay() - 1; 
                          focusEventsRaw.push({
                              ...item,
                              dateStr: dateStr,
                              dayIndex: dIdx
                          });
                      }
                  }
              }
              renderCalendarViews();
          });
      })
      .catch(err => {
          calPanelToday.innerHTML = "Błąd pobierania kalendarza.";
          console.error(err);
      });
}

function bindCalendarControls() {
    document.getElementById('cal-prev-btn').addEventListener('click', () => { currentWeekOffset--; renderCalendarViews(); });
    document.getElementById('cal-next-btn').addEventListener('click', () => { currentWeekOffset++; renderCalendarViews(); });
    document.getElementById('cal-month-btn').addEventListener('click', () => {
        currentCalendarMode = currentCalendarMode === 'week' ? 'month' : 'week';
        document.getElementById('cal-month-btn').innerHTML = currentCalendarMode === 'week' ? '<i data-lucide="calendar-days"></i> Widok Miesiąca' : '<i data-lucide="calendar-range"></i> Widok Tygodnia';
        if(window.lucide) window.lucide.createIcons();
        renderCalendarViews();
    });
}

function getStartOfWeekDate(offsetWeeks = 0) {
    let d = new Date();
    let day = d.getDay() === 0 ? 6 : d.getDay() - 1;
    d.setDate(d.getDate() - day + (offsetWeeks * 7));
    return d;
}

function generateDatesForWeek(offsetWeeks) {
    let start = getStartOfWeekDate(offsetWeeks);
    let dates = [];
    for(let i=0; i<7; i++) {
        let nD = new Date(start);
        nD.setDate(start.getDate() + i);
        let offsetDateStr = new Date(nD.getTime() - (nD.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
        dates.push(offsetDateStr);
    }
    return dates;
}

function renderCalendarViews() {
    const allEvents = [...calendarEventsRaw, ...focusEventsRaw];
    renderTodayList(allEvents, document.getElementById('calendar-panel-today'));
    
    if(currentWeekOffset === 0) document.getElementById('cal-current-label').textContent = "Obecny Tydzień";
    else if(currentWeekOffset < 0) document.getElementById('cal-current-label').textContent = `${Math.abs(currentWeekOffset)} tyg. temu`;
    else document.getElementById('cal-current-label').textContent = `Za ${currentWeekOffset} tyg.`;
    
    const validDates = generateDatesForWeek(currentWeekOffset);
    const weeklyEvents = allEvents.filter(e => validDates.includes(e.dateStr));
    
    if(currentCalendarMode === 'week') {
        document.getElementById('calendar-week-view').style.display = 'flex';
        document.getElementById('calendar-month-view').style.display = 'none';
        
        validDates.forEach((dStr, idx) => {
            const headerEl = document.getElementById(`header-${idx}`);
            if(!headerEl) return;
            const parts = dStr.split('-');
            const dayNames = ["PON", "WT", "ŚR", "CZW", "PT", "SOB", "NDZ"];
            headerEl.textContent = `${dayNames[idx]} ${parts[2]}.${parts[1]}`;
            if(dStr === getTodayStr()) headerEl.style.color = 'var(--accent-primary)';
            else headerEl.style.color = 'var(--text-secondary)';
        });
        renderWeekGrid(weeklyEvents);
    } else {
        document.getElementById('calendar-week-view').style.display = 'none';
        document.getElementById('calendar-month-view').style.display = 'block';
        renderMonthGrid(allEvents);
    }
}

function renderMonthGrid(allEvents) {
    let startD = getStartOfWeekDate(currentWeekOffset);
    startD.setDate(1);
    let startDayIdx = startD.getDay() === 0 ? 6 : startD.getDay() - 1;
    let gridStart = new Date(startD);
    gridStart.setDate(startD.getDate() - startDayIdx);
    
    const container = document.getElementById('month-days-grid');
    container.innerHTML = '';
    
    for(let i=0; i<35; i++) {
        let loopDate = new Date(gridStart);
        loopDate.setDate(gridStart.getDate() + i);
        let loopDateStr = new Date(loopDate.getTime() - (loopDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
        
        const dayEvents = allEvents.filter(e => e.dateStr === loopDateStr);
        let isToday = loopDateStr === getTodayStr();
        
        let html = `<div style="padding: 4px; border: 1px solid var(--border-subtle); border-radius: 4px; min-height:60px; background: ${isToday ? 'rgba(47, 129, 247, 0.1)' : 'transparent'}; text-align: left;">`;
        html += `<div style="font-size:0.75rem; text-align:right; margin-bottom: 4px; color:${isToday ? 'var(--accent-primary)' : 'var(--text-secondary)'}; font-weight:bold;">${loopDate.getDate()}</div>`;
        
        let eventHtml = `<div style="display:flex; flex-wrap:wrap; gap:2px;">`;
        dayEvents.slice(0, 8).forEach(ev => {
            eventHtml += `<div title="${ev.timeStr} - ${ev.title}" style="width:10px; height:10px; background:${ev.colorHex}; border-radius:2px;"></div>`;
        });
        if(dayEvents.length > 8) eventHtml += `<div style="font-size:8px; color:var(--text-secondary);">+${dayEvents.length-8}</div>`;
        eventHtml += `</div>`;
        
        html += eventHtml + `</div>`;
        container.innerHTML += html;
    }
}

function drawTimeAxis() {
    const timeAxis = document.getElementById('time-axis');
    timeAxis.innerHTML = '';
    for(let h=START_HOUR; h<=END_HOUR; h++) {
        let topPercent = ((h - START_HOUR) / (END_HOUR - START_HOUR)) * 100;
        timeAxis.innerHTML += `<div class="time-slot" style="top: ${topPercent}%;">${h.toString().padStart(2,'0')}:00</div>`;
    }
}

function renderTodayList(events, container) {
    // container is ignored, we hijack the flow to the new sidebar mini-timeline
    const target = document.getElementById('sidebar-timeline');
    if(!target) return;
    
    const todayStr = getTodayStr();
    const todays = events.filter(e => e.dateStr === todayStr);
    
    // Setting up the grid layout background for 15 minute intervals
    target.style.height = '400px';
    target.style.background = 'var(--bg-secondary)';
    target.style.backgroundImage = 'linear-gradient(var(--border-subtle) 1px, transparent 1px)';
    target.style.backgroundSize = '100% calc(100% / 15)';
    target.style.border = '1px solid var(--border-subtle)';
    target.style.borderRadius = 'var(--radius-sm)';
    target.style.marginLeft = '-10px';
    target.style.marginRight = '10px';
    target.innerHTML = '';
    
    // Draw Hours on Sidebar Timeline
    for(let h=START_HOUR; h<=END_HOUR; h++) {
        let topPercent = ((h - START_HOUR) / (END_HOUR - START_HOUR)) * 100;
        target.innerHTML += `<div style="position:absolute; left: -10px; top: ${topPercent}%; transform:translateY(-50%); font-size: 0.6rem; color: var(--text-secondary); opacity: 0.5; font-family: var(--font-mono);">${h.toString().padStart(2,'0')}:00</div>`;
    }
    
    if(todays.length === 0) {
        target.innerHTML = "<div style='padding:10px; font-size: 0.8rem; text-align:center;'>Brak spotkań na dziś. Czysty umysł.</div>";
        return;
    }

    todays.forEach(ev => {
        const times = ev.timeStr.split(" - ");
        if(times.length !== 2) return;
        const sParts = times[0].split(":");
        const eParts = times[1].split(":");
        const realStartMins = parseInt(sParts[0]) * 60 + parseInt(sParts[1]);
        const realEndMins = parseInt(eParts[0]) * 60 + parseInt(eParts[1]);
        const durationMins = realEndMins - realStartMins;

        let topPercent = ((realStartMins - (START_HOUR * 60)) / TOTAL_MINS) * 100;
        let heightPercent = (durationMins / TOTAL_MINS) * 100;

        if (topPercent < 0) {
            heightPercent += topPercent;
            topPercent = 0;
        }
        if (topPercent + heightPercent > 100) {
            heightPercent = 100 - topPercent;
        }

        let html = `<div style="position: absolute; top: ${topPercent}%; left: 2px; right: 2px; height: ${heightPercent}%; background: ${ev.colorHex}; border-radius: 4px; padding: 2px 4px; font-size: 0.65rem; overflow: hidden; color: #fff; opacity: 0.85; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1); border-left: 2px solid rgba(255,255,255,0.4);">
            <div style="font-weight: bold; line-height: 1.1;">${ev.timeStr}</div>
            <div style="line-height: 1.1; margin-top:2px; white-space: normal;">${ev.title}</div>
        </div>`;
        target.innerHTML += html;
    });

    // Add the red line indicator
    target.innerHTML += `<div class="current-time-line" id="sidebar-red-line" style="display:none; left: -10px;"></div>`;
}

function renderWeekGrid(events) {
    for(let i=0; i<7; i++) {
        const col = document.getElementById(`col-${i}`).querySelector('.events-container');
        if(col) col.innerHTML = '';
        
        // Dodaj current-time-line dla dzisiejszej kolumny
        const dStr = generateDatesForWeek(currentWeekOffset)[i];
        if(dStr === getTodayStr() && col) {
            col.innerHTML += `<div class="current-time-line" id="current-time-line" style="display:none;"></div>`;
        }
    }

    events.forEach(ev => {
        const col = document.getElementById(`col-${ev.dayIndex}`).querySelector('.events-container');
        if(!col) return;

        const times = ev.timeStr.split(" - ");
        if(times.length !== 2) return;
        const sParts = times[0].split(":");
        const eParts = times[1].split(":");
        const realStartMins = parseInt(sParts[0]) * 60 + parseInt(sParts[1]);
        const realEndMins = parseInt(eParts[0]) * 60 + parseInt(eParts[1]);
        const durationMins = realEndMins - realStartMins;

        let topPercent = ((realStartMins - (START_HOUR * 60)) / TOTAL_MINS) * 100;
        let heightPercent = (durationMins / TOTAL_MINS) * 100;

        if (topPercent < 0) {
            heightPercent += topPercent;
            topPercent = 0;
        }
        if (topPercent + heightPercent > 100) {
            heightPercent = 100 - topPercent;
        }

        if(topPercent >= 100 || topPercent + heightPercent <= 0) return;

        col.innerHTML += `<div class="cal-event" style="top: ${topPercent}%; height: ${heightPercent}%; background-color: ${ev.colorHex};">
            <div class="event-title">${ev.title}</div>
            <div class="mono" style="font-size: 0.60rem;">${ev.timeStr}</div>
        </div>`;
    });
    
    // Force red-line re-render after overriding grid
    if(window._updateTimeTrack) window._updateTimeTrack();
}


// --- CHARTS & MODALS V7 ---
function initCharts() {
    const areas = window.appData.knowledgeAreas;
    
    // RADAR WIEDZY
    const ctxBar = document.getElementById('skillsBarChart').getContext('2d');
    let labels = [];
    let data = [];
    let bgColors = [];
    let modalDataMap = []; // Przetrzymujemy obiekty (wiedza) aby podpiac pod OnClick

    for (const key in areas) {
        const categoryColor = CATEGORY_COLORS[areas[key].title] || "#8B949E";
        areas[key].items.forEach(item => {
            labels.push(item.title);
            data.push(item.level);
            bgColors.push(categoryColor);
            
            // Mapowanie wiedzy dla Modala (Drill-down)
            modalDataMap.push({
                categoryTitle: item.title,
                baseColor: categoryColor,
                currentLevel: item.level,
                parentTopic: areas[key].title
            });
        });
    }

    const legendContainer = document.getElementById('skills-legend');
    if(legendContainer) {
        legendContainer.innerHTML = '';
        labels.forEach((lbl, idx) => {
            legendContainer.innerHTML += `<span style="display:flex; align-items:center; gap:4px;"><span style="width:8px; height:8px; border-radius:50%; background:${bgColors[idx]};"></span> ${lbl}</span>`;
        });
    }

    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Poziom wiedzy / Umiejętności (%)',
                data: data,
                backgroundColor: bgColors,
                borderRadius: 2
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { max: 100, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#8B949E', font: { family: 'JetBrains Mono' } } },
                y: { grid: { display: false }, ticks: { color: '#C9D1D9', font: { family: 'Inter', size: 11 } } }
            },
            plugins: { legend: { display: false } },
            // INTERAKCJA ON-CLICK
            onClick: (e, activeElements) => {
                if (activeElements.length > 0) {
                    const idx = activeElements[0].index;
                    const meta = modalDataMap[idx];
                    showKnowledgeModal(meta);
                }
            }
        }
    });

    // WYKRES ENERGII Z CHMURY (Wzdłużny)
    db.ref(USER_NODE + 'energy/').once('value').then(snap => {
        const energyData = snap.val();
        if(!energyData) return;
        
        let eLabels = [];
        let eData = [];
        
        // Sortujemy daty
        const sortedDates = Object.keys(energyData).sort();
        
        // Bierzemy maks ostanie 14 dni by wykres byl czysty
        const recentDates = sortedDates.slice(-14);
        
        recentDates.forEach(date => {
            eLabels.push(date.slice(5)); // wycina rok do widoku mm-dd
            eData.push(energyData[date]);
        });
        
        const ctxLine = document.getElementById('energyLineChart').getContext('2d');
        new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: eLabels,
                datasets: [{
                    label: 'Energia Aktywacji',
                    data: eData,
                    borderColor: '#2F81F7',
                    backgroundColor: 'rgba(47, 129, 247, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: '#2F81F7'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { display: false }, ticks: { color: '#8B949E', font: { family: 'JetBrains Mono', size: 10 } } },
                    y: { min: 0, max: 10, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#8B949E', stepSize: 2 } }
                },
                plugins: { legend: { display: false } }
            }
        });
    });
}

function showKnowledgeModal(meta) {
    const modal = document.getElementById('knowledge-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body-content');
    const currentNode = document.getElementById('modal-current-node');
    
    title.textContent = meta.categoryTitle;
    title.style.color = meta.baseColor;
    
    // Przekazanie aktywnej kategorii do systemu SRS (Modul Fiszki)
    window.ACTIVE_SRS_CATEGORY = meta.parentTopic;
    if(window.refreshSRS) window.refreshSRS();
    
    const treeArr = window.KnowledgeTree ? window.KnowledgeTree[meta.categoryTitle] : null;
    let currentTopicStr = "Oczekuje na wgranie etapów...";
    let totalNodes = 0;
    let index = 0;
    
    if (treeArr && treeArr.length > 0) {
        totalNodes = treeArr.length;
        index = Math.floor((meta.currentLevel / 100) * totalNodes);
        if(index >= totalNodes) index = totalNodes - 1;
        if(index < 0) index = 0;
        currentTopicStr = `Etap ${index+1}/${totalNodes}: ${treeArr[index]}`;
    }

    currentNode.textContent = currentTopicStr;
    currentNode.style.color = meta.baseColor;
    
    let html = `<p style="margin-bottom: 5px;">Rodzina dziedziny: <strong>${meta.parentTopic}</strong></p>`;
    html += `<p style="margin-bottom: 16px;">Osiągnięta biegłość bazowa: <strong style="color:${meta.baseColor}; font-size:1.1rem;">${meta.currentLevel}%</strong></p>`;
    
    html += `<h3 style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:8px;">Lista ustrukturyzowanych etapów edukacyjnych:</h3>`;
    html += `<ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:4px; max-height:200px; overflow-y:auto; border:1px solid var(--border-subtle); padding:10px; border-radius:var(--radius-sm); background:rgba(0,0,0,0.1);">`;
    if (treeArr && treeArr.length > 0) {
        treeArr.forEach((node, i) => {
            let isDone = i <= index;
            html += `<li style="font-size:0.8rem; color:${isDone ? 'var(--text-primary)' : 'var(--text-secondary)'}; opacity:${isDone?1:0.5};"><i data-lucide="${isDone?'check-circle-2':'circle'}" style="width:12px; height:12px; margin-right:6px; color:${isDone?'var(--accent-success)':'inherit'};"></i> ${i+1}. ${node}</li>`;
        });
    } else {
        html += `<li style="font-size:0.8rem; color:var(--text-secondary);">Brak danych w bazie dla tego przedmiotu</li>`;
    }
    html += `</ul>`;
    
    body.innerHTML = html;
    modal.style.display = 'flex';
    if(window.lucide) window.lucide.createIcons();
}

// --- NOTION STYLE READING LIST ---
function initReadingList() {
    const listRef = db.ref(USER_NODE + 'reading_list');
    const container = document.getElementById('reading-list-container');
    const addBtn = document.getElementById('add-reading-btn');

    if(!container) return; // Fail-safe

    listRef.on('value', (snapshot) => {
        container.innerHTML = '';
        const data = snapshot.val() || {};
        
        const keys = Object.keys(data);
        if(keys.length === 0) {
            container.innerHTML = '<div style="font-size: 0.85rem; color: var(--text-secondary); padding: 4px 8px;">Brak wpisów w bazie. Dodaj nową pozycję.</div>';
        }

        keys.forEach(key => {
            const item = data[key];
            const div = document.createElement('div');
            div.className = 'notion-item';
            if(item.checked) div.classList.add('checked');

            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.className = 'notion-checkbox';
            cb.checked = item.checked || false;
            cb.addEventListener('change', (e) => {
                listRef.child(key).update({ checked: e.target.checked });
            });

            const input = document.createElement('textarea');
            input.className = 'notion-input';
            input.rows = 1;
            input.value = item.text || '';
            input.placeholder = 'Wpisz tytuł książki...';
            
            // Auto resize
            const autoResize = () => {
                input.style.height = 'auto';
                input.style.height = input.scrollHeight + 'px';
            };
            input.addEventListener('input', autoResize);
            // Inicjalnie zrób timeout bo render musi się skończyć
            setTimeout(autoResize, 0);

            let saveTimeout;
            input.addEventListener('input', (e) => {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(() => {
                    listRef.child(key).update({ text: e.target.value });
                }, 500);
            });
            input.addEventListener('keydown', (e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // Zapobiegnij łamaniu linii
                    input.blur();
                    // Opcjonalnie: automatyczne dodawanie następnego pod wciśnięciu
                    if(e.target.value.trim() !== "") {
                        addBtn.click();
                    }
                }
            });

            div.appendChild(cb);
            div.appendChild(input);
            container.appendChild(div);
        });
    });

    if(addBtn) {
        addBtn.addEventListener('click', () => {
            listRef.push({
                text: '',
                checked: false,
                timestamp: Date.now()
            }).then(() => {
                // Skupienie na nowym elemencie po odświeżeniu DOM
                setTimeout(() => {
                    const inputs = container.querySelectorAll('.notion-input');
                    if(inputs.length > 0) inputs[inputs.length-1].focus();
                }, 50);
            });
        });
    }
}

// --- INTERACTIVE TASKS ENGINE V16.1 ---
function initInteractiveTasks() {
    const boxes = [
        { key: 'priority', id: 'suggested-priority', btnColor: 'var(--accent-primary)' },
        { key: 'admin', id: 'suggested-admin', btnColor: 'var(--text-secondary)' },
        { key: 'light', id: 'suggested-light', btnColor: 'var(--accent-info)' },
        { key: 'sensory', id: 'suggested-sensory', btnColor: 'var(--accent-success)' }
    ];

    db.ref(USER_NODE + 'inbox').on('value', snap => {
        db.ref(USER_NODE + 'inbox_active').on('value', snapActive => {
            const data = snap.val() || {};
            const activeData = snapActive.val() || {};

            boxes.forEach(b => {
                const el = document.getElementById(b.id);
                if(!el) return;
                
                let lines = [];
                if(data[b.key]) {
                    lines = data[b.key].split('\n').map(l => l.trim()).filter(l => l.length > 0);
                }
                
                let activeTask = activeData[b.key] || "";
                
                if(activeTask === "" && lines.length === 0) {
                    el.innerHTML = '<span style="color:var(--text-secondary); opacity:0.5;">Sektor czysty. Brak zadań.</span>';
                    return;
                }

                let html = `<div style="display:flex; flex-direction:column; height: 100%;">`;
                
                if (activeTask !== "") {
                    html += `
                    <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: var(--radius-md); border-left: 2px solid ${b.btnColor}; margin-bottom: 12px;">
                        <div style="font-size:0.95rem; font-weight:500; color:var(--text-primary); line-height:1.4; margin-bottom: 12px;">${activeTask}</div>
                        <div style="display:flex; gap:6px;">
                            <button class="btn btn-ghost" onclick="actionTask('${b.key}', 'reject', '${encodeURIComponent(activeTask)}')" style="flex:1; padding: 6px; font-size:0.8rem; color:var(--accent-warning); border:1px solid rgba(255,159,10,0.2);" title="Wyrzuć z powrotem do zrzutni"><i data-lucide="x" style="width:14px; margin-right:4px;"></i> Cofnij</button>
                            <button class="btn btn-secondary" onclick="actionTask('${b.key}', 'complete', '${encodeURIComponent(activeTask)}')" style="flex:1; padding: 6px; font-size:0.8rem; color:var(--accent-success); border:1px solid rgba(43,191,113,0.3);"><i data-lucide="check" style="width:14px; margin-right:4px;"></i> Ukończ</button>
                        </div>
                    </div>`;
                }

                if (lines.length > 0) {
                    html += `<div style="margin-top: ${activeTask !== '' ? 'auto' : '0'}; padding-top: 8px; border-top: ${activeTask !== '' ? '1px dashed var(--border-subtle)' : 'none'};">`;
                    html += `<div style="margin-bottom: 8px; font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase;">Zrzutnia Zadań:</div>`;
                    html += `<div style="display:flex; flex-direction:column; gap:4px;">`;
                    lines.forEach(line => {
                        let cleanLine = line.startsWith('-') ? line.substring(1).trim() : line;
                        html += `<a href="#" onclick="actionTask('${b.key}', 'activate', '${encodeURIComponent(line)}')" style="color:var(--text-secondary); text-decoration:none; padding:6px; background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:4px; font-size:0.85rem; display:block; transition:all 0.2s; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="Wrzut do góry!">- ${cleanLine} <i data-lucide="arrow-up-right" style="width:14px; float:right; opacity:0.5;"></i></a>`;
                    });
                    html += `</div></div>`;
                }

                html += `</div>`;
                el.innerHTML = html;
            });
            if(window.lucide) window.lucide.createIcons();
        });
    });
}

window.actionTask = function(key, action, encodedTask) {
    let taskStr = decodeURIComponent(encodedTask);
    
    if(action === 'activate') {
        db.ref(USER_NODE + 'inbox_active/' + key).set(taskStr).then(() => {
            db.ref(USER_NODE + 'inbox/' + key).once('value').then(s => {
                let text = s.val() || "";
                let lines = text.split('\n').filter(l => l.trim() !== taskStr && l.trim() !== "");
                db.ref(USER_NODE + 'inbox/' + key).set(lines.join('\n'));
            });
        });
    } else if (action === 'reject') {
        db.ref(USER_NODE + 'inbox_active/' + key).set(null).then(() => {
            db.ref(USER_NODE + 'inbox/' + key).once('value').then(s => {
                let text = s.val() || "";
                let lines = text.split('\n').filter(l => l.trim() !== "");
                lines.push(taskStr);
                db.ref(USER_NODE + 'inbox/' + key).set(lines.join('\n'));
            });
        });
    } else if (action === 'complete') {
        db.ref(USER_NODE + 'inbox_active/' + key).set(null);
        let cleanTask = taskStr.startsWith('-') ? taskStr.substring(1).trim() : taskStr;
        db.ref(USER_NODE + 'inbox_completed').push({
            task: cleanTask,
            category: key,
            timestamp: new Date().toISOString()
        });
    }
};
