// app/js/budget/actions.js
// Obsługa akcji użytkownika na elementach budżetu (CRUD, zmiana statusu, edycja)
import { db, USER_NODE } from '../core/firebase.js';
import { dismissNotification } from '../notifications/notifications.js';

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
            delete data.createdAt;
            db.ref(`${USER_NODE}${window.editState.dbNode}/${window.editState.category}/${window.editState.key}`).update(data);
            window.editState = null;
            const btn = document.getElementById('btn-add-txn');
            if (btn) {
                btn.innerHTML = '<i data-lucide="plus" style="width:14px; height:14px; vertical-align:middle; margin-right:4px;"></i> Dodaj';
                btn.style.background = 'var(--accent-primary)';
            }
        } else {
            db.ref(`${USER_NODE}${dbNode}/${category}`).push().set(data);
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
        db.ref(`${USER_NODE}${dbNode}/${category}/${key}`).update({ realized: newRealized }).then(() => {
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
