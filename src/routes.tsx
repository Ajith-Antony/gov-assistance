import { Navigate, useParams } from "react-router";
import { useEffect } from "react";
import Home from "./pages/Home";
import FormOne from "./pages/FormOne";
import FormTwo from "./pages/FormTwo";
import FormThree from "./pages/FormThree";
import PageNotFound from "./pages/PageNotFound";
import SubmissionStatus from "./pages/SubmissionStatus";
import i18n from "./i18n";

export function LangRedirect() {
  const { lang } = useParams();
  const validLang =
    lang && ["en", "ar"].includes(lang) ? lang : i18n.language || "en";
  return <Navigate to={`/${validLang}/home`} replace />;
}

export function RootRedirect() {
  return <Navigate to={`/${i18n.language || "en"}/home`} replace />;
}

export function getStepComponent(step) {
  switch (step) {
    case "first":
      return <FormOne />;
    case "second":
      return <FormTwo />;
    case "third":
      return <FormThree />;
    default:
      return null;
  }
}

export function LanguageRoute({ children }) {
  const { lang } = useParams();

  useEffect(() => {
    if (lang && ["en", "ar"].includes(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
    }
  }, [lang]);

  if (lang && !["en", "ar"].includes(lang)) {
    return <Navigate to={`/${i18n.language || "en"}/home`} replace />;
  }

  return children;
}

export const routeConfig = [
  {
    path: "/",
    Component: RootRedirect,
  },
  {
    path: "/:lang",
    Component: LangRedirect,
  },
  {
    path: "/:lang/home",
    Component: Home,
  },
  {
    path: "/:lang/apply/done",
    Component: SubmissionStatus,
  },
  {
    path: "/:lang/apply/:step",
    Component: null,
  },
  {
    path: "/:lang/*",
    Component: PageNotFound,
  },
  {
    path: "*",
    Component: PageNotFound,
  },
];
