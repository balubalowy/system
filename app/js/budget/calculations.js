// app/js/budget/calculations.js
// Funkcje agregacji i projekcji cyklicznych transakcji budżetowych

export function getFlatData(sourceObj, categoryDefs, type) {
    const all = [];
    categoryDefs.forEach(cat => {
        const items = sourceObj[cat.name] ? Object.entries(sourceObj[cat.name]) : [];
        items.forEach(([key, item]) => {
            all.push({ ...item, key, category: cat.name, color: cat.color, icon: cat.icon, type });
        });
    });
    return all;
}

function advanceRecurringDate(dt, recurring) {
    if (recurring === 'weekly') dt.setDate(dt.getDate() + 7);
    else if (recurring === 'monthly') dt.setMonth(dt.getMonth() + 1);
    else if (recurring === 'quarterly') dt.setMonth(dt.getMonth() + 3);
    else if (recurring === 'yearly') dt.setFullYear(dt.getFullYear() + 1);
}

export function expandOccurrences(items, horizonMonths) {
    const expanded = [];
    const now = new Date();
    const horizonEndDate = new Date(now.getFullYear(), now.getMonth() + horizonMonths, now.getDate(), 23, 59, 59, 999);

    items.forEach(item => {
        const currentDt = new Date(item.date || new Date());
        const isRealized = item.realized !== false;
        
        if (isRealized || currentDt <= horizonEndDate) {
            expanded.push({ ...item, date: currentDt.toISOString().split('T')[0] });
        }
        
        if (!item.recurring) return;
        
        let count = 1;
        const maxCount = item.recurCount ? parseInt(item.recurCount, 10) : null;
        const endDt = item.recurEnd ? new Date(item.recurEnd) : null;

        while (true) {
            if (maxCount && count >= maxCount) break;
            advanceRecurringDate(currentDt, item.recurring);
            
            if (endDt && currentDt > endDt) break;
            if (currentDt > horizonEndDate) break;
            if (count >= 1200) break;
            
            expanded.push({ 
                ...item, 
                date: currentDt.toISOString().split('T')[0],
                realized: false
            });
            count++;
        }
    });
    return expanded;
}
