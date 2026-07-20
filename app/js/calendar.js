// js/calendar.js
import { db, USER_NODE } from './firebase.js';
import { getTodayStr } from './utils.js';

const START_HOUR = 7;
const END_HOUR = 22;
const TOTAL_MINS = (END_HOUR - START_HOUR) * 60;

let currentWeekOffset = 0;
let calendarEventsRaw = [];
let focusEventsRaw = [];
let currentCalendarMode = 'week';

export function initCalendar() {
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
          if(calPanelToday) calPanelToday.innerHTML = "Błąd pobierania kalendarza.";
          console.error(err);
      });
}

// Udostępniamy by timery mogły odświeżyć
window.refreshCalendar = initCalendar;

function bindCalendarControls() {
    const prevBtn = document.getElementById('cal-prev-btn');
    const nextBtn = document.getElementById('cal-next-btn');
    const monthBtn = document.getElementById('cal-month-btn');
    
    if(prevBtn) prevBtn.addEventListener('click', () => { currentWeekOffset--; renderCalendarViews(); });
    if(nextBtn) nextBtn.addEventListener('click', () => { currentWeekOffset++; renderCalendarViews(); });
    
    if(monthBtn) {
        monthBtn.addEventListener('click', () => {
            currentCalendarMode = currentCalendarMode === 'week' ? 'month' : 'week';
            monthBtn.innerHTML = currentCalendarMode === 'week' ? '<i data-lucide="calendar-days"></i> Widok Miesiąca' : '<i data-lucide="calendar-range"></i> Widok Tygodnia';
            if(window.lucide) window.lucide.createIcons();
            renderCalendarViews();
        });
    }
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
    
    const label = document.getElementById('cal-current-label');
    if(label) {
        if(currentWeekOffset === 0) label.textContent = "Obecny Tydzień";
        else if(currentWeekOffset < 0) label.textContent = `${Math.abs(currentWeekOffset)} tyg. temu`;
        else label.textContent = `Za ${currentWeekOffset} tyg.`;
    }
    
    const validDates = generateDatesForWeek(currentWeekOffset);
    const weeklyEvents = allEvents.filter(e => validDates.includes(e.dateStr));
    
    const weekView = document.getElementById('calendar-week-view');
    const monthView = document.getElementById('calendar-month-view');
    
    if(!weekView || !monthView) return;

    if(currentCalendarMode === 'week') {
        weekView.style.display = 'flex';
        monthView.style.display = 'none';
        
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
        weekView.style.display = 'none';
        monthView.style.display = 'block';
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
    if(!container) return;
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
    if(!timeAxis) return;
    timeAxis.innerHTML = '';
    for(let h=START_HOUR; h<=END_HOUR; h++) {
        let topPercent = ((h - START_HOUR) / (END_HOUR - START_HOUR)) * 100;
        timeAxis.innerHTML += `<div class="time-slot" style="top: ${topPercent}%;">${h.toString().padStart(2,'0')}:00</div>`;
    }
}

function renderTodayList(events, container) {
    const target = document.getElementById('sidebar-timeline');
    if(!target) return;
    
    const todayStr = getTodayStr();
    const todays = events.filter(e => e.dateStr === todayStr);
    
    target.style.height = '350px';
    target.style.background = 'var(--bg-secondary)';
    target.style.backgroundImage = 'linear-gradient(var(--border-subtle) 1px, transparent 1px)';
    target.style.backgroundSize = '100% calc(100% / 15)';
    target.style.border = '1px solid var(--border-subtle)';
    target.style.borderRadius = 'var(--radius-sm)';
    target.style.paddingLeft = '35px';
    target.style.marginRight = '8px';
    target.style.overflow = 'hidden';
    target.innerHTML = '';
    
    for(let h=START_HOUR; h<=END_HOUR; h++) {
        let topPercent = ((h - START_HOUR) / (END_HOUR - START_HOUR)) * 100;
        target.innerHTML += `<div style="position:absolute; left: 5px; top: ${topPercent}%; transform:translateY(-50%); font-size: 0.6rem; color: var(--text-secondary); opacity: 0.5; font-family: var(--font-mono);">${h.toString().padStart(2,'0')}:00</div>`;
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

        let html = `<div class="cal-timeline-event" style="top: ${topPercent}%; height: ${heightPercent}%; background: ${ev.colorHex};">
            <div style="font-weight: bold; line-height: 1.1;">${ev.timeStr}</div>
            <div style="line-height: 1.1; margin-top:2px; white-space: normal;">${ev.title}</div>
        </div>`;
        target.innerHTML += html;
    });

    target.innerHTML += `<div class="current-time-line" id="sidebar-red-line" style="display:none; left: 35px; z-index: 20;"></div>`;
}

function renderWeekGrid(events) {
    for(let i=0; i<7; i++) {
        const colEl = document.getElementById(`col-${i}`);
        if(!colEl) continue;
        const col = colEl.querySelector('.events-container');
        if(col) col.innerHTML = '';
        
        const dStr = generateDatesForWeek(currentWeekOffset)[i];
        if(dStr === getTodayStr() && col) {
            col.innerHTML += `<div class="current-time-line" id="current-time-line" style="display:none;"></div>`;
        }
    }

    events.forEach(ev => {
        const colEl = document.getElementById(`col-${ev.dayIndex}`);
        if(!colEl) return;
        const col = colEl.querySelector('.events-container');
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
    
    if(window._updateTimeTrack) window._updateTimeTrack();
}
