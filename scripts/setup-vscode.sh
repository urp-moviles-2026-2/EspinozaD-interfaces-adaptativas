#!/usr/bin/env bash
# Instala en VS Code todas las extensiones recomendadas en .vscode/extensions.json
# Uso: npm run setup:vscode   (o bash scripts/setup-vscode.sh)
set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v code >/dev/null 2>&1; then
  echo "❌ No se encontró el comando 'code'."
  echo "   En VS Code: Cmd/Ctrl+Shift+P → \"Shell Command: Install 'code' command in PATH\" y vuelve a intentar."
  exit 1
fi

# Extrae los ids del JSON ignorando comentarios // y líneas sin "publisher.nombre"
EXTENSIONS=$(sed 's#//.*##' .vscode/extensions.json \
  | tr -d '\r' \
  | sed -n '/"recommendations"/,/\]/p' \
  | grep -oE '"[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+"' \
  | tr -d '"')

echo "📦 Instalando extensiones recomendadas..."
for ext in $EXTENSIONS; do
  code --install-extension "$ext" --force
done

echo "✅ Listo. Recarga VS Code (Cmd/Ctrl+Shift+P → \"Developer: Reload Window\")."
