// app/js/knowledge/data/srs_starter.js
import { getTodayStr } from '../../core/utils.js';

const today = getTodayStr();

export const DEFAULT_SRS_DECK = {
    // Matematyka & Statystyka
    "starter_math_1": { q: "Jaki jest wzór na prawdopodobieństwo warunkowe $P(A|B)$?", a: "$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$, gdy $P(B) > 0$.", topic: "Rachunek prawdopodobieństwa", category: "Matematyka & Statystyka", interval: 0, ef: 2.5, nextReview: today },
    "starter_math_2": { q: "Jaki jest wzór na współczynnik zmienności $V_S$ w statystyce opisowej?", a: "$V_S = \\frac{S}{\\bar{x}} \\cdot 100\\%$, gdzie $S$ to odchylenie standardowe, a $\\bar{x}$ to średnia arytmetyczna.", topic: "Statystyka opisowa", category: "Matematyka & Statystyka", interval: 0, ef: 2.5, nextReview: today },
    "starter_math_3": { q: "Jak zinterpretować $p$-value mniejsze od poziomu istotności $\\alpha = 0.05$?", a: "Odrzucamy hipotezę zerową $H_0$ na rzecz hipotezy alternatywnej $H_1$ (wynik jest istotny statystycznie).", topic: "Statystyka matematyczna", category: "Matematyka & Statystyka", interval: 0, ef: 2.5, nextReview: today },
    "starter_math_4": { q: "Jak obliczyć wyznacznik macierzy $2 \\times 2$ $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$?", a: "$\\det(A) = ad - bc$.", topic: "Matematyka wyższa", category: "Matematyka & Statystyka", interval: 0, ef: 2.5, nextReview: today },

    // Ekonomia & Finanse
    "starter_fin_1": { q: "Co oznacza skrót DCF w wycenie przedsiębiorstw?", a: "Discounted Cash Flow – metoda zdyskontowanych przepływów pieniężnych.", topic: "Finanse", category: "Ekonomia & Finanse", interval: 0, ef: 2.5, nextReview: today },
    "starter_fin_2": { q: "Jakie są główne trzy elementy Rachunku Przepływów Pieniężnych (Cash Flow)?", a: "1. Działalność operacyjna, 2. Działalność inwestycyjna, 3. Działalność finansowa.", topic: "Rachunkowość", category: "Ekonomia & Finanse", interval: 0, ef: 2.5, nextReview: today },
    "starter_fin_3": { q: "Jaka jest różnica między spakiem a wzrostem ciśnienia na mapie synoptycznej?", a: "Gwałtowny spadek ciśnienia zwiastuje nadejście niżu i pogorszenie pogody (opady/wiatr).", topic: "Meteorologia", category: "Ekonomia & Finanse", interval: 0, ef: 2.5, nextReview: today },
    "starter_fin_4": { q: "Czym jest elastyczność cenowa popytu $E_p$?", a: "Miara reakcji wielkości popytu na zmianę ceny: $E_p = \\frac{\\% \\Delta Q}{\\% \\Delta P}$.", topic: "Ekonomia", category: "Ekonomia & Finanse", interval: 0, ef: 2.5, nextReview: today },

    // Technologie & Analityka
    "starter_tech_1": { q: "Jaka jest główna zaleta funkcji XLOOKUP nad VLOOKUP w Excelu?", a: "XLOOKUP potrafi wyszukiwać w lewo, nie wymaga podawania indeksu kolumny i ma wbudowaną obsługę błędów.", topic: "Excel", category: "Technologie & Analityka", interval: 0, ef: 2.5, nextReview: today },
    "starter_tech_2": { q: "Jakie jest zastosowanie metody `.groupby()` w bibliotece Pandas?", a: "Służy do podziału DataFrame na grupy na podstawie wartości kolumn i aplikowania agregacji (np. sum, mean).", topic: "Python", category: "Technologie & Analityka", interval: 0, ef: 2.5, nextReview: today },
    "starter_tech_3": { q: "Jaka jest różnica w SQL między `INNER JOIN` a `LEFT JOIN`?", a: "INNER JOIN zwraca tylko dopasowane wiersze z obu tabel, LEFT JOIN zwraca wszystkie wiersze z lewej tabeli i dopasowane z prawej.", topic: "SQL", category: "Technologie & Analityka", interval: 0, ef: 2.5, nextReview: today },
    "starter_tech_4": { q: "Czym jest RAG w sztucznej inteligencji?", a: "Retrieval-Augmented Generation – łączenie LLM z zewnętrzną bazą wiedzy (np. wektorową) do udzielania odpowiedzi opartych na faktach.", topic: "AI (Sztuczna Inteligencja)", category: "Technologie & Analityka", interval: 0, ef: 2.5, nextReview: today },

    // Języki & Komunikacja
    "starter_lang_1": { q: "Kiedy używamy czasu Present Perfect zamiast Past Simple?", a: "Present Perfect używamy, gdy zdarzenie przeszłe ma bezpośredni wpływ lub łączność z teraźniejszością.", topic: "Język angielski", category: "Języki & Komunikacja", interval: 0, ef: 2.5, nextReview: today },
    "starter_lang_2": { q: "Wyjaśnij różnicę między czasownikami 'ser' i 'estar' w hiszpańskim.", a: "'Ser' używamy do cech stałych (tożsamość, pochodzenie), a 'estar' do stanów tymczasowych (emocje, lokalizacja).", topic: "Język hiszpański", category: "Języki & Komunikacja", interval: 0, ef: 2.5, nextReview: today },
    "starter_lang_3": { q: "Na czym polega zasada Pyramid Principle (Minto) w komunikacji?", a: "Najważniejszy wniosek/konkluzję podaje się na samym początku, a dopiero potem przedstawia argumenty wspierające.", topic: "Użytkowanie polskiego języka", category: "Języki & Komunikacja", interval: 0, ef: 2.5, nextReview: today },

    // Specjalistyczne & Rozwój
    "starter_dev_1": { q: "Na czym polega zasada Dychotomii Kontroli w Stoicyzmie?", a: "Dzielimy sprawy na te, na które mamy 100% wpływu (nasze decyzje, reakcje) i te, na które wpływu nie mamy (pogoda, zachowania innych).", topic: "Samorozwój i ogarnianie życia (by było git)", category: "Specjalistyczne & Rozwój", interval: 0, ef: 2.5, nextReview: today },
    "starter_dev_2": { q: "Co oznacza skrót PARA w zarządzaniu wiedzą (Second Brain)?", a: "Projects (Projekty), Areas (Obszary), Resources (Zasoby), Archives (Archiwum).", topic: "Tworzenie systemowe i planowanie", category: "Specjalistyczne & Rozwój", interval: 0, ef: 2.5, nextReview: today }
};
