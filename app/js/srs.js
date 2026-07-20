// js/srs.js
import { db, USER_NODE } from './firebase.js';
import { getTodayStr } from './utils.js';

export function initSRS() {
    const qDisplay = document.getElementById('srs-q');
    const revealBtn = document.getElementById('srs-reveal');
    const actionsPanel = document.getElementById('srs-actions');
    const statusText = document.getElementById('srs-status');
    
    if(!qDisplay || !revealBtn) return; // Fail-safe dla stron gdzie nie ma SRS

    const dbSrsRef = db.ref(USER_NODE + 'srs_deck');
    
    dbSrsRef.once('value').then(snap => {
        loadDueCard();
    });

    let currentCardKey = null;
    let currentCardData = null;
    
    window.refreshSRS = loadDueCard;

    function formatCardContent(text) {
        if (!text) return "";
        const urlRegex = /(https?:\/\/[^\s]+?\.(?:png|jpg|jpeg|gif|webp))/gi;
        return text.replace(urlRegex, '<img src="$1" style="max-width:100%; border-radius:6px; margin-top:8px; display:block;" />');
    }

    function renderCardFace(element, prefix, text) {
        element.innerHTML = `<strong>${prefix}:</strong> ${formatCardContent(text)}`;
        if (window.renderMathInElement) {
            window.renderMathInElement(element, {
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "$", right: "$", display: false}
                ],
                throwOnError: false
            });
        }
    }

    function loadDueCard() {
        const todayStr = getTodayStr();
        const activeTopic = window.ACTIVE_SRS_TOPIC || "all";
        
        dbSrsRef.once('value').then(snap => {
            const deck = snap.val();
            let dueCards = [];
            
            for(let key in deck) {
                const card = deck[key];
                const cardTopic = card.topic || "Unknown";
                
                if(card.nextReview <= todayStr) {
                    if(activeTopic === "all" || activeTopic.toLowerCase() === cardTopic.toLowerCase()) {
                        dueCards.push({ key: key, data: card });
                    }
                }
            }
            
            if(dueCards.length > 0) {
                const rnd = dueCards[Math.floor(Math.random() * dueCards.length)];
                currentCardKey = rnd.key;
                currentCardData = rnd.data;
                
                qDisplay.innerHTML = "";
                renderCardFace(qDisplay, "P", rnd.data.q);
                
                revealBtn.style.display = 'block';
                actionsPanel.style.display = 'none';
                statusText.textContent = `Fiszek w kolejce: ${dueCards.length}`;
            } else {
                qDisplay.textContent = "Zero fiszek. Pamięć na najwyższych obrotach.";
                revealBtn.style.display = 'none';
                actionsPanel.style.display = 'none';
                statusText.textContent = "Ukończono trening.";
            }
        });
    }

    revealBtn.addEventListener('click', () => {
        qDisplay.innerHTML = "";
        
        let combinedDiv = document.createElement('div');
        combinedDiv.innerHTML = `<div style="margin-bottom:12px; font-weight:600; color:var(--text-secondary);">Trening pamięci:</div>`;
        
        let qDiv = document.createElement('div');
        qDiv.style.marginBottom = "16px";
        renderCardFace(qDiv, "Pytanie", currentCardData.q);
        
        let aDiv = document.createElement('div');
        renderCardFace(aDiv, "Odpowiedź", currentCardData.a);
        
        combinedDiv.appendChild(qDiv);
        combinedDiv.appendChild(aDiv);
        
        qDisplay.appendChild(combinedDiv);
        
        revealBtn.style.display = 'none';
        actionsPanel.style.display = 'grid';
    });

    const processSM2 = (quality) => {
        let { interval, ef } = currentCardData;
        if (quality === 0) {
            interval = 0;
        } else {
            if (interval === 0) interval = 1;
            else if (interval === 1) interval = 3;
            else interval = Math.round(interval * ef);
        }

        ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        if (ef < 1.3) ef = 1.3; 

        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + interval);
        
        dbSrsRef.child(currentCardKey).update({
            interval: interval,
            ef: ef,
            nextReview: nextDate.toISOString().split('T')[0]
        }).then(() => {
            loadDueCard();
        });
    };

    const badBtn = document.getElementById('srs-bad');
    const midBtn = document.getElementById('srs-mid');
    const goodBtn = document.getElementById('srs-good');
    if(badBtn) badBtn.addEventListener('click', () => processSM2(0));
    if(midBtn) midBtn.addEventListener('click', () => processSM2(3));
    if(goodBtn) goodBtn.addEventListener('click', () => processSM2(5));

    // Dodawanie fiszek
    const btnAdd = document.getElementById('btn-add-custom-srs');
    const inputQ = document.getElementById('new-srs-q');
    const inputA = document.getElementById('new-srs-a');

    if(btnAdd && inputQ && inputA) {
        btnAdd.onclick = () => {
            const qVal = inputQ.value.trim();
            const aVal = inputA.value.trim();
            const activeTopic = window.ACTIVE_SRS_TOPIC || "all";
            const activeCat = window.ACTIVE_SRS_CATEGORY || "all";
            
            if(!qVal || !aVal) {
                alert("Wpisz zarówno pytanie, jak i odpowiedź!");
                return;
            }

            const newCard = {
                q: qVal,
                a: aVal,
                topic: activeTopic,
                category: activeCat,
                interval: 0,
                ef: 2.5,
                nextReview: getTodayStr()
            };

            dbSrsRef.push(newCard).then(() => {
                inputQ.value = '';
                inputA.value = '';
                alert("Fiszka została dodana do tematu: " + activeTopic);
                loadDueCard();
            }).catch(err => {
                alert("Błąd zapisu Firebase: " + err.message);
            });
        };
    }
}
