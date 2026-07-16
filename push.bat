@echo off
echo =======================================
echo     Wysylanie Zmian do Chmury (GitHub)...
echo =======================================
git add .
git commit -m "Aktualizacja z dysku"
git push origin main -f
echo =======================================
echo     GOTOWE. Nowy kod jest online.
echo =======================================
pause
