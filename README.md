# B-Core 🧠 (Osobisty System Produktywności)

Witaj w centralnym repozytorium **B-Core** – zaawansowanego, osobistego systemu produktywności stworzonego na architekturze Serverless. System działa jako aplikacja PWA (Progressive Web App) w 100% hostowana na GitHub Pages, komunikująca się z bazą danych Firebase oraz wykorzystująca GitHub Actions jako darmowy "backend" do automatyzacji zadań i powiadomień.

## 🏗️ Architektura Systemu

System składa się z trzech głównych filarów:
1. **Frontend (PWA):** Zbudowany w czystym HTML/CSS/JS (Vanilla JS). Szybki, lekki, działający offline, instalowalny na komputerach (Windows/Mac) i telefonach (iOS/Android).
2. **Baza Danych (Firebase Realtime Database):** Autoryzacja i przechowywanie danych w chmurze w czasie rzeczywistym.
3. **Backend / Cron (GitHub Actions):** Odpalane cyklicznie skrypty Node.js, które sprawdzają bazę danych i wysyłają powiadomienia Push bezpośrednio na urządzenia użytkownika.

### Schemat Przepływu Danych

```mermaid
graph TD
    subgraph "Urządzenia Użytkownika (PWA)"
        PC[Przeglądarka PC]
        Mobile[iPhone / Safari]
        SW[Service Worker (sw.js)]
        PC <-->|Zapis/Odczyt| FB[(Firebase DB)]
        Mobile <-->|Zapis/Odczyt| FB
        PC -->|Generuje FCM Token| FB
        Mobile -->|Generuje FCM Token| FB
    end

    subgraph "Chmura Google (Firebase)"
        FB
        FCM((Firebase Cloud Messaging))
    end

    subgraph "Backend (GitHub Actions)"
        GH_CRON{Cron 5:00, 11:00, 17:00}
        NODE[Node.js Script]
        GH_CRON --> NODE
        NODE -->|Pobiera Zadania i Tokeny| FB
        NODE -->|Wysyła Payload Push| FCM
    end

    FCM -->|Powiadomienie| SW
    SW -.->|Wyświetla Alert| Mobile
    SW -.->|Wyświetla Alert| PC
```

---

## 📁 Struktura Katalogów i Plików

Główna aplikacja znajduje się w folderze `/app`. Korzeń projektu (root) przekierowuje użytkownika bezpośrednio do aplikacji przez prosty plik `index.html`.

### 📂 /.github
Katalog obsługujący automatyzację backendową.
* `workflows/notify.yml` – Plik konfiguracyjny Crona uruchamiający skrypt 3 razy dziennie.
* `scripts/check-and-notify.js` – Skrypt w Node.js używający paczki `firebase-admin`. Pobiera zapisane tokeny FCM, analizuje zaległe zadania i wydatki, po czym wysyła komunikaty (Payload) Push w świat.

### 📂 /app
Główny folder z widokami aplikacji PWA.
* `manifest.json` – Manifest PWA. Odpowiada za kolorystykę, nazwę i instalowalność aplikacji na smartfonach. Posiada specjalne parametry omijające cache na GitHub Pages.
* `sw.js` – Service Worker. Serce powiadomień Push i obsługi PWA na urządzeniu. Działa w tle (nawet gdy apka jest wyłączona), przechwytuje alerty z FCM i wyświetla je jako natywne powiadomienia systemowe.
* **Widoki HTML:**
  * `login.html` – Ekran autoryzacji (Firebase Auth).
  * `index.html` – Główny pulpit (Dashboard) z widgetami (Nawyki, Kalendarz, Szybkie Notatki).
  * `inbox.html` – Zrzutnia Zadań. Priorytetyzacja i rozdzielanie zadań na kategorie.
  * `budget.html` – Budżet, subkonta, subskrypcje i zbliżające się wydatki.
  * `knowledge.html` – Baza Wiedzy (katalog artykułów, filmów i książek).

### 📂 /app/css
* `styles.css` – Główny i jedyny plik stylów. Wykorzystuje zmienne CSS dla ułatwienia zmian motywu (Dark Mode), responsywność w oparciu o Flexbox/Grid i nowoczesny "glassmorphism".

### 📂 /app/js
Rozbicie logiki na moduły (Moduły ES6). Wszystko importowane i spinane ze sobą w zależności od widoku.
* `firebase.js` – Konfiguracja połączenia z Firebase. Inicjuje instancję `db` oraz `auth`, z których korzystają pozostałe skrypty. Definiuje też "Auth Guard" (wyrzuca niezalogowanych do `login.html`).
* `global.js` – Skrypt ładowany na KAŻDEJ stronie. Spina globalne elementy UI (topbar, sidebar) oraz odpala moduły ustawień i powiadomień.
* `notifications.js` – Front-endowy klient powiadomień. Rejestruje Service Workera, generuje unikalny token FCM i zapisuje go w Firebase. Obsługuje też odbieranie powiadomień w trybie pierwszoplanowym.
* `settings.js` – Dynamiczny modal ustawień. Zarządza parametrami użytkownika (czas przypomnień, klucz VAPID) i komunikuje się z `notifications.js` przy nadawaniu uprawnień (Przycisk "Włącz powiadomienia").
* `utils.js` – Narzędzia pomocnicze (np. `escapeHTML`, generowanie UUID), zapobiegające m.in. atakom XSS.
* **Logika Domenowa (Widoki):**
  * `dashboard.js`, `main.js`, `routines.js`, `timers.js` – Odpowiadają za funkcje Pulpitu (rutyny, timery, podsumowania).
  * `inbox.js`, `tasks.js`, `ideas.js` – Logika Zrzutni (zarządzanie zadaniami, odhaczanie, ładowanie z Firebase).
  * `budget.js` – Rozbudowana logika modułu finansowego (obliczanie podsumowań, zysków/strat, zarządzanie subkontami, cykliczne wydatki).
  * `knowledge.js`, `knowledge-modal.js` – Zarządzanie kartami w Bazie Wiedzy.
  * `calendar.js` – Moduł obsługujący pełny, autorski widok kalendarza w Pulpicie.
  * `sidebar.js`, `layout.js` – Zarządzanie animacjami, wysuwaniem menu na mobile, itp.

---

## 🔒 Zabezpieczenia i Prawa Autorskie
System został zaprojektowany z myślą o jednoosobowym użytku (jedno autoryzowane konto w bazie). Ze względu na to, reguły bazy danych w Firebase ukrywają całe drzewo `/users/` dla osób niezalogowanych, a logowanie przyjmuje tylko specyficzne (zakodowane w regułach) maile.

---

## 🛠️ Personalizacja i Edycja Plików w Visual Studio

B-Core został stworzony tak, abyś mógł łatwo zmieniać jego wygląd i teksty bezpośrednio w **Visual Studio Code**. Poniżej znajdziesz krótką ściągawkę, gdzie szukać poszczególnych elementów, jeśli zechcesz zmienić nazwy, układ lub kolory:

1. **Główny Wygląd i Kolory (`/app/css/styles.css`)**
   - Na samej górze tego pliku znajdziesz tzw. "Zmienne CSS" (sekcja `:root`). Możesz w nich bezpiecznie zmieniać dowolne kolory akcentów (np. `--accent-primary`), kolory tła w trybie ciemnym, a także zaokrąglenia i marginesy. Zmiana w tym jednym pliku wpływa na całą aplikację!
2. **Teksty i Układ na Pulpicie (`/app/index.html` oraz inne pliki .html)**
   - Jeśli chcesz zmienić nagłówki, podpisy, opisy widżetów (np. nazwać sekcję "Rozkład Czasu" inaczej, albo edytować układ kart takich jak "Edukacja"), otwórz plik HTML, wciśnij `Ctrl+F`, wyszukaj obecny tekst (np. "Analityka i Postęp") i po prostu go podmień na inny.
3. **Lewy Pasek Boczny (Menu, Pamiętnik Burz i Statystyki)**
   - Menu boczne wczytuje się wszędzie tak samo ze względu na to, że jest skryptem. Znajdziesz go w `/app/js/sidebar.js`. Tam łatwo zmienisz nazwy zakładek (Wiedza, Budżet, Pulpit) oraz etykiety w widżetach takich jak "Pamiętnik Burz" czy "Pamięć Lokalna".
4. **Logika i Treść Powiadomień na Telefon**
   - Automatyczny system powiadomień w tle działa na GitHubie, a jego mózg to plik `.github/scripts/check-and-notify.js`. Znajdziesz tam teksty (Tytuł i Body) wysyłane jako przypomnienia, które możesz dowolnie edytować.
5. **Skrypt zbierający statystyki (`.private/sync.bat`)**
   - Ten plik uruchamiasz lokalnie na komputerze. Skrypt zczytuje dane z Twoich plików Excel i katalogów. Jeśli zmienisz kiedyś nazwy plików Excela (np. "Pamiętnik Burz"), pamiętaj aby zaktualizować ich szukaną nazwę w tym pliku.

*Pamiętaj, że po zapisaniu modyfikacji w plikach (`Ctrl+S`), zmiany będą widoczne po ich wypchnięciu do chmury (tzw. Deploy).*
