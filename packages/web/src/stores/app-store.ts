import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Locale = "en" | "sl";

type AppState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      locale: "en",
      setLocale: (locale) => set({ locale }),
    }),
    { name: "mavi-app" },
  ),
);
