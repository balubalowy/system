# Local Agent Bridge
# Skrypt stworzony dla Bartka do ladowania statystyk plikow lokalnych z OneDrive do WebApp'a B-Core.
$ErrorActionPreference = "Stop"

$appDataPath = "E:\antygravity\app\js\local_data.js"
$onedrivePath = "C:\Users\baluk\OneDrive - Uniwersytet Ekonomiczny we Wrocławiu\hanuenane cz. 3"

Write-Host "Rozpoczynam zwiad plikowy Local Agent Bridge..." -ForegroundColor Cyan

$photosPath = Join-Path $onedrivePath "Fotografie"
$excelPath = Join-Path $onedrivePath "Modele Excel"
$stormsPath = Join-Path $onedrivePath "Pamietnik Burz"

$photosCount = 0
$excelCount = 0

if (Test-Path $photosPath) {
    $photosCount = (Get-ChildItem -Path $photosPath -Recurse -File).Count
    Write-Host "Naliczono zdjec: $photosCount" -ForegroundColor Green
} else {
    Write-Host "Folder Fotografie nie zostal znaleziony." -ForegroundColor Yellow
}

if (Test-Path $excelPath) {
    $excelCount = (Get-ChildItem -Path $excelPath -Recurse -File).Count
    Write-Host "Naliczono modeli Excel: $excelCount" -ForegroundColor Green
} else {
    Write-Host "Folder Modele Excel nie zostal znaleziony." -ForegroundColor Yellow
}

$stormsCount = 0
if (Test-Path $stormsPath) {
    $stormsCount = (Get-ChildItem -Path $stormsPath -Recurse -File).Count
    Write-Host "Naliczono pamietnikow burz: $stormsCount" -ForegroundColor Green
} else {
    Write-Host "Folder Pamietnik Burz nie zostal znaleziony." -ForegroundColor Yellow
}

$jsContent = "window.localAgentStats = { photos: $photosCount, excels: $excelCount, storms: $stormsCount, lastSync: '$(Get-Date -Format "yyyy-MM-dd HH:mm")' };"
Set-Content -Path $appDataPath -Value $jsContent -Encoding UTF8

Write-Host "Zapisano dane do local_data.js. Gotowe do wysylki Git Push." -ForegroundColor Cyan
Start-Sleep -Seconds 3
