@echo off
color 0B
echo Uruchamianie Local Agent Bridge...
powershell.exe -ExecutionPolicy Bypass -File "E:\antygravity\sync_local.ps1"
echo Zmiany zrobione. Odpalam wypychanie na Github...
call "E:\antygravity\push.bat"
pause
