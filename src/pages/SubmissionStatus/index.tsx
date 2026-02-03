import { useParams, useNavigate, useLocation } from "react-router";
import { Container, Typography, Button, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import HomeIcon from "@mui/icons-material/Home";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

export default function SubmissionStatus() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentLang = lang || i18n.language || "en";

  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status") || "success";
  const isSuccess = status === "success";

  const handleGoHome = () => navigate(`/${currentLang}/home`);
  const handleTryAgain = () => navigate(`/${currentLang}/apply/first`);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
        textAlign: "center",
      }}
    >
      <Box>
        {isSuccess ? (
          <CheckCircleIcon
            sx={{ fontSize: 80, color: "#4caf50", mb: 2 }}
            aria-hidden="true"
          />
        ) : (
          <ErrorIcon
            sx={{ fontSize: 80, color: "#f44336", mb: 2 }}
            aria-hidden="true"
          />
        )}

        <Typography variant="h4" component="h1" gutterBottom>
          {isSuccess
            ? t("submission.successTitle")
            : t("submission.errorTitle")}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {isSuccess
            ? t("submission.successMessage")
            : t("submission.errorMessage")}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          {!isSuccess && (
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleTryAgain}
              size="large"
              aria-label={t("submission.tryAgain")}
            >
              {t("submission.tryAgain")}
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
            size="large"
            aria-label={t("submission.goHome")}
          >
            {t("submission.goHome")}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
