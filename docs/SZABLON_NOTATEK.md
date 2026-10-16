# Sciagawka skladni Markdown i LaTeX dla Analityki Gospodarczej

Szablon formatowania notatek wykladowych, wzorow ekonometrycznych i blokow kodu.

## 1. Szablon pojedynczego wykladu (Kopiuj na start zajec)

```markdown
# [EKONOMETRIA] Wyklad 01 | Klasyczny model regresji liniowej (KMNK)
- **Data**: 2026-10-01 | **Prowadzacy**: dr hab. ...
- **Pytanie kluczowe**: Kiedy estymatory MNK sa najlepszymi liniowymi nieobciazonymi estymatorami (BLUE)?

### Intuicja i mechanizm
Zamiast dopasowywac prosta na oko, minimalizujemy sume kwadratow odchylen pionowych punktow od linii regresji.

### Model teoretyczny
Postac skalarna:
$y_i = \beta_0 + \beta_1 x_{i1} + \dots + \beta_k x_{ik} + \varepsilon_i, \quad i=1,\dots,n$

Postac macierzowa:
$$\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\varepsilon}$$

### Kluczowe zalozenia Gaussa-Markowa
1. Liniowosc parametrow.
2. $\mathbb{E}(\boldsymbol{\varepsilon} | \mathbf{X}) = \mathbf{0}$ (brak endogenicznosci).
3. $\operatorname{Var}(\boldsymbol{\varepsilon} | \mathbf{X}) = \sigma^2 \mathbf{I}$ (homoskedastycznosc i brak autokorelacji).
4. Pelny rzad macierzy $\operatorname{rank}(\mathbf{X}) = k + 1$ (brak wspolliniowosci).

### Wzor estymatora (MNK)
$$\hat{\boldsymbol{\beta}} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}$$

### Weryfikacja statystyczna
| Statystyka | Wartosc | $p$-value | Interpretacja |
| --- | --- | --- | --- |
| $R^2$ | 0,84 | — | 84% zmiennosci $y$ wyjasnione przez model |
| $t$ dla $\beta_1$ | 3,42 | 0,0012 | Istotny na poziomie $\alpha = 0,01$ |

### Implementacja w R
```r
model <- lm(y ~ x1 + x2, data = dane)
summary(model)
```

> Uwaga z wykladu: Prowadzacy wymaga podawania p-value do 4 miejsc po przecinku.
```

## 2. Podstawowa skladnia Markdown

- **Formatowanie tekstu**: `**pogrubienie**`, `*kursywa*`, `~~przekreslenie~~`, `` `kod w linii` ``
- **Cytat z wykladu**: `> Tresc waznej uwagi prowadzacego`
- **Listy zadan**:
  - [x] Przeliczyc zadanie 3 z listy
  - [ ] Sprawdzic zalozenie homoskedastycznosci

## 3. Matematyka LaTeX dla analityka (Wpisywac miedzy `$...$` lub `$$...$$`)

### Podstawowe operatory i relacje
- Ulamki: `\frac{a}{b}`
- Potegi i indeksy: `x_i^2`, `\beta_1`, `\mathbf{X}^T`, `\mathbf{A}^{-1}`
- Pierwiastki: `\sqrt{x}`, `\sqrt[n]{x}`
- Relacje: `\le, \ge, \neq, \approx, \sim`
- Mnozenie: `\cdot, \times`

### Greckie litery w statystyce i ekonometrii
- Parametry: `\alpha, \beta, \gamma, \delta, \varepsilon, \theta`
- Statystyka: `\mu, \sigma, \sigma^2, \lambda`
- Duze litery: `\Sigma, \Delta, \Omega`

### Sumy, calki i operatory
- Suma: `\sum_{i=1}^n x_i`
- Granica: `\lim_{n \to \infty} \frac{1}{n}`
- Calka: `\int_{-\infty}^{+\infty} f(x) \, dx = 1`
- Wartosc oczekiwana i wariancja: `\mathbb{E}(X), \operatorname{Var}(X), \operatorname{Cov}(X,Y)`

### Macierze i uklady rownan (Algebra i Badania Operacyjne)
- Macierz w nawiasach kwadratowych:
  `\begin{bmatrix} a & b \\ c & d \end{bmatrix}`
- Wyznacznik:
  `\det(\mathbf{A}) = \begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc`
- Uklad rownan lub ograniczenia:
  `\begin{cases} 2x_1 + 3x_2 \le 10 \\ x_1 - x_2 \ge 2 \end{cases}`

### Formatowanie blokow kodu
- Jezyk R: w naglowku bloku wpisz `r`
- Jezyk Python: w naglowku bloku wpisz `python`
- Jezyk SQL: w naglowku bloku wpisz `sql`
