// app/js/knowledge/data/math.js
export const mathCategory = {
    title: "Matematyka & Statystyka",
    items: [
        { title: "Rachunek prawdopodobieństwa", level: 40 },
        { title: "Statystyka opisowa", level: 75 },
        { title: "Statystyka matematyczna", level: 30 },
        { title: "Matematyka wyższa", level: 30 }
    ]
};

export const mathTree = {
    "Rachunek prawdopodobieństwa": [
        { title: "Zdarzenia losowe i przestrzeń Ω", desc: "Definicje zdarzeń elementarnych, działania na zbiorach i aksjomaty Kolmogorowa.", challenge: "Zadanie: Zapisz matematycznie iloczyn i sumę zdarzeń A i B dla rzutu kostką." },
        { title: "Kombinatoryka i klasyczna definicja", desc: "Permutacje, kombinacje, wariacje z powtórzeniami i bez powtórzeń.", challenge: "Zadanie: Oblicz na ile sposobów można wybrać 3 osoby z 10-osobowej grupy." },
        { title: "Prawdopodobieństwo warunkowe i niezależność", desc: "Wzór na prawdopodobieństwo warunkowe A pod warunkiem B.", challenge: "Zadanie: Sprawdź kryterium niezależności zdarzeń P(A∩B) = P(A)*P(B)." },
        { title: "Twierdzenie o prawdopodobieństwie całkowitym i Bayesa", desc: "Rozbicie przestrzeni na hipotezy i wnioskowanie bayesowskie.", challenge: "Zadanie: Przelicz prawdopodobieństwo testu medycznego (Positive Predictive Value)." },
        { title: "Zmienne losowe i ich rozkłady", desc: "Zmienne dyskretne i ciągłe, dystrybuanta, wartość oczekiwana i wariancja.", challenge: "Zadanie: Wyznacz wartość oczekiwaną i wariancję dla rzutu symetryczną kostką." },
        { title: "Wielowymiarowe zmienne losowe", desc: "Rozkłady łączne, brzegowe i warunkowe dwóch zmiennych losowych.", challenge: "Zadanie: Wyznacz kowariancję pomiędzy dwoma zmiennymi losowymi ze wzoru Cov(X,Y)." }
    ],
    "Statystyka opisowa": [
        { title: "Wprowadzenie i szeregi statystyczne", desc: "Skale pomiarowe (nominalna, porządkowa, przedziałowa, stosunkowa) oraz szeregi rozdzielcze.", challenge: "Zadanie: Zbuduj szereg rozdzielczy przedziałowy dla próby 20 obserwacji." },
        { title: "Miary położenia (średnia, mediana, moda)", desc: "Wyznaczanie i interpretacja średniej arytmetycznej, mediany oraz kwartyli.", challenge: "Zadanie: Oblicz medianę i dominantę dla zbioru ocen: [2, 3, 3, 4, 4, 4, 5]." },
        { title: "Miary zmienności (wariancja, odchylenie)", desc: "Wariancja, odchylenie standardowe, współczynnik zmienności V.", challenge: "Zadanie: Wyznacz odchylenie standardowe z próby dla stóp zwrotu portfela." },
        { title: "Miary asymetrii i skupienia", desc: "Skośność (współczynnik asymetrii) oraz kurtoza.", challenge: "Zadanie: Zinterpretuj ujemny współczynnik skośności w rozkładzie zarobków." },
        { title: "Korelacja liniowa Pearsona", desc: "Współczynnik korelacji r-Pearsona, kowariancja i wykresy rozrzutu.", challenge: "Zadanie: Oblicz i zinterpretuj r = 0.85 pomiędzy wydatkami na reklamę a sprzedażą." },
        { title: "Korelacja rang Spearmana", desc: "Mierzenie zależności dla zmiennych na skali porządkowej.", challenge: "Zadanie: Oblicz współczynnik Spearmana dla rankingu 5 produktów w dwóch testach." }
    ],
    "Statystyka matematyczna": [
        { title: "Rozkłady teoretyczne z próby", desc: "Rozkład normalny N(μ, σ), t-Studenta, Chi-kwadrat i F-Snedecora.", challenge: "Zadanie: Standaryzuj zmienną X=115 do rozkładu N(0,1) przy μ=100 i σ=15." },
        { title: "Estymacja punktowa i przedziałowa", desc: "Estymatory nieobciążone, efektywne i przedziały ufności dla średniej.", challenge: "Zadanie: Wyznacz 95% przedział ufności dla średniej wzrostu w próbie." },
        { title: "Testowanie hipotez (Test Z i Test t)", desc: "Hipoteza zerowa H0, alternatywna H1, poziom istotności α i p-value.", challenge: "Zadanie: Podejmij decyzję w teście przy wyznaczonym p-value = 0.03 i α = 0.05." },
        { title: "Test Chi-kwadrat niezależności", desc: "Weryfikacja zależności pomiędzy dwoma zmiennymi jakościowymi.", challenge: "Zadanie: Zbuduj tablicę 2x2 i oblicz statystykę testową Chi-kwadrat." },
        { title: "Analiza wariancji (ANOVA)", desc: "Porównywanie średnich w wielu grupach jednocześnie.", challenge: "Zadanie: Sformułuj hipotezę zerową i alternatywną dla jednoczynnikowej ANOVA." },
        { title: "Liniowa regresja prosta i MNK", desc: "Metoda Najmniejszych Kwadratów, współczynnik determinacji R^2.", challenge: "Zadanie: Zinterpretuj b1=2.5 w równaniu y = 10 + 2.5x oraz współczynnik R^2=0.81." }
    ],
    "Matematyka wyższa": [
        { title: "Macierze i wyznaczniki", desc: "Operacje na macierzach, wyznacznik macierzy, macierz odwrotna.", challenge: "Zadanie: Oblicz wyznacznik macierzy A = [[3, 1], [4, 2]]." },
        { title: "Układy równań liniowych (Metoda Cramera)", desc: "Rozwiązywanie układów równań liniowych za pomocą wyznaczników.", challenge: "Zadanie: Rozwiąż układ równań 2x + y = 5, x - y = 1 metodą Cramera." },
        { title: "Granice ciągów i funkcji", desc: "Definicja granicy, symbol nieoznaczony i reguła de l'Hospitala.", challenge: "Zadanie: Oblicz granicę lim (x->1) (x^2 - 1)/(x - 1)." },
        { title: "Pochodne funkcji jednej zmiennej", desc: "Definicja pochodnej, reguła różniczkowania i monotoniczność funkcji.", challenge: "Zadanie: Wyznacz extrema lokalne funkcji f(x) = x^3 - 3x." },
        { title: "Całki nieoznaczone i oznaczone", desc: "Całkowanie przez podstawienie i przez części. Pole pod wykresem.", challenge: "Zadanie: Oblicz całkę oznaczoną ∫ (od 0 do 3) 2x dx." },
        { title: "Równania różniczkowe zwyczajne", desc: "Równania o zmiennych rozdzielonych i równania liniowe I rzędu.", challenge: "Zadanie: Rozwiąż równanie dy/dx = 3y przy warunku początkowym y(0)=2." }
    ]
};
