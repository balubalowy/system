// js/main.js
import { initTimersAndFocus } from './timers.js';
import { initInteractiveTasks } from './tasks.js';
import { initSRS } from './srs.js';
import { initCharts } from './charts.js';
import { initDailyTasks } from './dashboard.js';
import { initIdeasEngine } from './ideas.js';

document.addEventListener('DOMContentLoaded', () => {
    initDailyTasks();
    initTimersAndFocus();
    initSRS();
    initIdeasEngine();
    initInteractiveTasks();
    
    setTimeout(() => { initCharts(); }, 500);
});
