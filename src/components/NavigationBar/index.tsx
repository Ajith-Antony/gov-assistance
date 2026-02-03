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
      position="relative"
      component="nav"
      elevation={0}
      sx={{
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(139, 92, 246, 0.15)",
        boxShadow: "0 2px 20px rgba(139, 92, 246, 0.08)",
        width: "100%",
        borderRadius: 0,
        // Subtle purple tint overlay
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.03) 0%, rgba(37, 99, 235, 0.02) 100%)",
          pointerEvents: "none",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 2, sm: 4 },
        }}
      >
        <Typography
          component={Link}
          to={`/${currentLang}/home`}
          variant="h6"
          sx={{
            textDecoration: "none",
            background: "linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 800,
            fontSize: { xs: "1.125rem", sm: "1.25rem" },
            letterSpacing: "-0.02em",
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          {t("common.home")}
        </Typography>

        <LanguageSwitcher aria-label={t("common.switchLanguage")} />
      </Toolbar>
    </AppBar>
  );
}
