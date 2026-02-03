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
      sx={{ display: "flex", justifyContent: "space-between", mt: "1rem" }}
      role="group"
      aria-label={t("form.navigation")}
    >
      {showBackButton && (
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          aria-label={t(backButtonText)}
        >
          {t(backButtonText)}
        </Button>
      )}

      {showNextButton && (
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={onNext}
          aria-label={t(nextButtonText)}
          sx={!showBackButton ? { ml: "auto" } : {}}
        >
          {t(nextButtonText)}
        </Button>
      )}
    </Box>
  );
}
