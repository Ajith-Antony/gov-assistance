import { useParams, useNavigate } from "react-router";
import { Container, Typography, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

export default function PageNotFound() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const currentLang = lang || i18n.language || "en";

  const handleGoHome = () => {
    navigate(`/${currentLang}/home`);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
        textAlign: "center",
        px: 2,
      }}
    >
      <Box>
        <Typography variant="h1" component="h1" gutterBottom>
          {t("pageNotFound.code")}
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          {t("pageNotFound.title")}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t("pageNotFound.description")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          onClick={handleGoHome}
          size="large"
          aria-label={t("pageNotFound.goHome")}
        >
          {t("pageNotFound.goHome")}
        </Button>
      </Box>
    </Container>
  );
}
