import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link, useParams } from "react-router";
import useAppTranslation from "../../hooks/useAppTranslation";
import LanguageSwitcher from "./languageSwitcher";

export default function NavigationBar() {
  const { t } = useAppTranslation();
  const { lang } = useParams();
  const currentLang = lang || "en";

  return (
    <AppBar
      position="static"
      component="nav"
      sx={{
        height: "64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: "1rem",
        flexDirection: "row",
      }}
    >
      <Typography
        component={Link}
        to={`/${currentLang}/home`}
        variant="h6"
        sx={{
          textDecoration: "none",
          color: "inherit",
          fontWeight: "bold",
        }}
      >
        {t("common.home")}
      </Typography>

      <LanguageSwitcher aria-label={t("common.switchLanguage")} />
    </AppBar>
  );
}
