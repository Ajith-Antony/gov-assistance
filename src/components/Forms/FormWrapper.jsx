import { Box, Container, Paper, Typography } from "@mui/material";
import FormNavigationButtons from "./FormNavigationButtons";

export default function FormWrapper({
  title,
  step,
  totalSteps = 3,
  children,
  onBack,
  onNext,
  backButtonText = "common.back",
  nextButtonText = "common.next",
  showBackButton = true,
  showNextButton = true,
  maxWidth = "md",
}) {
  const progress = step && totalSteps ? (step / totalSteps) * 100 : 0;
  const subtitle = step && totalSteps ? `${step}/${totalSteps}` : "";

  return (
    <Container maxWidth={maxWidth} sx={{ py: 4, height: "calc(100% - 64px)" }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
        role="region"
        aria-labelledby="form-title"
        aria-describedby="form-step"
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px 4px 0 0",
          }}
          aria-hidden="true"
        >
          <Box
            sx={{
              height: "100%",
              width: `${progress}%`,
              backgroundColor: "#4caf50",
              transition: "width 0.3s ease",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          {title && (
            <Typography
              id="form-title"
              variant="h6"
              component="h6"
              fontWeight={600}
              sx={{ marginBottom: "10px" }}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              id="form-step"
              variant="body2"
              color="text.secondary"
              fontWeight={400}
            >
              {`Step ${subtitle}`}
            </Typography>
          )}
        </Box>

        {children}

        <FormNavigationButtons
          onBack={onBack}
          onNext={onNext}
          backButtonText={backButtonText}
          nextButtonText={nextButtonText}
          showBackButton={showBackButton}
          showNextButton={showNextButton}
        />
      </Paper>
    </Container>
  );
}
