import { create } from 'zustand';
import { supabase, getCurrentUser, signIn, signOut, signUp } from '../lib/supabase';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  initialized: false,

  initialize: async () => {
    set({ isLoading: true });
    try {
      const { user, error } = await getCurrentUser();
      
      if (error) {
        throw error;
      }
      
      set({ 
        user: user as User | null,
        initialized: true,
        error: null 
      });
    } catch (error) {
      set({ 
        error: (error as Error).message,
        initialized: true 
      });
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await signUp(email, password);
      
      if (error) {
        throw error;
      }
      
      // After signup, user needs to be verified before logging in
      set({ error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        throw error;
      }
      
      set({ 
        user: data.user as User,
        error: null 
      });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await signOut();
      
      if (error) {
        throw error;
      }
      
      set({ user: null, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

// Setup listener for auth changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    useAuthStore.setState({ 
      user: session.user as User,
      error: null 
    });
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({ user: null });
  }
});