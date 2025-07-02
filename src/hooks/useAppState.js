import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAppState = create(
  persist(
    (set, get) => ({
      // Estado de la aplicación
      theme: 'light',
      language: 'es',
      isAuthenticated: false,
      user: null,

      // Acciones
      setTheme: theme => set({ theme }),
      setLanguage: language => set({ language }),
      setAuth: (isAuthenticated, user = null) => set({ isAuthenticated, user }),

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
