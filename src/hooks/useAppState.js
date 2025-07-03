import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Hook de estado global para la aplicación (actualmente no usado, preparado para futuras funcionalidades)
const _useAppState = create(
  persist(
    (set, get) => ({
      // Estado de la aplicación
      theme: 'light',
      language: 'es',
      isAuthenticated: false,
      user: null,

      // Acciones
      setTheme: (/** @type {string} */ theme) => set({ theme }),
      setLanguage: (/** @type {string} */ language) => set({ language }),
      setAuth: (/** @type {boolean} */ isAuthenticated, /** @type {any} */ user = null) =>
        set({ isAuthenticated, user }),

      // Selectores
      getTheme: () => get().theme,
      getLanguage: () => get().language,
      getUser: () => get().user,

      // Reset
      reset: () =>
        set({
          theme: 'light',
          language: 'es',
          isAuthenticated: false,
          user: null,
        }),
    }),
    {
      name: 'app-state',
      getStorage: () => localStorage,
    }
  )
);

export default _useAppState;
