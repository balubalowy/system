// app/js/dashboard/calendar.js
// Obsluga synchronizacji kalendarza Google, historii focusu i nawigacji tygodniowej
import { db, USER_NODE } from '../core/firebase.js';
import { getTodayStr } from '../core/utils.js';
import { drawTimeAxis, renderTodayList, renderMonthGrid, renderWeekGrid } from './calendar_views.js';

let currentWeekOffset = 0;
let calendarEventsRaw = [];
let focusEventsRaw = [];
let currentCalendarMode = 'week';

function getStartOfWeekDate(offsetWeeks = 0) {
    const d = new Date();
    const day = d.getDay() === 0 ? 6 : d.getDay() - 1;
    d.setDate(d.getDate() - day + (offsetWeeks * 7));
    return d;
}

function generateDatesForWeek(offsetWeeks) {
    const start = getStartOfWeekDate(offsetWeeks);
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const nD = new Date(start);
        nD.setDate(start.getDate() + i);
        const offsetDateStr = new Date(nD.getTime() - (nD.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
        dates.push(offsetDateStr);
    }
    return dates;
}

function renderCalendarViews() {
    const allEvents = [...calendarEventsRaw, ...focusEventsRaw];
    renderTodayList(allEvents);

    const label = document.getElementById('cal-current-label');
    if (label) {
        if (currentWeekOffset === 0) label.textContent = 'Obecny Tydzień';
        else if (currentWeekOffset < 0) label.textContent = `${Math.abs(currentWeekOffset)} tyg. temu`;
        else label.textContent = `Za ${currentWeekOffset} tyg.`;
    }

    const validDates = generateDatesForWeek(currentWeekOffset);
    const weeklyEvents = allEvents.filter(e => validDates.includes(e.dateStr));
    const weekView = document.getElementById('calendar-week-view');
    const monthView = document.getElementById('calendar-month-view');
    if (!weekView || !monthView) return;

    if (currentCalendarMode === 'week') {
        weekView.style.display = 'flex';
        monthView.style.display = 'none';
        validDates.forEach((dStr, idx) => {
            const headerEl = document.getElementById(`header-${idx}`);
            if (!headerEl) return;
            const parts = dStr.split('-');
            const dayNames = ['PON', 'WT', 'ŚR', 'CZW', 'PT', 'SOB', 'NDZ'];
            headerEl.textContent = `${dayNames[idx]} ${parts[2]}.${parts[1]}`;
            headerEl.style.color = (dStr === getTodayStr()) ? 'var(--accent-primary)' : 'var(--text-secondary)';
        });
        renderWeekGrid(weeklyEvents, currentWeekOffset, generateDatesForWeek);
    } else {
        weekView.style.display = 'none';
        monthView.style.display = 'block';
        renderMonthGrid(allEvents, currentWeekOffset, getStartOfWeekDate);
    }
}

function bindCalendarControls() {
    const prevBtn = document.getElementById('cal-prev-btn');
    const nextBtn = document.getElementById('cal-next-btn');
    const monthBtn = document.getElementById('cal-month-btn');

    prevBtn?.addEventListener('click', () => { currentWeekOffset--; renderCalendarViews(); });
    nextBtn?.addEventListener('click', () => { currentWeekOffset++; renderCalendarViews(); });

    monthBtn?.addEventListener('click', () => {
        currentCalendarMode = currentCalendarMode === 'week' ? 'month' : 'week';
        monthBtn.innerHTML = currentCalendarMode === 'week' ? '<i data-lucide="calendar-days"></i> Widok Miesiąca' : '<i data-lucide="calendar-range"></i> Widok Tygodnia';
        if (window.lucide) window.lucide.createIcons();
        renderCalendarViews();
    });
}

function parseFocusHistory(fData) {
    const events = [];
    if (!fData) return events;
    for (const dateStr in fData) {
        for (const key in fData[dateStr]) {
            const item = fData[dateStr][key];
            const dObj = new Date(dateStr);
            const dIdx = dObj.getDay() === 0 ? 6 : dObj.getDay() - 1;
            events.push({ ...item, dateStr, dayIndex: dIdx });
        }
    }
    return events;
}

function mapCalendarEventColor(e) {
    const t = e.title.toLowerCase();
    if (t.includes('kognitywn')) e.colorHex = '#2BBF71';
    else if (t.includes('administracj')) e.colorHex = '#0A84FF';
    else if (t.includes('zadanie lekkie') || t.includes('lekk')) e.colorHex = '#FF9F0A';
    else if (t.includes('spotkanie') || t.includes('wydarzenie') || t.includes('call')) e.colorHex = '#BF5AF2';
    return e;
}

export function initCalendar() {
    drawTimeAxis();
    bindCalendarControls();

    const calPanelToday = document.getElementById('sidebar-timeline');
    const proxyUrlV2 = 'https://script.google.com/macros/s/AKfycbx5x6wNjwrWdAysQoroCW-OhsvDWgUU8Z17MPEWfoeeb9iXLyeKZoAQ666-gpq838NmPA/exec';

    let gasSecret = localStorage.getItem('gas_secret');
    if (!gasSecret) {
        gasSecret = prompt('Zabezpieczenie prywatności:\nPodaj tajne hasło do API Kalendarza (zostanie zapisane w pamięci przeglądarki):');
        if (gasSecret) localStorage.setItem('gas_secret', gasSecret);
    }

    const fetchUrl = gasSecret ? `${proxyUrlV2}?secret=${encodeURIComponent(gasSecret)}` : proxyUrlV2;
    if (calPanelToday) {
        calPanelToday.innerHTML = "<div style='padding:10px; font-size:0.85rem; color:var(--text-secondary);'>Wczytywanie Hubu Czasu...</div>";
    }

    fetch(fetchUrl)
        .then(res => res.json())
        .then(data => {
            calendarEventsRaw = (data.events || []).map(mapCalendarEventColor);
            db.ref(USER_NODE + 'focus_history').once('value').then(snap => {
                focusEventsRaw = parseFocusHistory(snap.val());
                renderCalendarViews();
            });
        })
        .catch(err => {
            if (calPanelToday) calPanelToday.innerHTML = 'Błąd pobierania kalendarza.';
            console.error(err);
        });
}

window.refreshCalendar = initCalendar;
