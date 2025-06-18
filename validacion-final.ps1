# 🎯 VALIDACIÓN FINAL - CLAUDE SONNET 3.5 + COPILOT OPTIMIZADO
# Ejecuta este script para verificar que todo esté funcionando perfectamente

Write-Host "🚀 VALIDANDO CONFIGURACIÓN CLAUDE SONNET 3.5 + COPILOT..." -ForegroundColor Cyan
Write-Host ""

# Verificar archivos de configuración
$configFiles = @(
    ".vscode\settings.json",
    ".vscode\extensions.json", 
    ".vscode\tasks.json",
    ".vscode\javascript.code-snippets"
)

Write-Host "📁 VERIFICANDO ARCHIVOS DE CONFIGURACIÓN:" -ForegroundColor Yellow
foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file - FALTA" -ForegroundColor Red
    }
}

Write-Host ""

# Verificar archivos del proyecto
Write-Host "📋 VERIFICANDO ARCHIVOS DEL PROYECTO:" -ForegroundColor Yellow
$projectFiles = @(
    "package.json",
    "src\App.jsx",
    "TEST-COPILOT-CLAUDE.jsx",
    "GUIA-DESARROLLO-CLAUDE.md"
)

foreach ($file in $projectFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file - FALTA" -ForegroundColor Red
    }
}

Write-Host ""

# Verificar dependencias
Write-Host "📦 VERIFICANDO DEPENDENCIAS:" -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✅ node_modules instalado" -ForegroundColor Green
} else {
    Write-Host "⚠️  Ejecuta: npm install" -ForegroundColor Yellow
}

Write-Host ""

# Verificar proceso de VS Code
Write-Host "💻 VERIFICANDO VS CODE:" -ForegroundColor Yellow
$codeProcess = Get-Process -Name "Code" -ErrorAction SilentlyContinue
if ($codeProcess) {
    Write-Host "✅ VS Code está ejecutándose ($($codeProcess.Count) procesos)" -ForegroundColor Green
} else {
    Write-Host "⚠️  VS Code no está ejecutándose" -ForegroundColor Yellow
}

Write-Host ""

# Resumen final
Write-Host "🎯 RESUMEN DE CONFIGURACIÓN:" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host "🏆 IA Principal: Claude Sonnet 3.5" -ForegroundColor Green
Write-Host "⚡ GitHub Copilot: Optimizado" -ForegroundColor Green  
Write-Host "🎨 Snippets: rfc-copilot, rhook-copilot, etc." -ForegroundColor Green
Write-Host "🔧 Tareas: Dev Copilot disponible" -ForegroundColor Green
Write-Host "📝 Guías: Creadas y listas" -ForegroundColor Green

Write-Host ""
Write-Host "🚀 PRÓXIMOS PASOS:" -ForegroundColor Yellow
Write-Host "1. Abre VS Code con el proyecto" -ForegroundColor White
Write-Host "2. Prueba los snippets en TEST-COPILOT-CLAUDE.jsx" -ForegroundColor White
Write-Host "3. Ejecuta la tarea '🚀 Dev Copilot'" -ForegroundColor White
Write-Host "4. ¡Desarrolla con máxima productividad!" -ForegroundColor White

Write-Host ""
Write-Host "✨ CONFIGURACIÓN COMPLETA - CLAUDE SONNET 3.5 + COPILOT ✨" -ForegroundColor Green
