// js/knowledge-modal.js
import { escapeHTML } from './utils.js';

export function showKnowledgeModal(meta) {
    const modal = document.getElementById('knowledge-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body-content');
    const currentNode = document.getElementById('modal-current-node');
    
    if(!modal) return;
    
    if(title) {
        title.textContent = meta.categoryTitle;
        title.style.color = meta.baseColor;
    }
    window.ACTIVE_SRS_TOPIC = meta.categoryTitle;
    window.ACTIVE_SRS_CATEGORY = meta.parentTopic;
    if(window.refreshSRS) window.refreshSRS();
    
    const treeArr = window.KnowledgeTree ? window.KnowledgeTree[meta.categoryTitle] : null;
    let currentTopicStr = "Oczekuje na wgranie etapów...";
    let totalNodes = 0;
    let index = 0;
    
    if (treeArr && treeArr.length > 0) {
        totalNodes = treeArr.length;
        index = Math.floor((meta.currentLevel / 100) * totalNodes);
        if(index >= totalNodes) index = totalNodes - 1;
        if(index < 0) index = 0;
        const nodeItem = treeArr[index];
        const nodeTitle = typeof nodeItem === 'object' ? nodeItem.title : nodeItem;
        currentTopicStr = `Etap ${index+1}/${totalNodes}: ${escapeHTML(nodeTitle)}`;
    }

    if(currentNode) {
        currentNode.textContent = currentTopicStr;
        currentNode.style.color = meta.baseColor;
    }
    
    let html = `<p style="margin-bottom: 5px;">Rodzina dziedziny: <strong>${escapeHTML(meta.parentTopic)}</strong></p>`;
    html += `<p style="margin-bottom: 16px;">Osiągnięta biegłość bazowa: <strong style="color:${meta.baseColor}; font-size:1.1rem;">${meta.currentLevel}%</strong></p>`;
    
    html += `<h3 style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:8px;">Lista ustrukturyzowanych etapów edukacyjnych:</h3>`;
    html += `<ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:4px; max-height:200px; overflow-y:auto; border:1px solid var(--border-subtle); padding:10px; border-radius:var(--radius-sm); background:rgba(0,0,0,0.1);">`;
    if (treeArr && treeArr.length > 0) {
        treeArr.forEach((node, i) => {
            let isDone = i <= index;
            let nTitle = typeof node === 'object' ? node.title : node;
            html += `<li style="font-size:0.8rem; color:${isDone ? 'var(--text-primary)' : 'var(--text-secondary)'}; opacity:${isDone?1:0.5};"><i data-lucide="${isDone?'check-circle-2':'circle'}" style="width:12px; height:12px; margin-right:6px; color:${isDone?'var(--accent-success)':'inherit'};"></i> ${i+1}. ${escapeHTML(nTitle)}</li>`;
        });
    } else {
        html += `<li style="font-size:0.8rem; color:var(--text-secondary);">Brak danych w bazie dla tego przedmiotu</li>`;
    }
    html += `</ul>`;
    
    if(body) body.innerHTML = html;
    modal.style.display = 'flex';
    if(window.lucide) window.lucide.createIcons();
}
