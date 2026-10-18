// app/js/knowledge/parser.js
// Parsowanie tematow, mapowanie kolorow dziedzin oraz migracja bazy wiedzy
import { escapeHTML } from '../core/utils.js';
import { DEFAULT_KNOWLEDGE_TREE } from './data/index.js';

export const PREFERRED_ORDER = [
    'Finanse i rachunkowość',
    'Excel i Power BI',
    'Statystyka matematyczna i opisowa',
    'SQL',
    'Python',
    'Język Angielski',
    'Samorozwój i pewność siebie'
];

export function getCatColor(cat) {
    const t = cat.toLowerCase();
    if (t.includes('finans') || t.includes('rachunkowo')) return '#0A84FF';
    if (t.includes('excel') || t.includes('power')) return '#2BBF71';
    if (t.includes('statystyk') || t.includes('matematyk')) return '#FF9F0A';
    if (t.includes('sql')) return '#BF5AF2';
    if (t.includes('python')) return '#32ADE6';
    if (t.includes('angielski') || t.includes('język')) return '#FF375F';
    if (t.includes('samorozwój') || t.includes('pewność') || t.includes('rozwój')) return '#FFD60A';
    return '#8B949E';
}

function findDefaultMatch(category, title) {
    if (!DEFAULT_KNOWLEDGE_TREE) return null;
    if (Array.isArray(DEFAULT_KNOWLEDGE_TREE[category])) {
        const found = DEFAULT_KNOWLEDGE_TREE[category].find(n => (typeof n === 'object' ? n.title : n) === title);
        if (found) return found;
    }
    if (Array.isArray(DEFAULT_KNOWLEDGE_TREE[title])) {
        const found = DEFAULT_KNOWLEDGE_TREE[title].find(n => (typeof n === 'object' ? n.title : n) === title);
        if (found) return found;
    }
    for (const k in DEFAULT_KNOWLEDGE_TREE) {
        const arr = DEFAULT_KNOWLEDGE_TREE[k];
        if (Array.isArray(arr)) {
            const found = arr.find(n => typeof n === 'object' && n.title === title);
            if (found) return found;
        }
    }
    return null;
}

export function getTopicDetails(category, title, item) {
    if (typeof item === 'object' && item !== null && (item.desc || item.challenge || item.subtopics)) {
        return {
            yt: item.yt || null,
            challenge: item.challenge || null,
            description: item.desc || item.description || null,
            subtopics: item.subtopics || null,
            resources: item.resources || null
        };
    }

    const match = findDefaultMatch(category, title);
    if (match && typeof match === 'object') {
        return {
            yt: match.yt || null,
            challenge: match.challenge || null,
            description: match.desc || match.description || null,
            subtopics: match.subtopics || null,
            resources: match.resources || null
        };
    }

    return {
        yt: null,
        challenge: `Zadanie: Opisz najważniejsze założenia oraz praktyczną metodykę dla zagadnienia ${title}.`,
        description: `Szczegółowy moduł dydaktyczny dotyczący zagadnienia **${escapeHTML(title)}**. Poznaj podstawowe definicje, wzory oraz zastosowanie praktyczne w ramach dziedziny **${escapeHTML(category)}**.`,
        subtopics: [
            `Podstawy teoretyczne i kluczowe pojęcia dla ${escapeHTML(title)}`,
            `Metodyka obliczeniowa i przykłady zastosowań`,
            `Najczęstsze błędy i dobre praktyki w dziedzinie ${escapeHTML(category)}`
        ]
    };
}

export function migrateKnowledgeProgress(localProgress, globalTree) {
    Object.keys(localProgress).forEach(category => {
        const progress = localProgress[category];
        const treeArr = globalTree[category] ? globalTree[category] : null;
        if (progress && treeArr && progress.level > 0 && (!progress.completed || Object.keys(progress.completed).length === 0)) {
            const total = treeArr.length;
            const maxIdx = Math.floor((progress.level / 100) * total) - 1;
            progress.completed = {};
            for (let i = 0; i <= maxIdx; i++) {
                progress.completed[i] = true;
            }
        }
    });
}
