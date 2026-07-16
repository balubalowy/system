@echo off
color 0B
echo Uruchamianie Local Agent Bridge...
powershell.exe -ExecutionPolicy Bypass -File "E:\antygravity\.private\sync_local.ps1"
echo Zmiany zrobione. Odpalam wypychanie na Github...
call "E:\antygravity\.private\push.bat"
pause
