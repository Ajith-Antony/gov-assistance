import { Box, Container, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
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
  
  // Animate progress from 0 to current value
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  useEffect(() => {
    // Reset to 0 first
    setAnimatedProgress(0);
    // Then animate to target after a brief delay
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [progress]);

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

      <Container 
        maxWidth={maxWidth as any}
        sx={{ 
          px: { xs: 2, sm: 3 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            width: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(30px) saturate(180%)",
            WebkitBackdropFilter: "blur(30px) saturate(180%)",
            borderRadius: 4,
            border: "1px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)",
            animation: "fadeInUp 0.6s ease-out",
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
          role="region"
          aria-labelledby="form-title"
          aria-describedby="form-step"
        >
          {/* Progress Bar */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "8px",
              background: "rgba(229, 231, 235, 0.5)",
            }}
            aria-hidden="true"
          >
            <Box
              sx={{
                height: "100%",
                width: `${animatedProgress}%`,
                background: "linear-gradient(90deg, #10b981 0%, #34d399 100%)",
                transition: "width 0.8s cubic-bezier(0.65, 0, 0.35, 1)",
                boxShadow: "0 0 15px rgba(16, 185, 129, 0.8), 0 0 30px rgba(52, 211, 153, 0.4)",
                animation: animatedProgress > 0 ? "progressPulse 0.6s ease-out" : "none",
                "@keyframes progressPulse": {
                  "0%": {
                    boxShadow: "0 0 15px rgba(16, 185, 129, 0.8), 0 0 30px rgba(52, 211, 153, 0.4)",
                  },
                  "50%": {
                    boxShadow: "0 0 25px rgba(16, 185, 129, 1), 0 0 50px rgba(52, 211, 153, 0.6)",
                  },
                  "100%": {
                    boxShadow: "0 0 15px rgba(16, 185, 129, 0.8), 0 0 30px rgba(52, 211, 153, 0.4)",
                  },
                },
              }}
            />
          </Box>

          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
              mt: 2,
            }}
          >
            {title && (
              <Typography
                id="form-title"
                variant="h5"
                component="h1"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                id="form-step"
                variant="body1"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  backgroundColor: "rgba(37, 99, 235, 0.1)",
                }}
              >
                {`Step ${subtitle}`}
              </Typography>
            )}
          </Box>

          {/* Form Content */}
          <Box sx={{ flex: 1, mb: 4 }}>
            {children}
          </Box>

          {/* Navigation Buttons */}
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
    </Box>
  );
}
