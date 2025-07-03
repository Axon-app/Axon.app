// eslint.config.js - Configuración profesional ESLint para Axon.App
// ================================================================
// Define reglas y plugins para asegurar calidad, estilo y buenas prácticas en JS/JSX.
//
// Características:
// - Soporte para React, hooks y refresh
// - Reglas estrictas para variables, const, templates y objetos
// - Ignora la carpeta dist
// - Permite configuración modular y escalable
//
// @author Axon.app Team
// @version 2.4.0

import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // Reglas de React
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Reglas de calidad de código
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',

      // Reglas de formateo
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],

      // Reglas de mejores prácticas
      'no-duplicate-imports': 'error',
      'no-param-reassign': 'error',
      'no-return-await': 'error',
      'require-await': 'error',

      // Reglas de React válidas
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',

      // Reglas de accesibilidad
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/click-events-have-key-events': 'warn',
    },
  },
];

// --- SUGERENCIAS DE MEJORA PROFESIONAL ---
// 1. Añadir soporte para TypeScript si el proyecto crece o migra.
// 2. Integrar Prettier para formateo automático y consistente.
// 3. Añadir reglas de accesibilidad (eslint-plugin-jsx-a11y).
// 4. Configurar reglas específicas para tests y mocks.
// 5. Documentar la configuración y convenciones en el README.
// 6. Revisar y actualizar reglas según necesidades del equipo.
// 7. Añadir scripts npm para lint y fix automáticos.
