import { Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useAppTranslation from "../../hooks/useAppTranslation";

export default function FormNavigationButtons({
  onBack,
  onNext,
  backButtonText = "common.back",
  nextButtonText = "common.next",
  showBackButton = true,
  showNextButton = true,
}) {
  const { t } = useAppTranslation();

  return (
    <Box
      sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        mt: 4,
        pt: 3,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
      role="group"
      aria-label={t("form.navigation")}
    >
      {showBackButton && (
        <Button
          variant="outlined"
          size="large"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          aria-label={t(backButtonText)}
          sx={{
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
            },
          }}
        >
          {t(backButtonText)}
        </Button>
      )}

      {showNextButton && (
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
          onClick={onNext}
          aria-label={t(nextButtonText)}
          sx={{
            ml: showBackButton ? 0 : "auto",
            background: "linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #1e40af 0%, #6d28d9 100%)",
            },
          }}
        >
          {t(nextButtonText)}
        </Button>
      )}
    </Box>
  );
}
