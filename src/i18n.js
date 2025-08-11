import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useTranslation } from "react-i18next";

// Import your translation files
import az from "../src/locales/az.json";
import en from "../src/locales/en.json";
import ru from "../src/locales/ru.json";

// Initialize i18n
i18n.use(initReactI18next).init({
  resources: {
    az: { translation: az },
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: "az", // Set default language
  fallbackLng: "az", // Set fallback language in case translation is missing
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export { useTranslation }; // Optional if you need to use it directly
