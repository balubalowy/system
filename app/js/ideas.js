// js/ideas.js
import { db, USER_NODE } from './firebase.js';
import { escapeHTML } from './utils.js';

export function initIdeasEngine() {
    const btn = document.getElementById('btn-save-idea');
    const dump = document.getElementById('ai-dump');
    const ideasList = document.getElementById('ideas-list');
    
    if(btn && dump) {
        btn.addEventListener('click', () => {
            const text = dump.value.trim();
            if(!text) return;
            
            btn.innerHTML = '<i data-lucide="loader"></i> Zapisywanie...';
            if(window.lucide) window.lucide.createIcons();
            
            db.ref(USER_NODE + 'ideas').push({
                text: text,
                timestamp: Date.now()
            }).then(() => {
                dump.value = '';
                btn.innerHTML = '<i data-lucide="check"></i> Zapisano';
                btn.style.color = 'var(--accent-success)';
                if(window.lucide) window.lucide.createIcons();
                setTimeout(() => {
                    btn.innerHTML = '<i data-lucide="save"></i> Zapisz pomysł';
                    btn.style.color = '';
                    if(window.lucide) window.lucide.createIcons();
                }, 2000);
            });
        });
    }

    if(ideasList) {
        db.ref(USER_NODE + 'ideas').on('value', snap => {
            const data = snap.val();
            ideasList.innerHTML = '';
            if(!data) {
                ideasList.innerHTML = '<div style="font-size:0.8rem; color:var(--text-secondary);">Brak pomysłów w zrzutni.</div>';
                return;
            }
            
            Object.keys(data).reverse().forEach(key => {
                const item = data[key];
                const div = document.createElement('div');
                div.style.cssText = 'padding:8px; background:var(--bg-secondary); border-radius:var(--radius-sm); border:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:flex-start; gap:8px; font-size:0.85rem; color:var(--text-primary);';
                
                const textSpan = document.createElement('span');
                textSpan.innerHTML = escapeHTML(item.text);
                textSpan.style.flex = "1";
                
                const delBtn = document.createElement('button');
                delBtn.className = 'btn btn-ghost';
                delBtn.style.padding = '4px';
                delBtn.style.color = 'var(--accent-danger)';
                delBtn.title = "Usuń";
                delBtn.innerHTML = '<i data-lucide="x" style="width:14px; height:14px;"></i>';
                delBtn.onclick = () => {
                    db.ref(USER_NODE + 'ideas/' + key).remove();
                };
                
                div.appendChild(textSpan);
                div.appendChild(delBtn);
                ideasList.appendChild(div);
            });
            if(window.lucide) window.lucide.createIcons();
        });
    }
}

export function initWishlistEngine() {
    const btn = document.getElementById('btn-save-wishlist');
    const inputName = document.getElementById('wishlist-input');
    const inputPrice = document.getElementById('wishlist-price');
    const listEl = document.getElementById('wishlist-list');

    if(btn && inputName) {
        btn.addEventListener('click', () => {
            const name = inputName.value.trim();
            const price = inputPrice ? inputPrice.value.trim() : '';
            if(!name) return;
            
            btn.innerHTML = '<i data-lucide="loader"></i> Zapisywanie...';
            if(window.lucide) window.lucide.createIcons();
            
            db.ref(USER_NODE + 'wishlist').push({
                name: name,
                price: price,
                date: new Date().toISOString()
            }).then(() => {
                inputName.value = '';
                if(inputPrice) inputPrice.value = '';
                btn.innerHTML = '<i data-lucide="check"></i> Zapisano';
                btn.style.color = 'var(--accent-success)';
                if(window.lucide) window.lucide.createIcons();
                setTimeout(() => {
                    btn.innerHTML = '<i data-lucide="plus"></i> Dodaj marzenie';
                    btn.style.color = '';
                    if(window.lucide) window.lucide.createIcons();
                }, 2000);
            });
        });
    }

    if(listEl) {
        db.ref(USER_NODE + 'wishlist').on('value', snap => {
            const data = snap.val();
            listEl.innerHTML = '';
            if(!data) {
                listEl.innerHTML = '<div style="font-size:0.8rem; color:var(--text-secondary);">Brak zaplanowanych wydatków.</div>';
                return;
            }
            
            Object.keys(data).reverse().forEach(key => {
                const item = data[key];
                const div = document.createElement('div');
                div.style.cssText = 'padding:8px; background:var(--bg-secondary); border-radius:var(--radius-sm); border:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:flex-start; gap:8px; font-size:0.85rem; color:var(--text-primary);';
                
                const textSpan = document.createElement('span');
                textSpan.innerHTML = `<strong>${escapeHTML(item.name)}</strong>` + (item.price ? ` <span style="color:var(--text-secondary); font-family:var(--font-mono);">(${escapeHTML(item.price)} PLN)</span>` : '');
                textSpan.style.flex = "1";
                
                const delBtn = document.createElement('button');
                delBtn.className = 'btn btn-ghost';
                delBtn.style.padding = '4px';
                delBtn.style.color = 'var(--accent-success)';
                delBtn.title = "Oznacz jako zrealizowane (usuń)";
                delBtn.innerHTML = '<i data-lucide="check" style="width:14px; height:14px;"></i>';
                delBtn.onclick = () => {
                    db.ref(USER_NODE + 'wishlist/' + key).remove();
                };
                
                div.appendChild(textSpan);
                div.appendChild(delBtn);
                listEl.appendChild(div);
            });
            if(window.lucide) window.lucide.createIcons();
        });
    }
}
