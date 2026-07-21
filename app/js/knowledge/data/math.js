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
        { title: "Zdarzenia losowe i przestrzeń Ω", desc: "Definicje zdarzeń elementarnych, działania na zbiorach i aksjomaty Kolmogorowa.", challenge: "Zapisz matematycznie iloczyn i sumę dwóch zdarzeń." },
        { title: "Kombinatoryka i klasyczna definicja", desc: "Permutacje, kombinacje, wariacje z powtórzeniami i bez powtórzeń.", challenge: "Oblicz na ile sposobów można wybrać 3 osoby z 10." },
        { title: "Prawdopodobieństwo warunkowe i niezależność", desc: "Wzór na prawdopodobieństwo warunkowe A pod warunkiem B.", challenge: "Sprawdź kryterium niezależności zdarzeń P(A∩B) = P(A)*P(B)." },
        { title: "Twierdzenie o prawdopodobieństwie całkowitym i Bayesa", desc: "Rozbicie przestrzeni na hipotezy i wnioskowanie bayesowskie.", challenge: "Przelicz prawdopodobieństwo testu medycznego (Positive Predictive Value)." },
        { title: "Zmienne losowe i ich rozkłady", desc: "Zmienne dyskretne i ciągłe, dystrybuanta, wartość oczekiwana i wariancja.", challenge: "Wyznacz wartość oczekiwaną dla rzutu symetryczną kostką." },
        { title: "Wielowymiarowe zmienne losowe", desc: "Rozkłady łączne, brzegowe i warunkowe dwóch zmiennych losowych.", challenge: "Wyznacz kowariancję pomiędzy dwoma zmiennymi losowymi." }
    ],
    "Statystyka opisowa": [
        { title: "Wprowadzenie i szeregi statystyczne", desc: "Skale pomiarowe (nominalna, porządkowa, przedziałowa, stosunkowa) oraz szeregi rozdzielcze.", challenge: "Zbuduj szereg rozdzielczy dla próby 20 obserwacji." },
        { title: "Miary położenia (średnia, mediana, moda)", desc: "Wyznaczanie i interpretacja średniej arytmetycznej, mediany oraz kwartyli.", challenge: "Oblicz medianę i dominantę dla zbioru ocen z egzaminu." },
        { title: "Miary zmienności (wariancja, odchylenie)", desc: "Wariancja, odchylenie standardowe, współczynnik zmienności V.", challenge: "Wyznacz odchylenie standardowe z próby dla portfela inwestycyjnego." },
        { title: "Miary asymetrii i skupienia", desc: "Skośność (współczynnik asymetrii) oraz kurtoza.", challenge: "Zinterpretuj skośność ujemną w rozkładzie dochodów." },
        { title: "Korelacja liniowa Pearsona", desc: "Współczynnik korelacji r-Pearsona, kowariancja i wykresy rozrzutu.", challenge: "Zinterpretuj r = 0.85 pomiędzy wydatkami na reklamę a sprzedażą." },
        { title: "Korelacja rang Spearmana", desc: "Mierzenie zależności dla zmiennych na skali porządkowej.", challenge: "Oblicz współczynnik Spearmana dla rankingu 5 produktów." }
    ],
    "Statystyka matematyczna": [
        { title: "Rozkłady teoretyczne z próby", desc: "Rozkład normalny N(μ, σ), t-Studenta, Chi-kwadrat i F-Snedecora.", challenge: "Standaryzuj zmienną losową do rozkładu N(0,1)." },
        { title: "Estymacja punktowa i przedziałowa", desc: "Estymatory nieobciążone, efektywne i przedziały ufności dla średniej.", challenge: "Wyznacz 95% przedział ufności dla średniej próby." },
        { title: "Testowanie hipotez (Test Z i Test t)", desc: "Hipoteza zerowa H0, alternatywna H1, poziom istotności α i p-value.", challenge: "Zinterpretuj p-value = 0.03 przy α = 0.05." },
        { title: "Test Chi-kwadrat niezależności", desc: "Weryfikacja zależności pomiędzy dwoma zmiennymi jakościowymi.", challenge: "Zbuduj tablicę wielodzielczą i oblicz statystykę testową." },
        { title: "Analiza wariancji (ANOVA)", desc: "Porównywanie średnich w wielu grupach jednocześnie.", challenge: "Przeanalizuj czy 3 metody nauczania dają różniące się wyniki." },
        { title: "Liniowa regresja prosta i MNK", desc: "Metoda Najmniejszych Kwadratów, współczynnik determinacji R^2.", challenge: "Zinterpretuj współczynnik kierunkowy b1 w równaniu y = a + bx." }
    ],
    "Matematyka wyższa": [
        { title: "Macierze i wyznaczniki", desc: "Operacje na macierzach, wyznacznik macierzy, macierz odwrotna.", challenge: "Oblicz wyznacznik macierzy 2x2 i 3x3." },
        { title: "Układy równań liniowych (Metoda Cramera)", desc: "Rozwiązywanie układów równań liniowych za pomocą wyznaczników.", challenge: "Rozwiąż układ 3 równań z 3 niewiadomymi." },
        { title: "Granice ciągów i funkcji", desc: "Definicja granicy, symbol nieoznaczony i reguła de l'Hospitala.", challenge: "Oblicz granicę (x^2 - 1)/(x - 1) przy x->1." },
        { title: "Pochodne funkcji jednej zmiennej", desc: "Definicja pochodnej, reguła różniczkowania i monotoniczność funkcji.", challenge: "Wyznacz extrema lokalne funkcji f(x) = x^3 - 3x." },
        { title: "Całki nieoznaczone i oznaczone", desc: "Całkowanie przez podstawienie i przez części. Pole pod wykresem.", challenge: "Oblicz całkę oznaczoną od 0 do 2 z f(x) = 2x." },
        { title: "Równania różniczkowe zwyczajne", desc: "Równania o zmiennych rozdzielonych i równania liniowe I rzędu.", challenge: "Rozwiąż równanie dy/dx = y." }
    ]
};
