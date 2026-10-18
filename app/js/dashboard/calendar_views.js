// app/js/dashboard/calendar_views.js
// Renderowanie siatki tygodniowej, miesiecznej oraz osi czasu dla modulu kalendarza
import { getTodayStr, escapeHTML } from '../core/utils.js';

export const START_HOUR = 7;
export const END_HOUR = 22;
export const TOTAL_MINS = (END_HOUR - START_HOUR) * 60;

export function calcEventPosition(timeStr) {
    const times = timeStr.split(' - ');
    if (times.length !== 2) return null;
    const sParts = times[0].split(':');
    const eParts = times[1].split(':');
    const realStartMins = parseInt(sParts[0], 10) * 60 + parseInt(sParts[1], 10);
    const realEndMins = parseInt(eParts[0], 10) * 60 + parseInt(eParts[1], 10);
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
    return { topPercent, heightPercent };
}

export function drawTimeAxis() {
    const timeAxis = document.getElementById('time-axis');
    if (!timeAxis) return;
    timeAxis.innerHTML = '';
    for (let h = START_HOUR; h <= END_HOUR; h++) {
        const topPercent = ((h - START_HOUR) / (END_HOUR - START_HOUR)) * 100;
        timeAxis.innerHTML += `<div class="time-slot" style="top: ${topPercent}%;">${h.toString().padStart(2, '0')}:00</div>`;
    }
}

export function renderTodayList(events) {
    const target = document.getElementById('sidebar-timeline');
    if (!target) return;
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

    for (let h = START_HOUR; h <= END_HOUR; h++) {
        const topPercent = ((h - START_HOUR) / (END_HOUR - START_HOUR)) * 100;
        target.innerHTML += `<div style="position:absolute; left: 5px; top: ${topPercent}%; transform:translateY(-50%); font-size: 0.6rem; color: var(--text-secondary); opacity: 0.5; font-family: var(--font-mono);">${h.toString().padStart(2, '0')}:00</div>`;
    }

    if (todays.length === 0) {
        target.innerHTML = "<div style='padding:10px; font-size: 0.8rem; text-align:center;'>Brak spotkań na dziś. Czysty umysł.</div>";
        return;
    }

    todays.forEach(ev => {
        const pos = calcEventPosition(ev.timeStr);
        if (!pos) return;
        target.innerHTML += `<div class="cal-timeline-event" style="top: ${pos.topPercent}%; height: ${pos.heightPercent}%; background: ${ev.colorHex};">
            <div style="font-weight: bold; line-height: 1.1;">${escapeHTML(ev.timeStr)}</div>
            <div style="line-height: 1.1; margin-top:2px; white-space: normal;">${escapeHTML(ev.title)}</div>
        </div>`;
    });
    target.innerHTML += '<div class="current-time-line" id="sidebar-red-line" style="display:none; left: 35px; z-index: 20;"></div>';
}

export function renderMonthGrid(allEvents, currentWeekOffset, getStartOfWeekDate) {
    const startD = getStartOfWeekDate(currentWeekOffset);
    startD.setDate(1);
    const startDayIdx = startD.getDay() === 0 ? 6 : startD.getDay() - 1;
    const gridStart = new Date(startD);
    gridStart.setDate(startD.getDate() - startDayIdx);

    const container = document.getElementById('month-days-grid');
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < 35; i++) {
        const loopDate = new Date(gridStart);
        loopDate.setDate(gridStart.getDate() + i);
        const loopDateStr = new Date(loopDate.getTime() - (loopDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
        const dayEvents = allEvents.filter(e => e.dateStr === loopDateStr);
        const isToday = loopDateStr === getTodayStr();

        let eventHtml = '<div style="display:flex; flex-wrap:wrap; gap:2px;">';
        dayEvents.slice(0, 8).forEach(ev => {
            eventHtml += `<div title="${ev.timeStr} - ${ev.title}" style="width:10px; height:10px; background:${ev.colorHex}; border-radius:2px;"></div>`;
        });
        if (dayEvents.length > 8) eventHtml += `<div style="font-size:8px; color:var(--text-secondary);">+${dayEvents.length - 8}</div>`;
        eventHtml += '</div>';

        container.innerHTML += `
            <div style="padding: 4px; border: 1px solid var(--border-subtle); border-radius: 4px; min-height:60px; background: ${isToday ? 'rgba(47, 129, 247, 0.1)' : 'transparent'}; text-align: left;">
                <div style="font-size:0.75rem; text-align:right; margin-bottom: 4px; color:${isToday ? 'var(--accent-primary)' : 'var(--text-secondary)'}; font-weight:bold;">${loopDate.getDate()}</div>
                ${eventHtml}
            </div>
        `;
    }
}

export function renderWeekGrid(events, currentWeekOffset, generateDatesForWeek) {
    const dates = generateDatesForWeek(currentWeekOffset);
    for (let i = 0; i < 7; i++) {
        const colEl = document.getElementById(`col-${i}`);
        if (!colEl) continue;
        const col = colEl.querySelector('.events-container');
        if (col) {
            col.innerHTML = (dates[i] === getTodayStr()) ? '<div class="current-time-line" id="current-time-line" style="display:none;"></div>' : '';
        }
    }

    events.forEach(ev => {
        const colEl = document.getElementById(`col-${ev.dayIndex}`);
        const col = colEl?.querySelector('.events-container');
        if (!col) return;
        const pos = calcEventPosition(ev.timeStr);
        if (!pos || pos.topPercent >= 100 || pos.topPercent + pos.heightPercent <= 0) return;

        col.innerHTML += `<div class="cal-event" style="top: ${pos.topPercent}%; height: ${pos.heightPercent}%; background-color: ${ev.colorHex};">
            <div class="event-title">${escapeHTML(ev.title)}</div>
            <div class="mono" style="font-size: 0.60rem;">${escapeHTML(ev.timeStr)}</div>
        </div>`;
    });

    if (window._updateTimeTrack) window._updateTimeTrack();
}
