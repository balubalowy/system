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
        { 
            title: "Zdarzenia losowe i przestrzeń Ω", 
            desc: "Definicje zdarzeń elementarnych, działania na zbiorach i aksjomaty Kolmogorowa.", 
            challenge: "Zadanie: Zapisz matematycznie iloczyn i sumę zdarzeń A i B dla rzutu kostką.",
            subtopics: ["Przestrzeń zdarzeń elementarnych Ω", "Algebra zdarzeń (suma, iloczyn, różnica)", "Aksjomaty prawdopodobieństwa Kolmogorowa"]
        },
        { 
            title: "Kombinatoryka i klasyczna definicja", 
            desc: "Permutacje, kombinacje, wariacje z powtórzeniami i bez powtórzeń.", 
            challenge: "Zadanie: Oblicz na ile sposobów można wybrać 3 osoby z 10-osobowej grupy.",
            subtopics: ["Permutacje n-elementowe", "Kombinacje bez powtórzeń (symbol Newtona)", "Wariancje z powtórzeniami i bez powtórzeń"]
        },
        { 
            title: "Prawdopodobieństwo warunkowe i niezależność", 
            desc: "Wzór na prawdopodobieństwo warunkowe A pod warunkiem B.", 
            challenge: "Zadanie: Sprawdź kryterium niezależności zdarzeń P(A∩B) = P(A)*P(B).",
            subtopics: ["Definicja prawdopodobieństwa warunkowego P(A|B)", "Kryterium niezależności dwóch i wielu zdarzeń", "Drzewa stochastyczne w zadaniach"]
        },
        { 
            title: "Twierdzenie o prawdopodobieństwie całkowitym i Bayesa", 
            desc: "Rozbicie przestrzeni na hipotezy i wnioskowanie bayesowskie.", 
            challenge: "Zadanie: Przelicz prawdopodobieństwo testu medycznego (Positive Predictive Value).",
            subtopics: ["Zupełny układ hipotez", "Wzór na prawdopodobieństwo całkowite", "Wzór Bayesa i prawdopodobieństwo a posteriori"]
        },
        { 
            title: "Zmienne losowe dyskretne", 
            desc: "Funkcja prawdopodobieństwa, rozkład dwumianowy (Bernoulliego) i Poissona.", 
            challenge: "Zadanie: Oblicz prawdopodobieństwo uzyskania 3 sukcesów w 5 próbach Bernoulliego z p=0.4.",
            subtopics: ["Rozkład dwumianowy (Binomial distribution)", "Rozkład Poissona dla zdarzeń rzadkich", "Rozkład geometryczny i hipergeometryczny"]
        },
        { 
            title: "Zmienne losowe ciągłe", 
            desc: "Funkcja gęstości prawdopodobieństwa f(x) i dystrybuanta F(x).", 
            challenge: "Zadanie: Oblicz P(1 < X < 3) całkując gęstość f(x) = 0.5 w przedziale (0, 4).",
            subtopics: ["Funkcja gęstości prawdopodobieństwa f(x)", "Całkowa definicja dystrybuanty F(x)", "Własności rozkładów ciągłych"]
        },
        { 
            title: "Rozkład Normalny i twierdzenia graniczne", 
            desc: "Gęstość rozkładu Gaussa N(μ, σ) oraz Centralne Twierdzenie Graniczne (CTG).", 
            challenge: "Zadanie: Użyj tablic rozkładu N(0,1) do wyznaczenia P(Z < 1.96).",
            subtopics: ["Standaryzacja zmiennej do N(0,1)", "Reguła trzech sigm (68-95-99.7)", "Centralne Twierdzenie Graniczne (Lindeberga-Lévy'ego)"]
        },
        { 
            title: "Wielowymiarowe zmienne losowe i kowariancja", 
            desc: "Rozkłady łączne, brzegowe i warunkowe dwóch zmiennych losowych.", 
            challenge: "Zadanie: Wyznacz kowariancję pomiędzy dwoma zmiennymi losowymi ze wzoru Cov(X,Y).",
            subtopics: ["Łączny rozkład dwóch zmiennych", "Rozkłady brzegowe i warunkowe", "Kowariancja Cov(X,Y) i współczynnik korelacji"]
        }
    ],
    "Statystyka opisowa": [
        { 
            title: "Wprowadzenie i szeregi statystyczne", 
            desc: "Skale pomiarowe (nominalna, porządkowa, przedziałowa, stosunkowa) oraz szeregi rozdzielcze.", 
            challenge: "Zadanie: Zbuduj szereg rozdzielczy przedziałowy dla próby 20 obserwacji.",
            subtopics: ["Klasyfikacja skal pomiarowych", "Szeregi szczegółowe, punktowe i przedziałowe", "Liczebności skumulowane i częstości"]
        },
        { 
            title: "Miary położenia (średnia, mediana, moda)", 
            desc: "Wyznaczanie i interpretacja średniej arytmetycznej, mediany oraz kwartyli.", 
            challenge: "Zadanie: Oblicz medianę i dominantę dla zbioru ocen: [2, 3, 3, 4, 4, 4, 5].",
            subtopics: ["Średnia arytmetyczna i ważona", "Mediana i kwartyle (Q1, Q2, Q3)", "Dominanta (Moda) w szeregach"]
        },
        { 
            title: "Miary zmienności (wariancja, odchylenie)", 
            desc: "Wariancja, odchylenie standardowe, współczynnik zmienności V.", 
            challenge: "Zadanie: Wyznacz odchylenie standardowe z próby dla stóp zwrotu portfela.",
            subtopics: ["Wariancja z populacji i próby", "Odchylenie standardowe i ćwiartkowe", "Współczynnik zmienności V_s"]
        },
        { 
            title: "Miary asymetrii i skupienia", 
            desc: "Skośność (współczynnik asymetrii) oraz kurtoza.", 
            challenge: "Zadanie: Zinterpretuj ujemny współczynnik skośności w rozkładzie zarobków.",
            subtopics: ["Współczynnik skośności Pearsona", "Momenty centralne III i IV rzędu", "Kurtoza i eksces rozkładu"]
        },
        { 
            title: "Analiza zmiennej w czasie (Indeksy dynamiki)", 
            desc: "Indeksy jednopodstawowe, łańcuchowe, jednopodstawowe tempo zmian.", 
            challenge: "Zadanie: Przelicz przyrosty względne i jednopodstawowy indeks sprzedaży za 5 lat.",
            subtopics: ["Indeksy indywidualne jednopodstawowe i łańcuchowe", "Średnioroczne tempo zmian (Średnia geometryczna)", "Przeliczanie baz indeksów"]
        },
        { 
            title: "Korelacja liniowa Pearsona", 
            desc: "Współczynnik korelacji r-Pearsona, kowariancja i wykresy rozrzutu.", 
            challenge: "Zadanie: Oblicz i zinterpretuj r = 0.85 pomiędzy wydatkami na reklamę a sprzedażą.",
            subtopics: ["Kowariancja Cov(X,Y)", "Współczynnik r-Pearsona i jego właściwości", "Test istotności współczynnika korelacji"]
        },
        { 
            title: "Korelacja rang Spearmana i Kendalla", 
            desc: "Mierzenie zależności dla zmiennych na skali porządkowej.", 
            challenge: "Zadanie: Oblicz współczynnik Spearmana dla rankingu 5 produktów w dwóch testach.",
            subtopics: ["Rangi obserwacji i różnice rang d_i", "Wzór na korelację rang Spearmana r_s", "Współczynnik korelacji tau-Kendalla"]
        }
    ],
    "Statystyka matematyczna": [
        { 
            title: "Rozkłady teoretyczne z próby", 
            desc: "Rozkład normalny N(μ, σ), t-Studenta, Chi-kwadrat i F-Snedecora.", 
            challenge: "Zadanie: Standaryzuj zmienną X=115 do rozkładu N(0,1) przy μ=100 i σ=15.",
            subtopics: ["Gęstość rozkładu normalnego N(μ, σ)", "Rozkład t-Studenta i stopnie swobody", "Rozkłady Chi-kwadrat i F-Snedecora"]
        },
        { 
            title: "Estymacja punktowa i przedziałowa", 
            desc: "Estymatory nieobciążone, efektywne i przedziały ufności dla średniej.", 
            challenge: "Zadanie: Wyznacz 95% przedział ufności dla średniej wzrostu w próbie.",
            subtopics: ["Własności estymatorów (nieobciążoność, zgodność)", "Błąd standardowy estymatora (SE)", "Konstrukcja przedziału ufności dla μ"]
        },
        { 
            title: "Testowanie hipotez (Test Z i Test t)", 
            desc: "Hipoteza zerowa H0, alternatywna H1, poziom istotności α i p-value.", 
            challenge: "Zadanie: Podejmij decyzję w teście przy wyznaczonym p-value = 0.03 i α = 0.05.",
            subtopics: ["Sformułowanie H0 i H1", "Błędy I i II rodzaju oraz moc testu", "Kryterium p-value i obszar krytyczny"]
        },
        { 
            title: "Test Chi-kwadrat niezależności i zgodności", 
            desc: "Weryfikacja zależności pomiędzy dwoma zmiennymi jakościowymi oraz testy zgodności rozkładów.", 
            challenge: "Zadanie: Zbuduj tablicę 2x2 i oblicz statystykę testową Chi-kwadrat.",
            subtopics: ["Tablice wielodzielcze (Contingency tables)", "Liczebności oczekiwane vs obserwowane", "Test zgodności Chi-kwadrat i test Kolmogorov-Smirnov"]
        },
        { 
            title: "Analiza wariancji (ANOVA)", 
            desc: "Porównywanie średnich w wielu grupach jednocześnie.", 
            challenge: "Zadanie: Sformułuj hipotezę zerową i alternatywną dla jednoczynnikowej ANOVA.",
            subtopics: ["Rozkład zmienności całkowitej SS_T = SS_B + SS_W", "Statystyka F-ANOVA", "Testy post-hoc (Tukeya/HSD)"]
        },
        { 
            title: "Liniowa regresja prosta i MNK", 
            desc: "Metoda Najmniejszych Kwadratów, współczynnik determinacji R^2.", 
            challenge: "Zadanie: Zinterpretuj b1=2.5 w równaniu y = 10 + 2.5x oraz współczynnik R^2=0.81.",
            subtopics: ["Kryterium sumy kwadratów reszt (MNK)", "Interpretacja parametrów b0 i b1", "Współczynnik determinacji R2 i dopasowanie modelu"]
        },
        { 
            title: "Regresja wieloraka i weryfikacja założeń", 
            desc: "Modele z wieloma objaśniającymi, współliniowość (VIF) i analiza reszt.", 
            challenge: "Zadanie: Zinterpretuj współczynnik VIF = 12 dla zmiennej objaśniającej.",
            subtopics: ["Estymacja MNK w ujęciu macierzowym", "Multikoliniowość i współczynnik VIF", "Normalność i homoskedastyczność reszt"]
        }
    ],
    "Matematyka wyższa": [
        { 
            title: "Macierze i wyznaczniki", 
            desc: "Operacje na macierzach, wyznacznik macierzy, macierz odwrotna.", 
            challenge: "Zadanie: Oblicz wyznacznik macierzy A = [[3, 1], [4, 2]].",
            subtopics: ["Dodawanie i mnożenie macierzy", "Wyznacznik det(A) i metoda Sarrusa", "Macierz odwrotna A^-1 i warunek nieosobliwości"]
        },
        { 
            title: "Układy równań liniowych (Metoda Cramera)", 
            desc: "Rozwiązywanie układów równań liniowych za pomocą wyznaczników.", 
            challenge: "Zadanie: Rozwiąż układ równań 2x + y = 5, x - y = 1 metodą Cramera.",
            subtopics: ["Macierz główna i wyznaczniki W, Wx, Wy", "Twierdzenie Cramera", "Metoda eliminacji Gaussa"]
        },
        { 
            title: "Granice ciągów i funkcji", 
            desc: "Definicja granicy, symbol nieoznaczony i reguła de l'Hospitala.", 
            challenge: "Zadanie: Oblicz granicę lim (x->1) (x^2 - 1)/(x - 1).",
            subtopics: ["Granica ciągu przy n->infinity", "Symbole nieoznaczone [0/0], [inf/inf]", "Reguła de l'Hospitala"]
        },
        { 
            title: "Pochodne funkcji jednej zmiennej", 
            desc: "Definicja pochodnej, reguła różniczkowania i monotoniczność funkcji.", 
            challenge: "Zadanie: Wyznacz extrema lokalne funkcji f(x) = x^3 - 3x.",
            subtopics: ["Interpretacja geometryczna pochodnej", "Reguły różniczkowania iloczynu i ilorazu", "Badanie ekstremów lokalnych i wklęsłości"]
        },
        { 
            title: "Pochodne cząstkowe funkcji wielu zmiennych", 
            desc: "Pochodne cząstkowe I i II rzędu, gradient i ekstrema funkcji dwojga zmiennych.", 
            challenge: "Zadanie: Wyznacz pochodne cząstkowe f_x i f_y dla f(x,y) = x^2 * y + 3y.",
            subtopics: ["Definicja pochodnej cząstkowej ∂f/∂x i ∂f/∂y", "Macierz Hesjan i badanie ekstremów dwojga zmiennych", "Gradient i pochodna kierunkowa"]
        },
        { 
            title: "Całki nieoznaczone i oznaczone", 
            desc: "Całkowanie przez podstawienie i przez części. Pole pod wykresem.", 
            challenge: "Zadanie: Oblicz całkę oznaczoną ∫ (od 0 do 3) 2x dx.",
            subtopics: ["Funkcja pierwotna i całka nieoznaczona", "Metody całkowania (przez części, przez podstawienie)", "Twierdzenie Newtona-Leibniza i całka oznaczona"]
        },
        { 
            title: "Równania różniczkowe zwyczajne", 
            desc: "Równania o zmiennych rozdzielonych i równania liniowe I rzędu.", 
            challenge: "Zadanie: Rozwiąż równanie dy/dx = 3y przy warunku początkowym y(0)=2.",
            subtopics: ["Definicja równania różniczkowego i rzędu", "Metoda rozdzielania zmiennych", "Równania liniowe I rzędu dy/dx + P(x)y = Q(x)"]
        }
    ]
};
