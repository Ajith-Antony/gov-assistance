import { Navigate, useParams } from "react-router";
import { useEffect, type ReactNode } from "react";
import Home from "./pages/Home";
import FormOne from "./pages/FormOne";
import FormTwo from "./pages/FormTwo";
import FormThree from "./pages/FormThree";
import PageNotFound from "./pages/PageNotFound";
import SubmissionStatus from "./pages/SubmissionStatus";
import i18n from "./i18n";
import { ROUTES, STEPS, SUPPORTED_LANGUAGES, LANGUAGES } from "./constants";

export function LangRedirect() {
  const { lang } = useParams();
  const validLang =
    lang && SUPPORTED_LANGUAGES.includes(lang as typeof SUPPORTED_LANGUAGES[number])
      ? lang
      : i18n.language || LANGUAGES.ENGLISH;
  return <Navigate to={`/${validLang}/home`} replace />;
}

export function RootRedirect() {
  return <Navigate to={`/${i18n.language || LANGUAGES.ENGLISH}/home`} replace />;
}

export function getStepComponent(step: string | undefined) {
  switch (step) {
    case STEPS.FIRST:
      return <FormOne />;
    case STEPS.SECOND:
      return <FormTwo />;
    case STEPS.THIRD:
      return <FormThree />;
    default:
      return null;
  }
}

export function LanguageRoute({ children }: { children: ReactNode }) {
  const { lang } = useParams();

  useEffect(() => {
    if (lang && SUPPORTED_LANGUAGES.includes(lang as typeof SUPPORTED_LANGUAGES[number])) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
    }
  }, [lang]);

  if (lang && !SUPPORTED_LANGUAGES.includes(lang as typeof SUPPORTED_LANGUAGES[number])) {
    return <Navigate to={`/${i18n.language || LANGUAGES.ENGLISH}/home`} replace />;
  }

  return children;
}

export const routeConfig = [
  {
    path: ROUTES.ROOT,
    Component: RootRedirect,
  },
  {
    path: ROUTES.LANG,
    Component: LangRedirect,
  },
  {
    path: ROUTES.HOME,
    Component: Home,
  },
  {
    path: ROUTES.APPLY_DONE,
    Component: SubmissionStatus,
  },
  {
    path: ROUTES.APPLY_STEP,
    Component: null,
  },
  {
    path: ROUTES.LANG_WILDCARD,
    Component: PageNotFound,
  },
  {
    path: ROUTES.WILDCARD,
    Component: PageNotFound,
  },
];

