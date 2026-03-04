import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import sl from "./locales/sl.json";
import hr from "./locales/hr.json";

export type Locale = "en" | "sl" | "hr";

const resources = {
  en: {
    translation: en,
  },
  sl: {
    translation: sl,
  },
  hr: {
    translation: hr,
  },
} as const satisfies Record<Locale, any>;

const defaultFallbackLng: Locale = "sl";
const languageMap: Record<string, Locale> = {
  "mavi.si": "sl",
  "mavi-hr.hr": "hr",
  "mavi-hr.com": "hr",
};

export const getDefaultLanguage = (): Locale => {
  if (typeof window === "undefined") return defaultFallbackLng;
  const hostname = window.location.hostname.replace(/^www\./, "");
  return languageMap[hostname] ?? defaultFallbackLng;
};

export const defaultLng: Locale = getDefaultLanguage();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLng,
    fallbackLng: defaultLng,
    supportedLngs: Object.keys(resources),
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
