# Instala en VS Code todas las extensiones recomendadas en .vscode/extensions.json
# Uso: npm run setup:vscode   (o powershell -ExecutionPolicy Bypass -File scripts/setup-vscode.ps1)
$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")

if (-not (Get-Command code -ErrorAction SilentlyContinue)) {
  Write-Host "❌ No se encontró el comando 'code'. Reinstala VS Code marcando 'Add to PATH' o agrégalo manualmente."
  exit 1
}

$raw = Get-Content ".vscode/extensions.json" -Raw
$raw = [regex]::Replace($raw, '//.*', '')
$block = [regex]::Match($raw, '"recommendations"\s*:\s*\[(.*?)\]', 'Singleline').Groups[1].Value
$extensions = [regex]::Matches($block, '"([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)"') | ForEach-Object { $_.Groups[1].Value }

Write-Host "📦 Instalando extensiones recomendadas..."
foreach ($ext in $extensions) {
  code --install-extension $ext --force
}

Write-Host "✅ Listo. Recarga VS Code (Ctrl+Shift+P → 'Developer: Reload Window')."
