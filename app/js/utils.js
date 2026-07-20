// js/utils.js
export function getTodayStr() {
    return new Date().toISOString().split('T')[0];
}
