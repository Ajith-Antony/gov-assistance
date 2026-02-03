import { useParams, useNavigate, useLocation } from "react-router";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import HomeIcon from "@mui/icons-material/Home";
import RefreshIcon from "@mui/icons-material/Refresh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import i18n from "../../i18n";
import { LANGUAGES } from "../../constants";

export default function SubmissionStatus() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentLang = lang || i18n.language || LANGUAGES.ENGLISH;

  const [applicationNumber, setApplicationNumber] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status") || "success";
  const isSuccess = status === "success";

  useEffect(() => {
    // Generate UUID for application number
    if (isSuccess) {
      const uuid = crypto.randomUUID();
      setApplicationNumber(uuid);
    }
  }, [isSuccess]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(applicationNumber);
      setCopySuccess(true);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCloseSnackbar = () => {
    setCopySuccess(false);
  };

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
        py: 4,
      }}
    >
      <Box sx={{ maxWidth: 600, width: "100%" }}>
        {isSuccess ? (
          <CheckCircleIcon
            sx={{ fontSize: 100, color: "success.main", mb: 3 }}
            aria-hidden="true"
          />
        ) : (
          <ErrorIcon
            sx={{ fontSize: 100, color: "error.main", mb: 3 }}
            aria-hidden="true"
          />
        )}

        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          {isSuccess
            ? t("submission.successTitle")
            : t("submission.errorTitle")}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {isSuccess
            ? t("submission.successMessage")
            : t("submission.errorMessage")}
        </Typography>

        {isSuccess && applicationNumber && (
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: "background.default",
              border: "2px solid",
              borderColor: "success.main",
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {t("submission.applicationNumber")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mt: 1,
              }}
            >
              <Typography
                variant="h6"
                component="code"
                sx={{
                  fontFamily: "monospace",
                  wordBreak: "break-all",
                  flex: 1,
                }}
              >
                {applicationNumber}
              </Typography>
              <IconButton
                onClick={handleCopy}
                color="primary"
                aria-label={t("submission.copyNumber")}
                sx={{ flexShrink: 0 }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 2 }}
            >
              {t("submission.saveNumber")}
            </Typography>
          </Paper>
        )}

        {isSuccess && (
          <Box sx={{ mb: 4, textAlign: "left" }}>
            <Typography variant="h6" gutterBottom>
              {t("submission.nextSteps")}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="ul" sx={{ pl: 2 }}>
              <li>{t("submission.step1")}</li>
              <li>{t("submission.step2")}</li>
              <li>{t("submission.step3")}</li>
            </Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
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

      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {t("submission.copied")}
        </Alert>
      </Snackbar>
    </Container>
  );
}
