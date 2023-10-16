import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./Local/en/translation.json";
import translationAR from "./Local/ar/translation.json";

const resources = {
  ar: {
    translation: translationAR,
  },
  en: {
    translation: translationEN,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
