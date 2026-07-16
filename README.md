# B-Core 

Własne środowisko z systemem nauki (węzły), planowania, notatek i zrzucania ciężaru myślenia o wszystkim, a skupieniu się na działaniu i konsekwencji.

## Po co?
Konsekwencja jako cel. Zamiast korzystać z dziesięciu rozrzuconych aplikacji i polegać na nieprzewidywalnej sile woli, całe zarządzanie czasem i nauką zostało skondensowane w tym jednym, zamkniętym ekosystemie. Aplikacja narzuca konkretny rygor pracy: nie pozwala na wrzucanie sobie na głowę miliona zadań, a zamiast tego wymusza 4 precyzyjne bloki dzienne (priorytet kognitywny, administracyjny, lekki i sensoryczny). Wykorzystuje również interaktywne Drzewo Wiedzy do śledzenia mikrokroków w nauce.

## Architektura i Technologia
Aplikacja została zbudowana na architekturze typu Serverless. Składa się z czystego (Vanilla) zestawu HTML, CSS i Javascriptu, co daje 100% kontroli nad elementami UI i ułamek sekundy na ładowanie poszczególnych widoków, bez grubych frameworków.

- **Frontend**: Automatyczny i elastyczny, gotowy do wrzucenia na dowolny hosting.
- **Backend**: Cały rdzeń logiki żyje w chmurze Google Firebase (Realtime Database), umożliwiając "autosave" każdego słowa wpisanego przez użytkownika.
