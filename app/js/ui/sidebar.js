window.renderSidebar = function renderSidebar() {
    const sidebarHTML = `
        <aside class="sidebar">
            <button class="btn btn-ghost" id="sidebar-toggle-btn" style="color: var(--text-secondary); position:absolute; top: 10px; right: 10px; z-index: 200; padding: 4px;" title="Schowaj/Wysuń Panel"><i data-lucide="panel-left-close"></i></button>

            <section class="naked-section sidebar-section" style="margin-bottom: var(--space-6); margin-top: 10px;">
                <div class="sidebar-header" style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-3); color: var(--text-secondary);">
                    <i data-lucide="calendar" style="width: 14px; flex-shrink: 0;"></i>
                    <h2 style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; white-space:nowrap;">Plan Dnia</h2>
                </div>
                <!-- Mini Timeline Container -->
                <div id="sidebar-timeline" style="position:relative; padding-left: 20px; font-size:0.85rem; color:var(--text-secondary); min-height: 100px;">
                    <!-- Rysowany przez JS -->
                </div>
            </section>

            <section class="naked-section sidebar-section" style="margin-bottom: var(--space-6);">
                <div class="sidebar-header" style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-3); color: var(--text-secondary);">
                    <i data-lucide="list-checks" style="width: 14px; flex-shrink: 0;"></i>
                    <h2 style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; white-space:nowrap;">Rutyny</h2>
                </div>
                <div class="segmented-control" style="display:flex; background:var(--bg-tertiary); padding:4px; border-radius:var(--radius-sm); margin-bottom:var(--space-3);">
                    <button class="btn" id="tab-btn-morning" style="flex:1; border:none; background:var(--bg-secondary); color:var(--text-primary); border-radius:4px; box-shadow:var(--elevation-1); font-size:0.8rem; padding:6px;" onclick="document.getElementById('morning-routine').style.display='block'; document.getElementById('evening-routine').style.display='none'; this.style.background='var(--bg-secondary)'; this.style.color='var(--text-primary)'; this.style.boxShadow='var(--elevation-1)'; document.getElementById('tab-btn-evening').style.background='transparent'; document.getElementById('tab-btn-evening').style.color='var(--text-secondary)'; document.getElementById('tab-btn-evening').style.boxShadow='none';"><i data-lucide="sun" style="width:14px; height:14px;"></i> Poranna</button>
                    <button class="btn" id="tab-btn-evening" style="flex:1; border:none; background:transparent; color:var(--text-secondary); font-size:0.8rem; padding:6px;" onclick="document.getElementById('evening-routine').style.display='block'; document.getElementById('morning-routine').style.display='none'; this.style.background='var(--bg-secondary)'; this.style.color='var(--text-primary)'; this.style.boxShadow='var(--elevation-1)'; document.getElementById('tab-btn-morning').style.background='transparent'; document.getElementById('tab-btn-morning').style.color='var(--text-secondary)'; document.getElementById('tab-btn-morning').style.boxShadow='none';"><i data-lucide="moon" style="width:14px; height:14px;"></i> Wieczorna</button>
                </div>
                <div class="checklist" id="morning-routine" style="display:block;"></div>
                <div class="checklist" id="evening-routine" style="display:none;"></div>
            </section>

            <section class="naked-section sidebar-section" style="margin-bottom: var(--space-6);">
                <div class="sidebar-header" style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-3);">
                    <i data-lucide="cloud" style="width: 14px; height: 14px; color: var(--text-secondary); flex-shrink: 0;"></i>
                    <h3 style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; white-space:nowrap;">iCloud Notes</h3>
                </div>
                <div style="display:flex; flex-direction:column; gap:2px;">
                    <a href="https://www.icloud.com/notes/note/UHJpdmF0ZTo6Tm90ZXM6OmN1cnJlbnRVc2VyOjo3YTAyZmZhYi1lNDk2LTQ1MWQtYWU2ZC1mY2VlNjJlZWI1MmQ=" target="_blank" class="btn btn-ghost" style="justify-content: flex-start; padding: 4px 8px; font-size: 0.85rem;"><span style="display:inline-block; width:4px; height:4px; border-radius:50%; background:#666; margin-right:12px; margin-left:6px; flex-shrink:0;"></span> Sny</a>
                    <a href="https://www.icloud.com/notes/note/UHJpdmF0ZTo6Tm90ZXM6OmN1cnJlbnRVc2VyOjo5MUNDMTJGMi01MDQwLTRFNkMtOUFGMC0wQzA4NUZBNzM1RkM=" target="_blank" class="btn btn-ghost" style="justify-content: flex-start; padding: 4px 8px; font-size: 0.85rem;"><span style="display:inline-block; width:4px; height:4px; border-radius:50%; background:#666; margin-right:12px; margin-left:6px; flex-shrink:0;"></span> Zdrowie</a>
                    <a href="https://www.icloud.com/notes/note/UHJpdmF0ZTo6Tm90ZXM6OmN1cnJlbnRVc2VyOjo5Yjk3ZDI0ZC0zNTQxLTQ1MmEtODJmOS0yNDE3MzExMDhlMTY=" target="_blank" class="btn btn-ghost" style="justify-content: flex-start; padding: 4px 8px; font-size: 0.85rem;"><span style="display:inline-block; width:4px; height:4px; border-radius:50%; background:#666; margin-right:12px; margin-left:6px; flex-shrink:0;"></span> Rozwój Osobisty</a>
                    <a href="https://www.icloud.com/notes/note/UHJpdmF0ZTo6Tm90ZXM6OmN1cnJlbnRVc2VyOjphZjcwZjk1Zi1kYWVkLTQ4ODQtOTM4Yy0xNmE0ZGYzZDcxMzQ=" target="_blank" class="btn btn-ghost" style="justify-content: flex-start; padding: 4px 8px; font-size: 0.85rem;"><span style="display:inline-block; width:4px; height:4px; border-radius:50%; background:#666; margin-right:12px; margin-left:6px; flex-shrink:0;"></span> Ważne Linki</a>
                </div>
            </section>

            <section class="naked-section sidebar-section" style="margin-bottom: var(--space-6);">
                <div class="sidebar-header" style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-3);">
                    <i data-lucide="cloud" style="width: 14px; height: 14px; color: var(--text-secondary); flex-shrink: 0;"></i>
                    <h3 style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; white-space:nowrap;">OneDrive Workspace</h3>
                </div>
                <div style="display:flex; flex-direction:column; gap:2px;">
                    <a href="https://uewrc-my.sharepoint.com/:f:/g/personal/196659_student_ue_wroc_pl/IgCK2YL0jKFNRYAI0-pBkIFXAWH8zOPLfTpT0MQQnPdg2Gg?e=xKFcBC" target="_blank" class="btn btn-ghost" style="justify-content: flex-start; padding: 4px 8px; font-size: 0.85rem;"><span style="display:inline-block; width:4px; height:4px; border-radius:50%; background:#666; margin-right:12px; margin-left:6px; flex-shrink:0;"></span> Antigravity OS</a>
                    <a href="https://uewrc-my.sharepoint.com/:f:/g/personal/196659_student_ue_wroc_pl/IgDMD7FeGcaZS7LlcJ3h7XbjAQQmRcbvBnl4sQsc3EM6PyY?e=aojfCY" target="_blank" class="btn btn-ghost" style="justify-content: flex-start; padding: 4px 8px; font-size: 0.85rem;"><span style="display:inline-block; width:4px; height:4px; border-radius:50%; background:#666; margin-right:12px; margin-left:6px; flex-shrink:0;"></span> Skrypty Python</a>
                    <a href="https://uewrc-my.sharepoint.com/:f:/g/personal/196659_student_ue_wroc_pl/IgDWKVrPV0OERJX8UxQcWxfWAQU5QvKP3CUqnC6-O7Q86xQ?e=4ciAWN" target="_blank" class="btn btn-ghost" style="justify-content: flex-start; padding: 4px 8px; font-size: 0.85rem;"><span style="display:inline-block; width:4px; height:4px; border-radius:50%; background:#666; margin-right:12px; margin-left:6px; flex-shrink:0;"></span> Dokumenty</a>
                    <a href="https://uewrc-my.sharepoint.com/:f:/g/personal/196659_student_ue_wroc_pl/IgDSpbEHMaIVTaw9DZjJ_jIjAdtLRq2lh6OROUvd40tpl0w?e=XE4cS2" target="_blank" class="btn btn-ghost" style="justify-content: flex-start; padding: 4px 8px; font-size: 0.85rem;"><span style="display:inline-block; width:4px; height:4px; border-radius:50%; background:#666; margin-right:12px; margin-left:6px; flex-shrink:0;"></span> Modele Excel</a>
                    <a href="https://uewrc-my.sharepoint.com/:f:/g/personal/196659_student_ue_wroc_pl/IgBGJhuX5Is9Q5GWjNME6biKAScXxnqsiZLLd9Zhb3KcnUo?e=ypyUoM" target="_blank" class="btn btn-ghost" style="justify-content: flex-start; padding: 4px 8px; font-size: 0.85rem;"><span style="display:inline-block; width:4px; height:4px; border-radius:50%; background:#666; margin-right:12px; margin-left:6px; flex-shrink:0;"></span> Media</a>
                    <a href="https://uewrc-my.sharepoint.com/:f:/g/personal/196659_student_ue_wroc_pl/IgBGJhuX5Is9Q5GWjNME6biKAScXxnqsiZLLd9Zhb3KcnUo?e=ypyUoM" target="_blank" class="btn btn-ghost" style="justify-content: flex-start; padding: 4px 8px; font-size: 0.85rem;"><span style="display:inline-block; width:4px; height:4px; border-radius:50%; background:#666; margin-right:12px; margin-left:6px; flex-shrink:0;"></span> Fotografie</a>
                    <a href="https://uewrc-my.sharepoint.com/:f:/g/personal/196659_student_ue_wroc_pl/IgAvouBmXk2uSbxOAe-18upfAUYhzBLPMqr79bLmE_8cYnk?e=G3iJu9" target="_blank" class="btn btn-ghost" style="justify-content: flex-start; padding: 4px 8px; font-size: 0.85rem;"><span style="display:inline-block; width:4px; height:4px; border-radius:50%; background:#666; margin-right:12px; margin-left:6px; flex-shrink:0;"></span> Inne (Zrzuty)</a>
                </div>
            </section>

            <section class="naked-section" style="margin-bottom: var(--space-6);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-3);">
                    <div style="display: flex; align-items: center; gap: var(--space-2);">
                        <i data-lucide="library" style="width: 14px; height: 14px; color: var(--text-secondary);"></i>
                        <h3 style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">Baza Czytelnicza</h3>
                    </div>
                </div>
                <div id="reading-list-container" style="display:flex; flex-direction:column; gap:var(--space-1);">
                    <div style="font-size: 0.85rem; color: var(--text-secondary); padding: 4px 8px;">Synchronizacja bazy...</div>
                </div>
                <button class="btn btn-ghost" id="add-reading-btn" style="width:100%; justify-content:flex-start; margin-top:8px; font-size: 0.8rem; color: var(--text-secondary);"><i data-lucide="plus" style="width:14px;"></i> Dodaj pozycję (Enter)</button>
            </section>

            <!-- Pamiętnik Burz -->
            <section class="naked-section" style="margin-top: 30px; border-top: 1px solid var(--border-subtle); padding-top: var(--space-4);">
                <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-3); color: var(--text-secondary);">
                    <i data-lucide="cloud-lightning" style="width: 14px; color:var(--accent-warning);"></i>
                    <h2 style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; white-space:nowrap;">Pamiętnik Burz</h2>
                </div>
                <div style="display:flex; flex-direction:column; gap:12px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span class="stat-text" style="font-size:0.8rem; color:var(--text-secondary); white-space:nowrap;">Liczba burz (łowy):</span>
                        <span class="stat-text" id="stat-shunts" style="font-size:0.9rem; font-weight:700; color:var(--text-primary); font-family:var(--font-mono); margin-left:auto;">0</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span class="stat-text" style="font-size:0.8rem; color:var(--text-secondary); white-space:nowrap;">Dni burzowe (łowy):</span>
                        <span class="stat-text" id="stat-sdays" style="font-size:0.9rem; font-weight:700; color:var(--text-primary); font-family:var(--font-mono); margin-left:auto;">0</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span class="stat-text" style="font-size:0.8rem; color:var(--text-secondary); white-space:nowrap;">Przeżyte burze (ogół):</span>
                        <span class="stat-text" id="stat-stotal" style="font-size:0.9rem; font-weight:700; color:var(--text-primary); font-family:var(--font-mono); margin-left:auto;">0</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span class="stat-text" style="font-size:0.8rem; color:var(--text-secondary); white-space:nowrap;">Przeżyte dni (ogół):</span>
                        <span class="stat-text" id="stat-sdtotal" style="font-size:0.9rem; font-weight:700; color:var(--text-primary); font-family:var(--font-mono); margin-left:auto;">0</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span class="stat-text" style="font-size:0.8rem; color:var(--text-secondary); white-space:nowrap;">Przejechane celowo:</span>
                        <span class="stat-text" id="stat-skm" style="font-size:0.9rem; font-weight:700; color:var(--accent-warning); font-family:var(--font-mono); margin-left:auto;">0 km</span>
                    </div>
                    
                    <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:4px;">
                        <span style="font-size:0.65rem; padding:2px 6px; border-radius:4px; background:rgba(255,255,255,0.1); color:var(--text-secondary);">Brak: <span id="s-brak" style="font-weight:700;">0</span></span>
                        <span style="font-size:0.65rem; padding:2px 6px; border-radius:4px; background:rgba(50,215,75,0.2); color:var(--accent-success);">Słaba: <span id="s-slaba" style="font-weight:700;">0</span></span>
                        <span style="font-size:0.65rem; padding:2px 6px; border-radius:4px; background:rgba(255,214,10,0.2); color:var(--accent-warning);">Umiar: <span id="s-umiar" style="font-weight:700;">0</span></span>
                        <span style="font-size:0.65rem; padding:2px 6px; border-radius:4px; background:rgba(255,105,97,0.2); color:var(--accent-danger);">Silna: <span id="s-silna" style="font-weight:700;">0</span></span>
                        <span style="font-size:0.65rem; padding:2px 6px; border-radius:4px; background:rgba(255,55,95,0.2); color:#ff375f;">B. Silna: <span id="s-bsilna" style="font-weight:700;">0</span></span>
                        <span style="font-size:0.65rem; padding:2px 6px; border-radius:4px; background:rgba(191,90,242,0.2); color:#bf5af2;">Ekstr: <span id="s-ekstr" style="font-weight:700;">0</span></span>
                    </div>
                </div>
            </section>

            <!-- Local Agent Stats w Sidebar -->
            <section class="naked-section" style="margin-top: 30px; border-top: 1px solid var(--border-subtle); padding-top: var(--space-4);">
                <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-3); color: var(--text-secondary);">
                    <i data-lucide="hard-drive" style="width: 14px;"></i>
                    <h2 style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; white-space:nowrap;">Pamięć Lokalna</h2>
                </div>
                <div style="display:flex; flex-direction:column; gap:12px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <i data-lucide="image" style="width:16px;"></i>
                        <span class="stat-text" style="font-size:0.8rem; color:var(--text-secondary); white-space:nowrap;">Zdjęcia C:</span>
                        <span class="stat-text" id="stat-photos" style="font-size:0.9rem; font-weight:700; color:var(--text-primary); font-family:var(--font-mono); margin-left:auto;">0</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <i data-lucide="table-2" style="width:16px;"></i>
                        <span class="stat-text" style="font-size:0.8rem; color:var(--text-secondary); white-space:nowrap;">Modele Excel:</span>
                        <span class="stat-text" id="stat-excels" style="font-size:0.9rem; font-weight:700; color:var(--text-primary); font-family:var(--font-mono); margin-left:auto;">0</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <i data-lucide="terminal-square" style="width:16px;"></i>
                        <span class="stat-text" style="font-size:0.8rem; color:var(--text-secondary); white-space:nowrap;">Skrypty .py:</span>
                        <span class="stat-text" id="stat-storms" style="font-size:0.9rem; font-weight:700; color:var(--text-primary); font-family:var(--font-mono); margin-left:auto;">0</span>
                    </div>
                    <div class="stat-text" style="font-size:0.65rem; color:var(--accent-success); margin-top:8px;" id="stat-sync">Sync: Brak</div>
                </div>
            </section>
        </aside>
        
        <!-- Warstwa przyciemniająca na telefonach -->
        <div class="sidebar-backdrop" id="sidebar-backdrop"></div>
    `;

    if (document.body) {
        document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
    }
    
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    // Zrób trigger, że sidebar został załadowany, aby initApp i inne funkcje mogły się podpiąć (np. rutyny)
    const event = new Event('sidebarLoaded');
    document.dispatchEvent(event);
}
