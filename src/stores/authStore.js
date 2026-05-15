import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_BASE = import.meta.env.VITE_API_URL || 'https://ai-voice-assistant-backend-u7nv.onrender.com/api/v1';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      login: async (email, password) => {
        const response = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || 'Login failed');
        }

        set({
          user: data.data.user,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        });

        return data.data;
      },

      register: async (name, email, password) => {
        const response = await fetch(`${API_BASE}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || 'Registration failed');
        }

        set({
          user: data.data.user,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        });

        return data.data;
      },

      logout: async () => {
        const { accessToken } = get();

        if (accessToken) {
          try {
            await fetch(`${API_BASE}/auth/logout`, {
              method: 'POST',
              headers: { Authorization: `Bearer ${accessToken}` },
            });
          } catch (e) {
            console.error('Logout request failed', e);
          }
        }

        set({ user: null, accessToken: null, refreshToken: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
