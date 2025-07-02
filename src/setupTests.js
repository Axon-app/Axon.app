// @ts-nocheck
// src/setupTests.js
// =====================================================
// Configuración global para tests con Vitest y React Testing Library
// Incluye matchers personalizados, cleanup automático y utilidades de testing
// Autor: Axon.App Team | Última revisión: 01/07/2025

import '@testing-library/jest-dom';
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeAll, expect } from 'vitest';

// Configuración global para testing
// Hacemos act disponible globalmente para facilitar su uso en tests
global.act = act;

// Extender los matchers de Vitest con jest-dom
expect.extend(matchers);

// Configuración global antes de todos los tests
beforeAll(() => {
  // Mock de console.error para tests más limpios
  const originalError = console.error;
  global.originalConsoleError = originalError;

  // Silenciar ciertos warnings conocidos en tests
  console.error = (...args) => {
    const message = args[0];

    // Ignorar warnings específicos de React en tests
    if (
      typeof message === 'string' && (
        message.includes('Warning: ReactDOM.render is deprecated') ||
        message.includes('Warning: An invalid form control') ||
        message.includes('Warning: Each child in a list should have a unique "key" prop')
      )
    ) {
      return;
    }

    originalError.apply(console, args);
  };
});

// Limpiar después de cada test
afterEach(() => {
  cleanup();

  // Limpiar todos los timers
  vi.clearAllTimers();

  // Limpiar todos los mocks
  vi.clearAllMocks();
});

// Mock de IntersectionObserver para tests
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock de ResizeObserver para tests
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock de matchMedia para tests de responsive design
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock de window.scrollTo para tests
global.scrollTo = vi.fn();

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock de sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.sessionStorage = sessionStorageMock;

// Utilidades de testing personalizadas
global.testUtils = {
  // Función para esperar que se resuelvan todas las promesas pendientes
  waitForPromises: () => new Promise(resolve => setTimeout(resolve, 0)),

  // Función para simular eventos de teclado
  pressKey: (element, key) => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key }));
    element.dispatchEvent(new KeyboardEvent('keyup', { key }));
  },

  // Función para simular cambios en inputs
  changeInput: (input, value) => {
    input.value = value;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  },

  // Función para crear un mock de función con implementación personalizada
  createMockFn: (implementation) => vi.fn(implementation),
};
