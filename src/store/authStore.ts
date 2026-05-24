import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  nim: string | null;

  login: (nim: string) => void;
  logout: () => void;
}

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      nim: null,

      login: (nim: string) =>
        set({
          isAuthenticated: true,
          nim,
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          nim: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);