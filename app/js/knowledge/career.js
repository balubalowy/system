// app/js/knowledge/career.js
// Obsluga postepu sciezki kariery i kamieni milowych w oparciu o Firebase
import { db, USER_NODE } from '../core/firebase.js';
import { CAREER_ROADMAP } from './data/career_data.js';

export { CAREER_ROADMAP };

export function parseHours(estStr) {
    if (!estStr) return { min: 0, max: 0 };
    const match = estStr.match(/(\d+)(?:-(\d+))?h/i);
    if (!match) return { min: 0, max: 0 };
    const min = parseInt(match[1], 10);
    const max = match[2] ? parseInt(match[2], 10) : min;
    return { min, max };
}

function resolveCareerRank(totalPct) {
    if (totalPct >= 89) return { rank: "Master Data, Web & AI Architect", color: "#FF2D55" };
    if (totalPct >= 78) return { rank: "AI Systems Engineer", color: "#BF5AF2" };
    if (totalPct >= 67) return { rank: "Machine Learning Engineer", color: "#FF375F" };
    if (totalPct >= 55) return { rank: "Python Data Scientist", color: "#32ADE6" };
    if (totalPct >= 44) return { rank: "Senior Power BI & Business Analyst", color: "#FF9F0A" };
    if (totalPct >= 33) return { rank: "Azure Cloud & BI Developer", color: "#00C7BE" };
    if (totalPct >= 22) return { rank: "SQL Data Specialist", color: "#30D158" };
    if (totalPct >= 11) return { rank: "Excel & Data Analyst", color: "#0A84FF" };
    return { rank: "Student Matematyki & Statystyki", color: "var(--text-secondary)" };
}

function calculateAggregates(completedMap) {
    let totalMilestones = 0;
    let completedCount = 0;
    let remHoursMin = 0;
    let remHoursMax = 0;

    CAREER_ROADMAP.forEach(phase => {
        totalMilestones += phase.milestones.length;
        phase.milestones.forEach(m => {
            const h = parseHours(m.est);
            if (completedMap[m.id] === true) {
                completedCount++;
            } else {
                remHoursMin += h.min;
                remHoursMax += h.max;
            }
        });
    });

    const totalPct = totalMilestones > 0 ? Math.round((completedCount / totalMilestones) * 100) : 0;
    return { totalMilestones, completedCount, remHoursMin, remHoursMax, totalPct };
}

function renderPhaseMilestones(milestones, phaseColor, completedMap) {
    return milestones.map(m => {
        const isChecked = completedMap[m.id] === true;
        return `
            <div style="display: flex; flex-direction: column; gap: 3px; background: rgba(255,255,255,0.015); border: 1px solid rgba(255,255,255,0.03); border-radius: 6px; padding: 6px 8px;">
                <label style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; font-size: 0.8rem; color: ${isChecked ? 'var(--text-primary)' : 'var(--text-secondary)'}; cursor: pointer;">
                    <div style="display: flex; align-items: flex-start; gap: 8px; flex: 1;">
                        <input type="checkbox" data-milestone="${m.id}" ${isChecked ? 'checked' : ''} style="margin-top: 2px; accent-color: ${phaseColor}; cursor: pointer; flex-shrink: 0;">
                        <span style="font-weight: 600; line-height: 1.35; ${isChecked ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${m.text}</span>
                    </div>
                    <span style="font-size: 0.7rem; font-family: var(--font-mono); color: ${phaseColor}; opacity: 0.85; white-space: nowrap; flex-shrink: 0; padding-top: 1px; font-weight: 600;">${m.est}</span>
                </label>
                ${m.test ? `
                    <div style="font-size: 0.73rem; color: var(--text-secondary); opacity: 0.8; padding-left: 22px; line-height: 1.3;">
                        <span style="color: ${phaseColor}; font-weight: 600;">Weryfikacja:</span> ${m.test}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

function renderPhaseCard(phase, phaseIdx, completedMap) {
    let phaseDone = 0;
    let phaseRemMin = 0;
    let phaseRemMax = 0;

    phase.milestones.forEach(m => {
        const h = parseHours(m.est);
        if (completedMap[m.id] === true) {
            phaseDone++;
        } else {
            phaseRemMin += h.min;
            phaseRemMax += h.max;
        }
    });
    const phasePct = Math.round((phaseDone / phase.milestones.length) * 100);
    const resourcesHtml = (phase.resources && phase.resources.length > 0) ? `
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px dashed var(--border-subtle);">
            ${phase.resources.map(res => `
                <a href="${res.url}" target="_blank" rel="noopener" style="font-size: 0.73rem; color: var(--text-primary); background: rgba(255,255,255,0.04); border: 1px solid var(--border-subtle); padding: 3px 8px; border-radius: 4px; text-decoration: none;">
                    <span>${res.name}</span>
                </a>
            `).join('')}
        </div>
    ` : '';

    return `
        <div style="background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 18px; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 28px; height: 28px; border-radius: 6px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: ${phase.color}; flex-shrink: 0;">
                        <i data-lucide="${phase.icon}" style="width: 16px; height: 16px;"></i>
                    </div>
                    <span style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">${phase.title}</span>
                </div>
            </div>
            <div style="background: rgba(255,255,255,0.02); border-left: 3px solid ${phase.color}; padding: 8px 10px; border-radius: 0 4px 4px 0; margin-bottom: 12px;">
                <div style="font-size: 0.72rem; font-weight: 700; color: ${phase.color}; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 2px;">Sprawdzalny Rezultat:</div>
                <div style="font-size: 0.78rem; color: var(--text-primary); line-height: 1.35;">${phase.goal}</div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 4px;">
                <span>Postep Fazy ${phaseIdx}</span>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <span style="font-family: var(--font-mono); color: var(--text-secondary); opacity: 0.8; font-size: 0.7rem;">(${phaseRemMin}-${phaseRemMax}h)</span>
                    <span style="font-family: var(--font-mono); color: ${phase.color}; font-weight: 600;">${phasePct}%</span>
                </div>
            </div>
            <div style="height: 5px; background: rgba(255, 255, 255, 0.05); border-radius: 3px; overflow: hidden; margin-bottom: 12px;">
                <div style="width: ${phasePct}%; height: 100%; background: ${phase.color}; transition: width 0.3s ease;"></div>
            </div>
            ${resourcesHtml}
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
                ${renderPhaseMilestones(phase.milestones, phase.color, completedMap)}
            </div>
        </div>
    `;
}

function renderCareerRoadmap(container, completedMap) {
    const { totalMilestones, completedCount, remHoursMin, remHoursMax, totalPct } = calculateAggregates(completedMap);
    const { rank: currentRank, color: rankColor } = resolveCareerRank(totalPct);

    container.innerHTML = `
        <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-md, 12px); padding: 20px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 16px;">
                <div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i data-lucide="trophy" style="width: 22px; height: 22px; color: ${rankColor};"></i>
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0;">9-Etapowy System Progresu Kariery</h3>
                        <span style="font-size: 0.75rem; font-weight: 700; color: ${rankColor}; background: rgba(255,255,255,0.05); border: 1px solid ${rankColor}; padding: 3px 12px; border-radius: 20px;">${currentRank}</span>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 6px 0 0 0;">Atomowe kamienie milowe z weryfikacja: Math -> Excel -> SQL -> Azure -> Power BI -> Python -> ML -> AI -> Web Portfolio</p>
                </div>
                <div style="text-align: right; min-width: 220px; display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
                    <div style="font-size: 1.5rem; font-family: var(--font-mono); font-weight: 700; color: ${rankColor}; line-height: 1;">${totalPct}%</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary);">${completedCount} z ${totalMilestones} kamieni milowych</div>
                    <div style="font-size: 0.78rem; font-family: var(--font-mono); color: var(--accent-warning, #FF9F0A); margin-top: 4px; font-weight: 600; background: rgba(255,159,10,0.08); border: 1px solid rgba(255,159,10,0.25); padding: 4px 10px; border-radius: 6px; display: inline-flex; align-items: center; gap: 6px;">
                        <i data-lucide="clock" style="width: 14px; height: 14px;"></i> Pozostalo: <strong>${remHoursMin}-${remHoursMax}h</strong> pracy
                    </div>
                </div>
            </div>
            <div style="height: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 4px; overflow: hidden; margin-bottom: 24px;">
                <div style="width: ${totalPct}%; height: 100%; background: ${rankColor}; transition: width 0.4s ease;"></div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(330px, 1fr)); gap: 16px; align-items: start;">
                ${CAREER_ROADMAP.map((phase, idx) => renderPhaseCard(phase, idx, completedMap)).join('')}
            </div>
        </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    container.querySelectorAll('input[data-milestone]').forEach(input => {
        input.addEventListener('change', (e) => {
            const mId = e.target.getAttribute('data-milestone');
            db.ref(USER_NODE + 'career_progress/' + mId).set(e.target.checked);
        });
    });
}

export function initCareerProgress() {
    const container = document.getElementById('career-progress-container');
    if (!container) return;

    db.ref(USER_NODE + 'career_progress').on('value', snap => {
        const completedMap = snap.val() || {};
        renderCareerRoadmap(container, completedMap);
    });
}
