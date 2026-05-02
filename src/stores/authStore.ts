import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from '@/lib/firebase';

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
  setInitialized: (val: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      initialized: false,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const { user } = await signInWithEmailAndPassword(email, password);
          set({ user, loading: false });
        } catch (err: any) {
          set({ error: err.message || 'Login failed', loading: false });
          throw err;
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          await firebaseSignOut();
          set({ user: null, loading: false, error: null });
        } catch (err: any) {
          set({ error: err.message || 'Logout failed', loading: false });
        }
      },

      clearError: () => set({ error: null }),
      setUser: (user) => set({ user }),
      setInitialized: (val) => set({ initialized: val }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);

if (typeof window !== 'undefined') {
  onAuthStateChanged((user) => {
    useAuthStore.getState().setUser(user);
    useAuthStore.getState().setInitialized(true);
  });
}
