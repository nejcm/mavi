import { type Locale, defaultLng } from "@/i18n";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      locale: defaultLng,
      setLocale: (locale) => set({ locale }),
    }),
    { name: "mavi-app" },
  ),
);
