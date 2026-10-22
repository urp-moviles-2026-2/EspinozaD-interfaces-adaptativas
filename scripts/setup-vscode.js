#!/usr/bin/env node
// Lanza el instalador de extensiones según el sistema operativo.
// Uso: npm run setup:vscode
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const isWindows = process.platform === "win32";
const script = path.join(__dirname, isWindows ? "setup-vscode.ps1" : "setup-vscode.sh");
const cmd = isWindows ? "powershell" : "bash";
const args = isWindows ? ["-ExecutionPolicy", "Bypass", "-File", script] : [script];

const result = spawnSync(cmd, args, { stdio: "inherit" });
process.exit(result.status ?? 1);
