#!/usr/bin/env node

/**
 * copilot-perfect-config.cjs - Script profesional de validación y configuración Copilot 100/100
 * =================================================================================================
 * Valida la configuración profesional del proyecto y de GitHub Copilot para entornos de desarrollo Axon.App.
 *
 * Características:
 * - Validación de archivos y configuraciones críticas
 * - Reporte de errores, advertencias y éxitos
 * - Configuración automática de Git profesional
 * - Compatible con Node.js y ESLint
 *
 * @author Axon.app Team
 * @version 2.4.0
 */

const fs = require('fs');
const path = require('path');

class CopilotConfigValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.success = [];
    }

    /**
     * Loguea mensajes con prefijos y timestamp
     * @param {string} message
     * @param {string} type - info, success, warning, error
     */
    log(message, type = 'info') {
        const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
        const prefix = {
            error: '❌',
            warning: '⚠️',
            success: '✅',
            info: '🔍'
        }[type];
        process.stdout.write(`[${timestamp}] ${prefix} ${message}\n`);
    }

    /**
     * Valida existencia de archivo
     */
    validateFileExists(filePath, description) {
        if (fs.existsSync(filePath)) {
            this.success.push(`${description} encontrado`);
            this.log(`${description} encontrado`, 'success');
            return true;
        } else {
            this.errors.push(`${description} no encontrado: ${filePath}`);
            this.log(`${description} no encontrado: ${filePath}`, 'error');
            return false;
        }
    }

    /**
     * Valida que un archivo sea JSON válido
     */
    validateJSONFile(filePath, description) {
        if (!this.validateFileExists(filePath, description)) {
            return false;
        }
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            // Remover comentarios para validación JSON
            const cleanContent = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
            JSON.parse(cleanContent);
            this.log(`${description} válido`, 'success');
            return true;
        } catch (error) {
            this.errors.push(`${description} JSON inválido: ${error.message}`);
            this.log(`${description} JSON inválido: ${error.message}`, 'error');
            return false;
        }
    }

    /**
     * Valida settings críticos de VS Code
     */
    validateVSCodeSettings() {
        const settingsPath = '.vscode/settings.json';
        if (!this.validateJSONFile(settingsPath, 'VS Code settings')) {
            return false;
        }
        const settings = JSON.parse(
            fs.readFileSync(settingsPath, 'utf8')
                .replace(/\/\/.*$/gm, '')
                .replace(/\/\*[\s\S]*?\*\//g, '')
        );
        const criticalSettings = {
            'github.copilot.enable': { type: 'object', description: 'Copilot habilitado' },
            'editor.inlineSuggest.enabled': { type: 'boolean', value: true, description: 'Sugerencias inline' },
            'editor.formatOnSave': { type: 'boolean', value: false, description: 'Formateo manual' },
            'files.autoSave': { type: 'string', value: 'onFocusChange', description: 'Autoguardado controlado' }
        };
        let allValid = true;
        Object.entries(criticalSettings).forEach(([key, config]) => {
            const value = this.getNestedValue(settings, key);
            const isValid = config.value !== undefined
                ? value === config.value
                : typeof value === config.type;
            if (isValid) {
                this.log(`${config.description}: ✓`, 'success');
            } else {
                this.log(`${config.description}: ✗ (${value})`, 'error');
                allValid = false;
            }
        });
        return allValid;
    }

    /**
     * Obtiene valor anidado por path (dot notation)
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    /**
     * Valida la estructura y configuración del proyecto
     */
    validateProject() {
        this.log('Iniciando validación completa del proyecto', 'info');
        // Validar estructura del proyecto
        const requiredFiles = [
            { path: 'package.json', desc: 'Package.json' },
            { path: '.vscode/settings.json', desc: 'Configuración VS Code' },
            { path: '.vscode/extensions.json', desc: 'Extensiones VS Code' },
            { path: '.gitignore', desc: 'Git ignore' }
        ];
        requiredFiles.forEach(file => {
            this.validateFileExists(file.path, file.desc);
        });
        // Validar configuraciones JSON
        this.validateVSCodeSettings();
        this.validateJSONFile('.vscode/extensions.json', 'Extensiones');
        // Validar archivos de configuración profesional
        const professionalFiles = [
            '.gitconfig-professional',
            '.gitmessage',
            'COPILOT-100-PERFECTO.md'
        ];
        professionalFiles.forEach(file => {
            this.validateFileExists(file, `Archivo profesional: ${file}`);
        });
        return this.generateReport();
    }

    /**
     * Genera reporte de validación y puntaje
     */
    generateReport() {
        this.log('\n=== REPORTE DE VALIDACIÓN ===', 'info');
        this.log(`✅ Éxitos: ${this.success.length}`, 'success');
        this.log(`⚠️  Advertencias: ${this.warnings.length}`, 'warning');
        this.log(`❌ Errores: ${this.errors.length}`, 'error');
        const score = Math.round((this.success.length / (this.success.length + this.errors.length)) * 100);
        this.log(`\n🎯 PUNTUACIÓN: ${score}/100`, score === 100 ? 'success' : 'warning');
        if (score === 100) {
            this.log('🏆 CONFIGURACIÓN PERFECTA ALCANZADA', 'success');
        } else {
            this.log(`🔧 ${this.errors.length} correcciones necesarias para 100/100`, 'warning');
        }
        return score === 100;
    }
}

/**
 * Configura Git profesionalmente para el proyecto
 */
function setupGitConfig() {
    const validator = new CopilotConfigValidator();
    try {
        const { execSync } = require('child_process');
        validator.log('Configurando Git profesional...', 'info');
        execSync('git config --local include.path ../.gitconfig-professional', { stdio: 'inherit' });
        execSync('git config --local commit.template .gitmessage', { stdio: 'inherit' });
        validator.log('Git configurado correctamente', 'success');
        return true;
    } catch (error) {
        validator.log(`Error configurando Git: ${error.message}`, 'error');
        return false;
    }
}

/**
 * Función principal de ejecución del script
 */
function main() {
    const validator = new CopilotConfigValidator();
    validator.log('🚀 CONFIGURACIÓN PROFESIONAL GITHUB COPILOT 100/100', 'info');
    validator.log('Iniciando proceso de validación completa...', 'info');
    // Verificar que estamos en el directorio correcto
    if (!fs.existsSync('package.json')) {
        validator.log('Error: Ejecutar desde la raíz del proyecto', 'error');
        process.exit(1);
    }
    // Configurar Git
    setupGitConfig();
    // Validar toda la configuración
    const isPerfect = validator.validateProject();
    if (isPerfect) {
        validator.log('\n🎉 ¡CONFIGURACIÓN 100/100 ALCANZADA!', 'success');
        validator.log('GitHub Copilot configurado para rendimiento profesional máximo', 'success');
    } else {
        validator.log('\n⚠️ Configuración necesita ajustes para alcanzar 100/100', 'warning');
        process.exit(1);
    }
}

// Ejecutar solo si es el módulo principal
if (require.main === module) {
    main();
}

module.exports = { CopilotConfigValidator, setupGitConfig };

// --- SUGERENCIAS DE MEJORA PROFESIONAL ---
// 1. Añadir validaciones para workflows de CI/CD y archivos de seguridad.
// 2. Permitir configuración de paths relativos para monorepositorios.
// 3. Documentar el uso del script en la documentación técnica del proyecto.
// 4. Añadir tests automáticos para el propio script.
// 5. Permitir configuración de reglas críticas vía archivo externo (JSON/YAML).
// 6. Mejorar feedback visual (colores, tablas) si se ejecuta en terminal compatible.
// 7. Integrar validación de dependencias y versiones críticas del proyecto.
