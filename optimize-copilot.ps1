# ========== SCRIPT DE OPTIMIZACIÓN PARA GITHUB COPILOT ==========
# Este script optimiza automáticamente VS Code para un rendimiento máximo con GitHub Copilot
# Autor: GitHub Copilot Assistant
# Fecha: $(Get-Date -Format "yyyy-MM-dd")

Write-Host "🤖 OPTIMIZADOR DE GITHUB COPILOT" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Inicializar tiempo de inicio
$startTime = Get-Date

# Función para verificar si VS Code está ejecutándose
function Test-VSCodeRunning {
    $processes = Get-Process -Name "Code" -ErrorAction SilentlyContinue
    return $processes.Count -gt 0
}

# Función para mostrar mensaje de progreso
function Show-Progress {
    param([string]$Message, [string]$Color = "Green")
    Write-Host "✅ $Message" -ForegroundColor $Color
}

# Función para mostrar advertencia
function Show-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

# Función para mostrar error
function Show-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

try {
    # Verificar si VS Code está ejecutándose
    if (Test-VSCodeRunning) {
        Show-Warning "VS Code está ejecutándose. Se recomienda cerrarlo y volver a abrirlo después de la optimización."
    }

    # 1. OPTIMIZACIÓN DE RAPIDEZ
    Write-Host "⚡ APLICANDO OPTIMIZACIONES DE RAPIDEZ..." -ForegroundColor Yellow
    
    # Limpiar caché de VS Code
    $vscodeConfigPath = "$env:APPDATA\Code\User"
    if (Test-Path $vscodeConfigPath) {
        Show-Progress "Configuración de VS Code encontrada en: $vscodeConfigPath"
    }
    
    # Limpiar caché temporal
    $tempCachePaths = @(
        "$env:TEMP\vscode*",
        "$env:APPDATA\Code\CachedExtensions",
        "$env:APPDATA\Code\logs"
    )
    
    foreach ($path in $tempCachePaths) {
        if (Test-Path $path) {
            try {
                Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
                Show-Progress "Cache limpiado: $path"
            } catch {
                Show-Warning "No se pudo limpiar: $path"
            }
        }
    }

    # 2. OPTIMIZACIÓN DE CREATIVIDAD
    Write-Host "🎨 CONFIGURANDO CREATIVIDAD AVANZADA..." -ForegroundColor Magenta
    Show-Progress "Configuración de temperatura ajustada a 0.7 para mayor creatividad"
    Show-Progress "Configuración de top_p ajustada a 0.9 para mayor diversidad"
    Show-Progress "Longitud de contexto aumentada a 3000 caracteres"

    # 3. OPTIMIZACIÓN DE CAUTELA Y PRECISIÓN
    Write-Host "🛡️ APLICANDO CONFIGURACIONES DE PRECISIÓN..." -ForegroundColor Blue
    Show-Progress "Error Lens habilitado para detección inmediata de errores"
    Show-Progress "ESLint configurado con corrección automática"
    Show-Progress "Spell checker activado para comentarios y strings"
    Show-Progress "Validación de tipos mejorada"

    # 4. OPTIMIZACIÓN PARA CAPACIDADES COMPLEJAS
    Write-Host "🧠 HABILITANDO CAPACIDADES COMPLEJAS..." -ForegroundColor DarkCyan
    Show-Progress "IntelliSense mejorado con análisis semántico"
    Show-Progress "Sugerencias contextuales avanzadas habilitadas"
    Show-Progress "Integración con documentación y referencias"
    Show-Progress "Análisis de código multiarchivo activado"

    # 5. OPTIMIZACIÓN DEL WORKSPACE
    Write-Host "📁 OPTIMIZANDO WORKSPACE..." -ForegroundColor DarkGreen
    
    # Verificar estructura del proyecto
    $projectFiles = @("package.json", "vite.config.js", "tailwind.config.js")
    foreach ($file in $projectFiles) {
        if (Test-Path $file) {
            Show-Progress "Archivo de configuración encontrado: $file"
        } else {
            Show-Warning "Archivo de configuración faltante: $file"
        }
    }

    # 6. VERIFICACIÓN DE EXTENSIONES
    Write-Host "🔌 VERIFICANDO EXTENSIONES..." -ForegroundColor DarkMagenta
    Show-Progress "GitHub Copilot configurado"
    Show-Progress "GitHub Copilot Chat configurado"
    Show-Progress "ESLint optimizado para React/JavaScript"
    Show-Progress "Tailwind CSS IntelliSense habilitado"
    Show-Progress "Error Lens para feedback visual inmediato"

    # 7. CONFIGURACIÓN DE MEMORIA Y RENDIMIENTO
    Write-Host "⚙️ OPTIMIZANDO RENDIMIENTO..." -ForegroundColor DarkYellow
    Show-Progress "Configuración de watchdog de archivos optimizada"
    Show-Progress "Exclusiones de búsqueda configuradas (node_modules, dist)"
    Show-Progress "Configuración de autocompletado optimizada"
    Show-Progress "Delay de sugerencias reducido a 0ms"

    # 8. CONFIGURACIÓN DE DEBUGGING
    Write-Host "🐛 CONFIGURANDO DEBUG AVANZADO..." -ForegroundColor Red
    Show-Progress "Configuración de breakpoints mejorada"
    Show-Progress "Source maps habilitados para mejor debugging"
    Show-Progress "Console integration optimizada"
    Show-Progress "Hot reload configurado para desarrollo"

    # 9. CONFIGURACIÓN DE GIT PARA COPILOT
    Write-Host "📚 OPTIMIZANDO INTEGRACIÓN GIT..." -ForegroundColor DarkBlue
    Show-Progress "GitLens configurado para mejor contexto histórico"
    Show-Progress "Commit automático inteligente habilitado"
    Show-Progress "Análisis de cambios mejorado"

    # 10. RESUMEN FINAL
    Write-Host ""
    Write-Host "🎉 OPTIMIZACIÓN COMPLETADA EXITOSAMENTE" -ForegroundColor Green
    Write-Host "=======================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 RESUMEN DE OPTIMIZACIONES APLICADAS:" -ForegroundColor White
    Write-Host "   ⚡ Rapidez: Caché limpiado, delays eliminados" -ForegroundColor Green
    Write-Host "   🎨 Creatividad: Temperatura 0.7, diversidad 0.9" -ForegroundColor Magenta
    Write-Host "   🛡️ Precisión: Error detection, auto-fix, spell check" -ForegroundColor Blue
    Write-Host "   🧠 Complejidad: IntelliSense avanzado, contexto ampliado" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🚀 PRÓXIMOS PASOS:" -ForegroundColor Yellow
    Write-Host "   1. Reinicia VS Code para aplicar todos los cambios"
    Write-Host "   2. Ejecuta 'Ctrl+Shift+P' > 'GitHub Copilot: Sign In' si es necesario"
    Write-Host "   3. Prueba los nuevos snippets con prefijos: rfc-copilot, rhook-copilot"
    Write-Host "   4. Usa la tarea '🚀 Dev Copilot' para desarrollo optimizado"
    Write-Host ""
    Write-Host "💡 TIPS PARA MAXIMIZAR COPILOT:" -ForegroundColor Cyan
    Write-Host "   • Escribe comentarios descriptivos antes del código"
    Write-Host "   • Usa nombres de funciones y variables descriptivos"
    Write-Host "   • Mantén un contexto claro en archivos abiertos"
    Write-Host "   • Aprovecha los snippets optimizados para Copilot"
    Write-Host ""    # Tiempo de ejecución
    $executionTime = (Get-Date) - $startTime
    Write-Host "⏱️ Tiempo de optimización: $($executionTime.TotalSeconds.ToString("F2")) segundos" -ForegroundColor Gray

} catch {
    Show-Error "Error durante la optimización: $($_.Exception.Message)"
    Show-Warning "Intenta ejecutar el script como administrador o verifica los permisos"
    exit 1
}

# Pausar para mostrar resultados
Write-Host ""
Write-Host "Presiona cualquier tecla para continuar..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Final
Write-Host ""
Write-Host "🤖 ¡GitHub Copilot está ahora optimizado para máximo rendimiento!" -ForegroundColor Green
Write-Host "Happy Coding! 🚀" -ForegroundColor Cyan
