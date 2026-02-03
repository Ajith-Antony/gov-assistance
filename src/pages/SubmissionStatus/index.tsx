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
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
        py: { xs: 3, sm: 5 },
      }}
    >
      {/* Animated background shapes */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "40%",
          height: "40%",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          filter: "blur(60px)",
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-30px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "35%",
          height: "35%",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.08)",
          filter: "blur(60px)",
          animation: "float 8s ease-in-out infinite",
        }}
      />

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
          textAlign: "center",
          py: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box 
          sx={{ 
            maxWidth: 600, 
            width: "100%",
            animation: "fadeInUp 0.8s ease-out",
            "@keyframes fadeInUp": {
              from: {
                opacity: 0,
                transform: "translateY(30px)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          {isSuccess ? (
            <CheckCircleIcon
              sx={{ 
                fontSize: 100, 
                color: "#4ade80", 
                mb: 3,
                animation: "scaleIn 0.5s ease-out 0.3s both",
                "@keyframes scaleIn": {
                  from: {
                    transform: "scale(0)",
                  },
                  to: {
                    transform: "scale(1)",
                  },
                },
              }}
              aria-hidden="true"
            />
          ) : (
            <ErrorIcon
              sx={{ 
                fontSize: 100, 
                color: "#ef4444", 
                mb: 3,
                animation: "scaleIn 0.5s ease-out 0.3s both",
                "@keyframes scaleIn": {
                  from: {
                    transform: "scale(0)",
                  },
                  to: {
                    transform: "scale(1)",
                  },
                },
              }}
              aria-hidden="true"
            />
          )}

          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            fontWeight="bold"
            sx={{
              color: "white",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            {isSuccess
              ? t("submission.successTitle")
              : t("submission.errorTitle")}
          </Typography>

          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4,
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "1.125rem",
            }}
          >
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
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                border: "2px solid #4ade80",
                borderRadius: 3,
                animation: "fadeInUp 0.8s ease-out 0.5s both",
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
            <Paper
              sx={{ 
                mb: 4, 
                textAlign: "left",
                p: 3,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                borderRadius: 3,
                animation: "fadeInUp 0.8s ease-out 0.6s both",
              }}
            >
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{
                  background: "linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                }}
              >
                {t("submission.nextSteps")}
              </Typography>
              <Typography variant="body2" color="text.secondary" component="ul" sx={{ pl: 2 }}>
                <li>{t("submission.step1")}</li>
                <li>{t("submission.step2")}</li>
                <li>{t("submission.step3")}</li>
              </Typography>
            </Paper>
          )}

          <Box 
            sx={{ 
              display: "flex", 
              gap: 2, 
              justifyContent: "center", 
              flexWrap: "wrap",
              animation: "fadeInUp 0.8s ease-out 0.7s both",
            }}
          >
            {!isSuccess && (
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleTryAgain}
                size="large"
                aria-label={t("submission.tryAgain")}
                sx={{
                  color: "white",
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
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
              sx={{
                background: "white",
                color: "#667eea",
                fontWeight: 700,
                "&:hover": {
                  background: "#f8fafc",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                },
                transition: "all 0.3s ease",
              }}
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
    </Box>
  );
}
