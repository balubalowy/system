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

export function advanceRecurringDate(dt, recurring) {
    if (recurring === 'weekly') dt.setUTCDate(dt.getUTCDate() + 7);
    else if (recurring === 'monthly') dt.setUTCMonth(dt.getUTCMonth() + 1);
    else if (recurring === 'quarterly') dt.setUTCMonth(dt.getUTCMonth() + 3);
    else if (recurring === 'yearly') dt.setUTCFullYear(dt.getUTCFullYear() + 1);
}

// Wylicza kolejny zaplanowany wpis dla pozycji cyklicznej po jej zrealizowaniu
export function getNextRecurringItem(item) {
    if (!item.recurring) return null;

    const maxCount = item.recurCount ? parseInt(item.recurCount, 10) : null;
    if (maxCount !== null && maxCount <= 1) return null;

    const baseDateStr = item.date || new Date().toISOString().split('T')[0];
    const dt = new Date(`${baseDateStr}T12:00:00Z`);
    advanceRecurringDate(dt, item.recurring);
    const nextDate = dt.toISOString().split('T')[0];

    if (item.recurEnd && nextDate > item.recurEnd) return null;

    const nextItem = {
        name: item.name,
        amount: parseFloat(item.amount) || 0,
        date: nextDate,
        realized: false,
        recurring: item.recurring,
        note: item.note || '',
        createdAt: Date.now()
    };
    if (maxCount !== null) nextItem.recurCount = maxCount - 1;
    if (item.recurEnd) nextItem.recurEnd = item.recurEnd;
    return nextItem;
}

export function buildRolloverUpdates(item) {
    return {
        nextItem: getNextRecurringItem(item),
        updates: {
            realized: true,
            recurringOrigin: item.recurring,
            recurring: null,
            recurCountOrigin: item.recurCount || null,
            recurCount: null,
            recurEndOrigin: item.recurEnd || null,
            recurEnd: null
        }
    };
}

export function buildRevertUpdates(item) {
    const updates = { realized: false };
    if (item.recurringOrigin && !item.recurring) {
        Object.assign(updates, {
            recurring: item.recurringOrigin,
            recurringOrigin: null,
            recurCount: item.recurCountOrigin || null,
            recurCountOrigin: null,
            recurEnd: item.recurEndOrigin || null,
            recurEndOrigin: null,
            spawnedKey: null
        });
    }
    return updates;
}

export function expandOccurrences(items, horizonMonths) {
    const expanded = [];
    const now = new Date();
    const horizonEndDate = new Date(Date.UTC(now.getFullYear(), now.getMonth() + horizonMonths, now.getDate(), 23, 59, 59, 999));

    items.forEach(item => {
        const baseDateStr = item.date || new Date().toISOString().split('T')[0];
        const currentDt = new Date(`${baseDateStr}T12:00:00Z`);
        const isRealized = item.realized !== false;
        
        if (isRealized || currentDt <= horizonEndDate) {
            expanded.push({ ...item, date: currentDt.toISOString().split('T')[0] });
        }
        
        if (!item.recurring) return;
        
        let count = 1;
        const maxCount = item.recurCount ? parseInt(item.recurCount, 10) : null;
        const endDt = item.recurEnd ? new Date(`${item.recurEnd}T23:59:59Z`) : null;

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
