import { db, USER_NODE } from '../core/firebase.js';
import { escapeHTML } from '../core/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    const themeBtn = document.getElementById('theme-toggle-btn');
            if(themeBtn) {
                themeBtn.addEventListener('click', () => {
                    let theme = document.documentElement.getAttribute('data-theme');
                    let next = theme === 'dark' ? 'light' : 'dark';
                    document.documentElement.setAttribute('data-theme', next);
                    localStorage.setItem('theme', next);
                });
            }
            if(window.lucide) window.lucide.createIcons();

            let localProgress = {};
            let globalTree = {};
            db.ref(USER_NODE + 'knowledge_tree').on('value', snapTree => {
                globalTree = snapTree.val() || {};
                
                db.ref(USER_NODE + 'knowledge').once('value').then(snap => {
                    localProgress = snap.val() || {};
                    
                    // Migracja starej liniowej bazy na nową nieliniową
                    Object.keys(localProgress).forEach(category => {
                        const progress = localProgress[category];
                        const treeArr = globalTree[category] ? globalTree[category] : null;
                        if(progress && treeArr && progress.level > 0 && (!progress.completed || Object.keys(progress.completed).length === 0)) {
                            const total = treeArr.length;
                            const maxIdx = Math.floor((progress.level / 100) * total) - 1;
                            progress.completed = {};
                            for(let i = 0; i <= maxIdx; i++) {
                                progress.completed[i] = true;
                            }
                        }
                    });
                    
                    renderSidebar();
                }).catch(e => {
                    renderSidebar();
                });
            });

            function getTopicDetails(category, title, item) {
                if (typeof item === 'object') {
                    return {
                        yt: item.yt || null,
                        challenge: item.challenge || null,
                        description: null,
                        subtopics: null
                    };
                }
                
                const description = `Wprowadzenie i ustrukturyzowana wiedza do zagadnienia **${title}** w ramach ścieżki **${category}**. Temat ten obejmuje kluczowe zagadnienia teoretyczne oraz zastosowania w analizach i projektach.`;
                
                let subtopics = [
                    "Koncepcja i definicje podstawowe",
                    "Praktyczna implementacja w zadaniach analitycznych",
                    "Najczęstsze błędy interpretacyjne i dobre praktyki"
                ];
                
                const lowerCat = category.toLowerCase();
                
                if (lowerCat.includes('python') || lowerCat.includes('sql') || lowerCat.includes('vba')) {
                    subtopics = [
                        "Składnia i struktura poleceń (Syntaktyka)",
                        "Debugowanie kodu i optymalizacja wydajności",
                        "Przykładowe scenariusze wdrożenia w projektach"
                    ];
                } else if (lowerCat.includes('matematyk') || lowerCat.includes('statystyk') || lowerCat.includes('algebra') || lowerCat.includes('prawdopodob')) {
                    subtopics = [
                        "Wzory matematyczne i dowód twierdzenia",
                        "Obliczanie i interpretacja wyników próbki",
                        "Zastosowanie w modelowaniu statystycznym"
                    ];
                } else if (lowerCat.includes('finans') || lowerCat.includes('wycena') || lowerCat.includes('rachunkowo') || lowerCat.includes('ekonom')) {
                    subtopics = [
                        "Podstawa prawna i standardy sprawozdawczości",
                        "Wskaźniki finansowe i ich znaczenie w biznesie",
                        "Symulacja i prognozowanie przyszłych przepływów"
                    ];
                }
                
                return {
                    yt: null,
                    challenge: null,
                    description: description,
                    subtopics: subtopics
                };
            }

            function getCatColor(cat) {
                let t = cat.toLowerCase();
                if(t.includes('matematyk') || t.includes('statystyk') || t.includes('algebra') || t.includes('excel') || t.includes('power')) return '#2BBF71';
                if(t.includes('ekonomia') || t.includes('finans') || t.includes('wycena') || t.includes('rachunkowo')) return '#0A84FF';
                if(t.includes('python') || t.includes('programowanie') || t.includes('bazy danych') || t.includes('sql')) return '#5E5CE6';
                if(t.includes('rozwój') || t.includes('zarządzanie') || t.includes('biznes') || t.includes('mba') || t.includes('pmp')) return '#FF9F0A';
                if(t.includes('adhd') || t.includes('kognitywistyka') || t.includes('dopamin')) return '#FF375F';
                if(t.includes('angielski') || t.includes('język')) return '#64D2FF';
                if(t.includes('prezentacja') || t.includes('wizualizacja')) return '#FF453A';
                return '#8B949E';
            }

            function renderSidebar() {
                const sidebar = document.getElementById('k-sidebar');
                let keys = Object.keys(globalTree);
                
                if(keys.length === 0) {
                    sidebar.innerHTML = '<div style="color:var(--text-secondary); text-align:center;">Oczekuje na zapis bazy przez Agenta w tle... (Odśwież)</div>';
                    return;
                }

                sidebar.innerHTML = '';
                
                keys.forEach((cat, idx) => {
                    const btn = document.createElement('button');
                    btn.className = 'category-btn';
                    let color = getCatColor(cat);

                    let level = 0;
                    if(localProgress[cat] && localProgress[cat].level !== undefined) {
                        level = localProgress[cat].level;
                    }

                    const circleSize = 6 + (level / 100) * 12;
                    const opacity = level === 0 ? 0.3 : 1;

                    btn.innerHTML = `
                        <span>${cat} <span style="font-family: var(--font-mono); font-size:0.75rem; color:var(--text-secondary); margin-left:8px;">(${level}%)</span></span>
                        <div style="width: ${circleSize}px; height: ${circleSize}px; background-color: ${color}; border-radius: 50%; opacity: ${opacity}; transition: all 0.3s; margin-left:auto;"></div>
                    `;
                    btn.onclick = () => {
                        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        renderMainArea(cat, color, level);
                    };
                    sidebar.appendChild(btn);

                    if(idx === 0) {
                        btn.click();
                    }
                });
                
                // Przycisk dodawania nowej kategorii lub węzła
                let addBtnDiv = document.createElement('div');
                addBtnDiv.style.padding = '12px';
                addBtnDiv.style.marginTop = '20px';
                addBtnDiv.style.borderTop = '1px dashed var(--border-subtle)';
                addBtnDiv.innerHTML = `<button id="btn-add-node" class="btn btn-primary" style="width:100%; justify-content:center;"><i data-lucide="plus"></i> Rozbuduj Drzewo Wiedzy</button>`;
                sidebar.appendChild(addBtnDiv);

                if(window.lucide) window.lucide.createIcons();
                
                setTimeout(() => {
                    document.getElementById('btn-add-node').addEventListener('click', openAddNodeModal);
                }, 100);
            }

            function renderMainArea(category, color, currentLevel) {
                const main = document.getElementById('k-main');
                const items = globalTree[category] || [];
                const totalItems = items.length;
                const completedMap = (localProgress[category] && localProgress[category].completed) || {};

                let html = `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border-subtle);">
                        <h2 style="font-size: 1.5rem; color: var(--text-primary); font-weight: 600; display:flex; align-items:center; gap: 12px;">
                            <div style="width: 12px; height: 24px; background-color: ${color}; border-radius: 4px;"></div>
                            ${category}
                        </h2>
                        <span style="font-size: 1rem; font-family: var(--font-mono); color: ${color}; background: rgba(0,0,0,0.2); padding: 4px 10px; border-radius: 4px;">Postęp: ${currentLevel}%</span>
                    </div>
                    <div class="tree-scroll" style="display:flex; flex-direction:column; gap: 4px;">
                `;

                items.forEach((item, idx) => {
                    const isDone = completedMap[idx] === true;
                    const icon = isDone ? 'check-circle-2' : 'circle';
                    const itemColor = isDone ? color : 'var(--text-secondary)';
                    const opacity = isDone ? '1' : '0.5';
                    const title = typeof item === 'object' ? item.title : item;
                    const details = getTopicDetails(category, title, item);
                    
                    html += `
                        <div class="knowledge-item interactive" onclick="window.toggleItemDetails(${idx})" style="opacity: ${opacity}; font-size: 0.95rem; padding: 12px 12px; display:flex; flex-direction:column; gap:4px; background: ${isDone ? 'rgba(255,255,255,0.03)' : 'transparent'}; border-radius: 6px; cursor: pointer; transition: all 0.2s; border: 1px solid ${isDone ? 'rgba(255,255,255,0.05)' : 'transparent'}; margin-bottom: 2px;">
                            <div style="display:flex; align-items:center; gap:16px; width: 100%;">
                                <span style="color: ${isDone ? 'var(--text-primary)' : 'var(--text-secondary)'}; flex-grow: 1;"><strong>${idx+1}.</strong> ${title}</span>
                                
                                <div style="display:flex; align-items:center; gap:12px; flex-shrink: 0;">
                                    <i data-lucide="chevron-down" id="chevron-${idx}" style="width:16px; height:16px; color:var(--text-secondary); transition: transform 0.2s;"></i>
                                    <div onclick="event.stopPropagation(); window.updateKnowledgeProgress('${category}', ${idx}, ${totalItems})" style="display:flex; align-items:center; cursor:pointer; padding:4px;" title="${isDone ? 'Oznacz jako nieukończone' : 'Oznacz jako ukończone'}">
                                        <i data-lucide="${icon}" style="width: 18px; height: 18px; min-width:18px; color: ${itemColor};"></i>
                                    </div>
                                </div>
                            </div>
                            
                            <div id="details-${idx}" style="display:none; width:100%; margin-top:12px; padding:12px; background:rgba(0,0,0,0.3); border-radius:6px; border:1px solid var(--border-subtle); flex-direction:column; gap:12px;" onclick="event.stopPropagation();">
                                ${details.yt ? `
                                <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:6px; border: 1px solid var(--border-subtle);">
                                    <iframe src="${details.yt}" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                                ` : ''}
                                ${details.description ? `
                                <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0; line-height: 1.5; font-family:var(--font-sans);">${escapeHTML(details.description)}</p>
                                ` : ''}
                                ${details.challenge ? `
                                <div style="background: rgba(47, 129, 247, 0.05); border-left: 3px solid ${color}; padding: 12px; border-radius: 0 4px 4px 0;">
                                    <div style="font-weight: 600; font-size: 0.75rem; color: ${color}; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; display:flex; align-items:center; gap:6px;"><i data-lucide="trophy" style="width:12px; height:12px;"></i> Wyzwanie (Challenge)</div>
                                    <p style="font-size: 0.85rem; color: var(--text-primary); margin: 0; line-height: 1.4; font-family:var(--font-sans);">${escapeHTML(details.challenge)}</p>
                                </div>
                                ` : ''}
                                ${details.subtopics ? `
                                <div style="background: rgba(255, 255, 255, 0.02); border-left: 3px solid ${color}; padding: 12px; border-radius: 0 4px 4px 0;">
                                    <div style="font-weight: 600; font-size: 0.75rem; color: ${color}; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; display:flex; align-items:center; gap:6px;"><i data-lucide="list-checks" style="width:12px; height:12px;"></i> Podtematy do opanowania</div>
                                    <ul style="font-size: 0.85rem; color: var(--text-primary); margin: 0; padding-left: 20px; line-height: 1.6; font-family:var(--font-sans);">
                                        ${details.subtopics.map(sub => `<li>${escapeHTML(sub)}</li>`).join('')}
                                    </ul>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                    `;
                });

                html += `</div>`;
                main.innerHTML = html;
                if(window.lucide) window.lucide.createIcons();
            }

            window.toggleItemDetails = function(idx) {
                const details = document.getElementById(`details-${idx}`);
                const chevron = document.getElementById(`chevron-${idx}`);
                if(details) {
                    if(details.style.display === 'none' || details.style.display === '') {
                        details.style.display = 'flex';
                        if(chevron) chevron.style.transform = 'rotate(180deg)';
                    } else {
                        details.style.display = 'none';
                        if(chevron) chevron.style.transform = 'rotate(0deg)';
                    }
                }
            };

            window.updateKnowledgeProgress = function(category, clickedIdx, totalItems) {
                if(!db || !USER_NODE) return;
                
                if(!localProgress[category]) {
                    localProgress[category] = { level: 0, completed: {} };
                }
                if(!localProgress[category].completed) {
                    localProgress[category].completed = {};
                }
                
                const wasCompleted = localProgress[category].completed[clickedIdx] === true;
                if(wasCompleted) {
                    delete localProgress[category].completed[clickedIdx];
                } else {
                    localProgress[category].completed[clickedIdx] = true;
                }
                
                const completedCount = Object.keys(localProgress[category].completed).length;
                const newLevel = Math.round((completedCount / totalItems) * 100);
                localProgress[category].level = newLevel;
                localProgress[category].updatedAt = Date.now();

                document.getElementById('k-main').style.opacity = '0.7';

                db.ref(USER_NODE + 'knowledge/' + category).set({
                    level: newLevel,
                    completed: localProgress[category].completed,
                    updatedAt: Date.now()
                }).then(() => {
                    document.getElementById('k-main').style.opacity = '1';
                    
                    let color = getCatColor(category);
                    renderMainArea(category, color, newLevel);
                    
                    const sidebar = document.getElementById('k-sidebar');
                    const btns = sidebar.querySelectorAll('.category-btn');
                    btns.forEach(btn => {
                        if(btn.innerHTML.includes(category)) {
                            const levelSpan = btn.querySelector('span > span');
                            if(levelSpan) levelSpan.innerText = `(${newLevel}%)`;
                            const circle = btn.querySelector('div');
                            if(circle) {
                                const newSize = 6 + (newLevel / 100) * 12;
                                circle.style.width = newSize + 'px';
                                circle.style.height = newSize + 'px';
                                circle.style.opacity = newLevel === 0 ? '0.3' : '1';
                            }
                        }
                    });
                }).catch(e => {
                    console.error("Błąd zapisu Firebase:", e);
                    document.getElementById('k-main').style.opacity = '1';
                });
            };
            
            // --- UI Dodawania Węzłów do Drzewa ---
            function openAddNodeModal() {
                let m = document.getElementById('add-node-modal');
                if(!m) {
                    m = document.createElement('div');
                    m.id = 'add-node-modal';
                    m.className = 'modal-overlay';
                    m.style.display = 'flex';
                    m.style.zIndex = '3000';
                    m.innerHTML = `
                        <div class="modal-content" style="max-width: 500px;">
                            <div class="modal-header">
                                <h2>Rozbuduj Drzewo Wiedzy</h2>
                                <button class="btn btn-ghost" onclick="document.getElementById('add-node-modal').style.display='none'"><i data-lucide="x"></i></button>
                            </div>
                            <div class="modal-body" style="display:flex; flex-direction:column; gap:12px;">
                                <label style="font-size:0.8rem; color:var(--text-secondary);">Wybierz kategorię lub wpisz nową:</label>
                                <input type="text" id="an-category" list="an-categories" class="inbox-task-input" placeholder="Np. Excel, Python, Finanse...">
                                <datalist id="an-categories"></datalist>
                                
                                <label style="font-size:0.8rem; color:var(--text-secondary); margin-top:8px;">Tytuł nowego tematu / lekcji:</label>
                                <input type="text" id="an-title" class="inbox-task-input" placeholder="Tytuł zagadnienia">
                                
                                <label style="font-size:0.8rem; color:var(--text-secondary); margin-top:8px;">Link YouTube (opcjonalnie, format /embed/):</label>
                                <input type="text" id="an-yt" class="inbox-task-input" placeholder="https://www.youtube.com/embed/XXXXX">
                                
                                <label style="font-size:0.8rem; color:var(--text-secondary); margin-top:8px;">Wyzwanie praktyczne (opcjonalnie):</label>
                                <textarea id="an-challenge" class="inbox-task-input" rows="3" placeholder="Zadanie do wykonania po lekcji..."></textarea>
                                
                                <button id="an-save-btn" class="btn btn-primary" style="margin-top: 16px; justify-content:center;"><i data-lucide="save"></i> Zapisz do bazy</button>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(m);
                    if(window.lucide) window.lucide.createIcons();
                }
                
                const dl = document.getElementById('an-categories');
                dl.innerHTML = '';
                Object.keys(globalTree).forEach(k => {
                    const opt = document.createElement('option');
                    opt.value = k;
                    dl.appendChild(opt);
                });
                
                document.getElementById('an-category').value = '';
                document.getElementById('an-title').value = '';
                document.getElementById('an-yt').value = '';
                document.getElementById('an-challenge').value = '';
                
                m.style.display = 'flex';
                
                document.getElementById('an-save-btn').onclick = () => {
                    const cat = document.getElementById('an-category').value.trim();
                    const tit = document.getElementById('an-title').value.trim();
                    const yt = document.getElementById('an-yt').value.trim();
                    const chall = document.getElementById('an-challenge').value.trim();
                    
                    if(!cat || !tit) return alert("Kategoria i tytuł są wymagane!");
                    
                    let nodeData = tit;
                    if(yt || chall) {
                        nodeData = { title: tit };
                        if(yt) nodeData.yt = yt;
                        if(chall) nodeData.challenge = chall;
                    }
                    
                    let targetArr = globalTree[cat] ? [...globalTree[cat]] : [];
                    targetArr.push(nodeData);
                    
                    db.ref(USER_NODE + 'knowledge_tree/' + cat).set(targetArr).then(() => {
                        m.style.display = 'none';
                    });
                };
            }
        });