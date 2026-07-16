# Local Agent Bridge
# Skrypt stworzony dla Bartka do ladowania statystyk plikow lokalnych z OneDrive do WebApp'a B-Core.
$ErrorActionPreference = "Stop"

$appDataPath = "E:\antygravity\app\js\local_data.js"
$onedrivePath = "C:\Users\baluk\OneDrive - Uniwersytet Ekonomiczny we Wrocławiu\hanuenane cz. 3"

Write-Host "Rozpoczynam zwiad plikowy Local Agent Bridge..." -ForegroundColor Cyan

$photosPath = Join-Path $onedrivePath "[-] FOTOGRAFIE"
$excelPath = Join-Path $onedrivePath "[-] MODEL EXCEL"
$stormsPath = Join-Path $onedrivePath "[-] APLIKACJE PYTHON"

$photosCount = 0
$excelCount = 0

if (Test-Path -LiteralPath $photosPath) {
    $photosCount = (Get-ChildItem -LiteralPath $photosPath -Recurse -File).Count
    Write-Host "Naliczono zdjec: $photosCount" -ForegroundColor Green
} else {
    Write-Host "Folder Fotografie nie zostal znaleziony." -ForegroundColor Yellow
}

if (Test-Path -LiteralPath $excelPath) {
    $excelCount = (Get-ChildItem -LiteralPath $excelPath -Recurse -File).Count
    Write-Host "Naliczono modeli Excel: $excelCount" -ForegroundColor Green
} else {
    Write-Host "Folder Modele Excel nie zostal znaleziony." -ForegroundColor Yellow
}

$stormsCount = 0
if (Test-Path -LiteralPath $stormsPath) {
    $stormsCount = (Get-ChildItem -LiteralPath $stormsPath -Recurse -File).Count
    Write-Host "Naliczono aplikacji python: $stormsCount" -ForegroundColor Green
} else {
    Write-Host "Folder Aplikacje Python nie zostal znaleziony." -ForegroundColor Yellow
}

$jsContent = "window.localAgentStats = { photos: $photosCount, excels: $excelCount, storms: $stormsCount, lastSync: '$(Get-Date -Format "yyyy-MM-dd HH:mm")' };"
Set-Content -Path $appDataPath -Value $jsContent -Encoding UTF8

Write-Host "Zapisano dane do local_data.js. Gotowe do wysylki Git Push." -ForegroundColor Cyan
Start-Sleep -Seconds 3
