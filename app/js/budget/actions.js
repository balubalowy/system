// app/js/budget/actions.js
// Obsługa akcji użytkownika na elementach budżetu (CRUD, zmiana statusu, edycja)
import { db, USER_NODE } from '../core/firebase.js';
import { dismissNotification } from '../notifications/notifications.js';
import { buildRolloverUpdates, buildRevertUpdates } from './calculations.js';

function readTransactionFormData() {
    const name = document.getElementById('txn-name').value.trim();
    const amount = document.getElementById('txn-amount').value;
    const date = document.getElementById('txn-date').value;
    const realized = document.getElementById('txn-realized').checked;
    const recurring = document.getElementById('txn-recurring').value;
    const recurCount = document.getElementById('txn-recur-count')?.value;
    const recurEnd = document.getElementById('txn-recur-end')?.value;
    const note = document.getElementById('txn-note').value.trim();

    if (!name || !amount) {
        document.getElementById('txn-name').style.borderColor = !name ? 'var(--accent-warning)' : '';
        document.getElementById('txn-amount').style.borderColor = !amount ? 'var(--accent-warning)' : '';
        return null;
    }

    const data = {
        name,
        amount: parseFloat(amount),
        date: date || new Date().toISOString().split('T')[0],
        realized,
        note: note || '',
        createdAt: Date.now()
    };
    if (recurring) {
        data.recurring = recurring;
        if (recurCount) data.recurCount = parseInt(recurCount, 10);
        if (recurEnd) data.recurEnd = recurEnd;
    }
    return data;
}

function clearTransactionForm() {
    document.getElementById('txn-name').value = '';
    document.getElementById('txn-amount').value = '';
    document.getElementById('txn-note').value = '';
    document.getElementById('txn-recurring').value = '';
    const opts = document.getElementById('recurring-opts');
    if (opts) opts.style.display = 'none';
    if (document.getElementById('txn-recur-count')) document.getElementById('txn-recur-count').value = '';
    if (document.getElementById('txn-recur-end')) document.getElementById('txn-recur-end').value = '';
}

function populateEditForm(txn) {
    document.getElementById('txn-name').value = txn.name || '';
    document.getElementById('txn-amount').value = txn.amount || '';
    document.getElementById('txn-date').value = txn.date || '';
    document.getElementById('txn-realized').checked = txn.realized !== false;
    document.getElementById('txn-recurring').value = txn.recurring || '';

    const opts = document.getElementById('recurring-opts');
    if (opts) {
        opts.style.display = txn.recurring ? 'flex' : 'none';
        if (document.getElementById('txn-recur-count')) document.getElementById('txn-recur-count').value = txn.recurCount || '';
        if (document.getElementById('txn-recur-end')) document.getElementById('txn-recur-end').value = txn.recurEnd || '';
    }
    document.getElementById('txn-note').value = txn.note || '';

    const btn = document.getElementById('btn-add-txn');
    if (btn) {
        btn.innerHTML = '<i data-lucide="save" style="width:14px; height:14px; vertical-align:middle; margin-right:4px;"></i> Zapisz';
        btn.style.background = '#0A84FF';
    }
}

const rolledOverKeys = new Set();

// Zamyka zrealizowaną ratę w historii i tworzy nowy wpis Planowane na kolejny okres
function rolloverRecurringItem(dbNode, category, key, item) {
    const lockId = `${dbNode}/${category}/${key}`;
    if (rolledOverKeys.has(lockId)) return Promise.resolve();
    rolledOverKeys.add(lockId);

    const { nextItem, updates } = buildRolloverUpdates(item);
    if (nextItem) {
        const nextRef = db.ref(`${USER_NODE}${dbNode}/${category}`).push();
        updates.spawnedKey = nextRef.key;
        nextRef.set(nextItem);
    }
    return db.ref(`${USER_NODE}${dbNode}/${category}/${key}`).update(updates);
}

// Przywraca cykliczność i usuwa wygenerowany przyszły wpis przy cofnięciu statusu na Planowane
function revertRecurringRollover(dbNode, category, key, item, catData) {
    rolledOverKeys.delete(`${dbNode}/${category}/${key}`);
    if (item.spawnedKey && catData?.[item.spawnedKey]?.realized === false) {
        db.ref(`${USER_NODE}${dbNode}/${category}/${item.spawnedKey}`).remove();
    }
    return db.ref(`${USER_NODE}${dbNode}/${category}/${key}`).update(buildRevertUpdates(item));
}

export function syncRealizedRecurringItems(dbNode, dataObj) {
    Object.entries(dataObj || {}).forEach(([category, items]) => {
        Object.entries(items || {}).forEach(([key, item]) => {
            if (item && item.realized !== false && item.recurring) {
                rolloverRecurringItem(dbNode, category, key, item);
            }
        });
    });
}

export function initBudgetActions(getState) {
    window.editState = null;

    window.editItem = function(dbNode, category, key) {
        const { allExpenses, allIncomes } = getState();
        const sourceData = dbNode === 'expenses' ? allExpenses : allIncomes;
        if (!sourceData[category] || !sourceData[category][key]) return;

        populateEditForm(sourceData[category][key]);
        window.editState = { dbNode, category, key };
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (window.lucide) window.lucide.createIcons();
    };

    window.addTransaction = function(dbNode, category) {
        const data = readTransactionFormData();
        if (!data) return;

        if (window.editState) {
            const { dbNode: editNode, category: editCat, key: editKey } = window.editState;
            delete data.createdAt;
            db.ref(`${USER_NODE}${editNode}/${editCat}/${editKey}`).update(data).then(() => {
                if (data.realized && data.recurring) rolloverRecurringItem(editNode, editCat, editKey, data);
            });
            window.editState = null;
            const btn = document.getElementById('btn-add-txn');
            if (btn) {
                btn.innerHTML = '<i data-lucide="plus" style="width:14px; height:14px; vertical-align:middle; margin-right:4px;"></i> Dodaj';
                btn.style.background = 'var(--accent-primary)';
            }
        } else {
            const newRef = db.ref(`${USER_NODE}${dbNode}/${category}`).push();
            newRef.set(data).then(() => {
                if (data.realized && data.recurring) rolloverRecurringItem(dbNode, category, newRef.key, data);
            });
        }
        clearTransactionForm();
    };

    window.addInvestment = function(category) {
        const name = document.getElementById('inv-name').value.trim();
        const balance = document.getElementById('inv-balance').value;
        if (!name || !balance) {
            document.getElementById('inv-name').style.borderColor = !name ? 'var(--accent-warning)' : '';
            document.getElementById('inv-balance').style.borderColor = !balance ? 'var(--accent-warning)' : '';
            return;
        }
        db.ref(`${USER_NODE}investments/${category}`).push().set({
            name,
            balance: parseFloat(balance),
            updatedAt: Date.now()
        });
    };

    window.updateInvestment = function(category, key) {
        const val = document.getElementById(`update-bal-${key}`)?.value;
        if (!val) return;
        db.ref(`${USER_NODE}investments/${category}/${key}`).update({
            balance: parseFloat(val),
            updatedAt: Date.now()
        });
    };

    window.toggleStatus = function(dbNode, category, key, currentRealized) {
        const newRealized = !currentRealized;
        const { allExpenses, allIncomes } = getState();
        const sourceData = dbNode === 'expenses' ? allExpenses : allIncomes;
        const item = sourceData[category]?.[key];

        let op;
        if (newRealized && item?.recurring) {
            op = rolloverRecurringItem(dbNode, category, key, item);
        } else if (!newRealized && item) {
            op = revertRecurringRollover(dbNode, category, key, item, sourceData[category]);
        } else {
            op = db.ref(`${USER_NODE}${dbNode}/${category}/${key}`).update({ realized: newRealized });
        }

        op.then(() => {
            if (newRealized) dismissNotification(`expense-${key}`);
        });
    };

    window.deleteItem = function(dbNode, category, key) {
        db.ref(`${USER_NODE}${dbNode}/${category}/${key}`).remove();
    };

    document.addEventListener('change', (e) => {
        if (e.target.id === 'txn-date') {
            const today = new Date().toISOString().split('T')[0];
            const realizedCheckbox = document.getElementById('txn-realized');
            if (realizedCheckbox) {
                realizedCheckbox.checked = e.target.value <= today;
            }
        }
    });
}
