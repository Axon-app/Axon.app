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

import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^[A-Z_]",
          argsIgnorePattern: "^_",
        },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Reglas adicionales para mejorar calidad del código
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
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
