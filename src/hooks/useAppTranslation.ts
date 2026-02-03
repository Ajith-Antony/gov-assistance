import { useTranslation } from "react-i18next";

export default function useAppTranslation() {
  const { t, i18n } = useTranslation();

  const language = i18n.language;
  const dir = i18n.dir();

  const setLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return {
    t,
    i18n,
    language,
    dir,
    setLanguage,
  };
}
