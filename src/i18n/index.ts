import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import ar from "./locales/ar/translation.json";
import { LANGUAGES } from "../constants";

const getLanguageFromURL = (): string | null => {
  const pathMatch = window.location.pathname.match(/^\/(en|ar)(\/.*)?$/);
  return pathMatch?.[1] ?? null;
};

const initialLang = getLanguageFromURL() || LANGUAGES.ENGLISH;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      [LANGUAGES.ENGLISH]: { translation: en },
      [LANGUAGES.ARABIC]: { translation: ar },
    },
    lng: initialLang,
    fallbackLng: LANGUAGES.ENGLISH,
    interpolation: {
      escapeValue: false,
    },
  });

const initialDir = (initialLang || i18n.language) === LANGUAGES.ARABIC ? "rtl" : "ltr";
document.documentElement.dir = initialDir;
document.documentElement.lang = initialLang || i18n.language;

i18n.on("languageChanged", (lng) => {
  const dir = lng === LANGUAGES.ARABIC ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;

  const currentPath = window.location.pathname;
  const pathMatch = currentPath.match(/^\/(en|ar)(\/.*)?$/);
  if (pathMatch) {
    const newPath = `/${lng}${pathMatch[2] || ""}`;
    if (currentPath !== newPath) {
      window.history.replaceState(null, "", newPath);
    }
  }

  window.location.reload();
});

export default i18n;
