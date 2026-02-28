import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import sl from "./locales/sl.json";

const resources = {
  en: {
    translation: en,
  },
  sl: {
    translation: sl,
  },
};

const defaultLng = "sl";

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLng,
  fallbackLng: defaultLng,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
