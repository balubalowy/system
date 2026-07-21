# B-Core 🧠 (Osobisty System Produktywności)

<p align="left">
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript">
  <img src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=flat&logo=firebase" alt="Firebase">
  <img src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=flat&logo=githubactions&logoColor=white" alt="GitHub Actions">
  <img src="https://img.shields.io/badge/Google%20Analytics-%23E37400.svg?style=flat&logo=google-analytics&logoColor=white" alt="Google Analytics">
  <img src="https://img.shields.io/badge/Markdown-%23000000.svg?style=flat&logo=markdown&logoColor=white" alt="Markdown">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white" alt="Python">
</p>

Witaj w centralnym repozytorium **B-Core** – mojego własnego, mocno przebudowanego systemu produktywności. Całość postawiłem na darmowej architekturze Serverless. Aplikacja hula jako PWA (Progressive Web App) prosto z GitHub Pages. Podeszłem do tematu tak, żeby nie płacić za hosting, więc dane lecą przez Firebase, a zadania i powiadomienia odpalam darmowym "backendem" zrobionym na GitHub Actions.

### W czym to napisałem? (Stos Technologiczny)
* **HTML5 / CSS3 / JavaScript (Vanilla):** Cały front-end aplikacji naklepałem z palca. Zdecydowałem się na czysty kod (olałem frameworki typu React czy Vue), bo chciałem zobaczyć, jak szybko to może śmigać na słabszych telefonach. Szczerze? Ładuje się w ułamek sekundy.
* **Firebase (Realtime DB, Auth, Cloud Messaging):** Szybka baza NoSQL, która magazynuje moje całe cyfrowe życie. Oprócz logowania, ogarnia też wypluwanie powiadomień Push (FCM). Działa. Chociaż 14 kwietnia spędziłem bite 6 godzin szukając dlaczego tokeny na iOS nagle wyparowały...
* **GitHub Actions & Node.js:** Mój "backend z odzysku". Node'owe skrypty budzą się na maszynach GitHuba przez crona, skanują co mam do zrobienia w bazie i szturchają mój telefon powiadomieniem.
* **Python:** Lokalny rębajło. Skrypt `sync.bat` wywołuje kod w Pythonie, który brutalnie rozpruwa gigantyczne pliki XLSX, odcedza z nich śmieci i pakuje czysty JSON prosto do `local_data.js`. Magia.
* **Markdown:** Wiadomo, do renderowania notatek, żeby jakoś to wyglądało bez wciskania setki przycisków formatowania (przy okazji, tabelki w markdownie czasami mnie wykańczają).
* **Google Analytics:** Wpięte do kilku głównych widoków. Muszę przecież wiedzieć, ile godzin marnuję gapiąc się w pulpit zamiast po prostu odhaczyć zadanie.

## 👀 Rzut oka na interfejs

**Wersja Desktopowa (PC)**
<p align="center">
  <img src="docs/desktop_1.png" width="800" alt="Pulpit Główny">
</p>
<p align="center">
  <img src="docs/desktop_2.png" width="49%" alt="Widok">
  <img src="docs/desktop_3.png" width="49%" alt="Widok">
</p>

**Wersja Mobilna (PWA / Smartfon)**
<p align="center">
  <img src="docs/mobile_1.jpg" width="300" alt="Widok Mobilny 1">
  &nbsp;&nbsp;&nbsp;
  <img src="docs/mobile_2.jpg" width="300" alt="Widok Mobilny 2">
</p>

Osobiście wciąż mam ochotę wywalić ten ciemny pasek boczny z wersji desktopowej, bo trochę gryzie mi się z resztą "glassmorphismu". Ale na razie nie mam wizji czym to zastąpić, więc... zostaje.

## 🏗️ Architektura Systemu

Cały ten bałagan kręci się wokół takich kawałków:
1. **Frontend (PWA):** Zwykły Vanilla JS. Żadnej magii. Dzięki Service Workerowi śmiga offline, a na telefonie zachowuje się jak natywna apka. (Choć przyznaję, agresywne cache'owanie czasami psuje mi krew po deployu).
2. **Baza Danych (Firebase Realtime Database):** Moja centrala.
3. **Backend / Cron (GitHub Actions):** Odpalane parę razy dziennie skrypty Node.js. Wsysają dane z bazy i uderzają w API FCM, żeby wybudzić telefon. Skuteczne.

### Schemat Przepływu Danych

```mermaid
graph TD
    subgraph "Urządzenia Użytkownika (PWA)"
        PC["Przeglądarka PC"]
        Mobile["iPhone / Safari"]
        SW["Service Worker (sw.js)"]
        PC <-->|Zapis/Odczyt| FB[("Firebase DB")]
        Mobile <-->|Zapis/Odczyt| FB
        PC -->|Generuje FCM Token| FB
        Mobile -->|Generuje FCM Token| FB
    end

    subgraph "Chmura Google (Firebase)"
        FB
        FCM(("Firebase Cloud Messaging"))
    end

    subgraph "Backend (GitHub Actions)"
        GH_CRON{"Cron 5:00, 11:00, 17:00"}
        NODE["Node.js Script"]
        GH_CRON --> NODE
        NODE -->|Pobiera Zadania i Tokeny| FB
        NODE -->|Wysyła Payload Push| FCM
    end

    FCM -->|Powiadomienie| SW
    SW -.->|Wyświetla Alert| Mobile
    SW -.->|Wyświetla Alert| PC
```

---

## 🚀 Instalacja i Konfiguracja (Self-Hosted)
Zlepiłem to wyłącznie dla siebie (reguły bezpieczeństwa Firebase z automatu blokują obcych). Ale jak koniecznie chcesz to postawić u siebie:
1. Sklonuj to repo.
2. Odpal nowy projekt w [Firebase](https://firebase.google.com/) i włącz Realtime Database + Authentication (Email/Password).
3. Wyciągnij klucze konfiguracyjne ze swojej bazy i podmień je w pliku `/app/js/firebase.js`.
4. Wygeneruj klucze VAPID (do notyfikacji Push). Wrzuć je do `notifications.js`.
5. Dodaj sekrety z Firebase (Service Account Key) w ustawieniach repo na GitHubie, żeby Actions mogły się autoryzować.

---

## 📁 Struktura Katalogów i Plików

Całe serce apki gnije w folderze `/app`. Z root-a masz tylko redirect z `index.html`.

### 📂 /.github
Devopsowe klamoty.
* `workflows/notify.yml`
* `scripts/check-and-notify.js` – Skrypt w Node.js ładujący `firebase-admin`. Wyławia z bazy tokeny telefonów i ciska w nie payloadem powiadomień. 

### 📂 /.private
Lokalne brudy, których nie wypycham do GitHuba ze względów oczywistych.
* `sync.bat` – Zmora moich wieczorów. Ten windowsowy skrypt notorycznie sypie się przy najmniejszej zmianie ścieżek na moim dysku. Nadal nie napisałem do tego solidnego path-resolvera, więc jak coś zmieniam w systemie, muszę edytować ten plik z palca. Po prostu wybudza Pythona i doi Excela.

### 📂 /app
Tutaj leży kod frontendu.
* `manifest.json` – Plik konfiguracyjny dla PWA (kolorki, ikony, nazwa). 
* `sw.js` – Service Worker przechwytujący push. Nienawidzę debugować tego pliku (wymusza https w środowisku testowym!).
* **Widoki HTML:**
  * `login.html` – Bramka wejściowa.
  * `index.html` – Złożony pulpit główny naszpikowany widgetami.
  * `inbox.html` (tu zrzucam absolutnie wszystko, co wpadnie mi do głowy)
  * `budget.html` – Kasa, wydatki i subkonta.
  * `knowledge.html`

### 📂 /app/css
* `styles.css` – Jeden, chamsko wielki plik ze stylami CSS. Zamiast bawić się w podział na dziesiątki małych plików, wrzuciłem wszystko do jednego worka ze zmiennymi pod Dark Mode i układ flexboxa. Działa? Działa.

### 📂 /app/js (Logika Aplikacji)
Żeby to w ogóle dało się utrzymać, pociąłem kod na moduły ES6. 

#### ⚙️ Konfiguracja i Narzędzia
* `firebase.js` – Punkt wejścia do bazy. Po co coś więcej? Sprawdza też, czy logujesz się uprawnionym mailem.
* `global.js` – Inicjalizuje statystyki w nagłówkach. Wczytywany wszędzie.
* `local_data.js` – Zrzut jsonów wygenerowanych przez ten felerny `sync.bat`. Wystarczy banalny obiekt ze zmiennymi do natychmiastowego odczytu. Kto by chciał tracić czas na asynchroniczne fetchowanie lokalnych danych?
* `utils.js` – Duperelki typu formatowanie dat i escapeHTML.
* `data.js`

#### 🔔 Powiadomienia i Ustawienia
* `notifications.js` – Pobiera klucz dla danego urządzenia pod FCM.
* `settings.js` – Po co cała podstrona, skoro wystarczy pływający modal z opcjami? Tutaj zmieniasz VAPID.

#### 🖥️ Pulpit Główny (`index.html`)
* `main.js`
* `dashboard.js`
* `calendar.js` – Najbardziej znienawidzony kawałek kodu w tym projekcie. Ręcznie rysuje oś czasu 7 dni w tygodniu i mapuje bloki z zadaniami z Firebase'a na precyzyjne kratki z pikselami. Myślałem, że osiwieję przy przeliczaniu stref czasowych...
* `charts.js` – Import Chart.js do malowania poziomu energii.
* `routines.js` – Odhaczanie porannych i wieczornych rytuałów.
* Czy mamy tu coś do blokowania ekranu? Tak, `timers.js` dusi wszystko inne trybem skupienia (Pomodoro).

#### 📥 Zrzutnia (`inbox.html`)
* `inbox.js`
* `tasks.js` – Klasyczny CRUD.
* `ideas.js` – Miejsce na te genialne pomysły o 3 w nocy, z których rano i tak nic nie wynika.

#### 💰 Finanse (`budget.html`)
* `budget.js` – Dodawanie i odejmowanie dla kategorii wydatków. Nic nadzwyczajnego. Podstawa matematyki.

#### 🧠 Baza Wiedzy (`knowledge.html`)
* `knowledge.js` – Zlepiłem to na kształt drzewka skilli z RPG-ów. 
* `knowledge-modal.js`
* `srs.js` – System powtórek przestrzennych dla fiszek.

#### 📐 Layout i Interfejs
* `layout.js` – Odpowiada za chowanie i pokazywanie kontenerów na małych ekranach.
* `sidebar.js` – Wpycha widgety burzowe do lewego navbara.

---

## 🔒 Zabezpieczenia i Prawa Autorskie
System skroiłem centralnie pod siebie. W regułach Firebase ordynarnie uciąłem dostęp do ścieżki `/users/` dla jakichkolwiek maili oprócz mojego.

---

## 🛠️ Dostosowanie i Development

Jakbyś chciał pobawić się tym kodem u siebie:
* **Motyw i kolory:** Zmienne `--accent-primary` itd. wiszą u góry `/app/css/styles.css`.
* **Dane statyczne / Nazewnictwo:** Zwykły hardkod w `index.html` oraz `sidebar.js`. Nie ma sensu tego pchać do bazy.
* **Powiadomienia Push:** `.github/scripts/check-and-notify.js`.
* **Skrypt (`sync.bat`):** Pamiętaj zaktualizować na swoje ścieżki (C:\Users\...). Inaczej posypią się błędy.
