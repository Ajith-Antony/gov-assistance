import { Button, Container, Typography, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import useAppTranslation from "../../hooks/useAppTranslation";

export default function Home() {
  const { t } = useAppTranslation();
  const { lang } = useParams();
  const currentLang = lang || "en";
  const navigate = useNavigate();
  
  const onButtonClick = () => {
    navigate(`/${currentLang}/apply/first`);
  };

  const features = [
    "home.feature1",
    "home.feature2",
    "home.feature3",
  ];

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
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
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          px: { xs: 3, sm: 4 },
        }}
      >
        {/* Hero Section */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: "white",
            fontWeight: 800,
            mb: 2,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
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
          {t("common.welcome")}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: "rgba(255, 255, 255, 0.9)",
            mb: 5,
            maxWidth: "600px",
            fontSize: { xs: "1rem", sm: "1.25rem" },
            fontWeight: 400,
            lineHeight: 1.6,
            animation: "fadeInUp 0.8s ease-out 0.2s both",
          }}
        >
          {t("home.subtitle")}
        </Typography>

        {/* Features List */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mb: 5,
            width: "100%",
            maxWidth: "500px",
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={feature}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: 3,
                p: 2,
                animation: `fadeInUp 0.8s ease-out ${0.4 + index * 0.1}s both`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CheckCircleOutlineIcon
                sx={{
                  color: "#4ade80",
                  fontSize: 28,
                }}
              />
              <Typography
                sx={{
                  color: "white",
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                  fontWeight: 500,
                  textAlign: "left",
                }}
              >
                {t(feature)}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* CTA Button */}
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
          onClick={onButtonClick}
          aria-label={t("common.applyButton")}
          sx={{
            px: 5,
            py: 2,
            fontSize: "1.125rem",
            fontWeight: 700,
            backgroundColor: "white",
            color: "#667eea",
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            animation: "fadeInUp 0.8s ease-out 0.7s both",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#f8fafc",
              transform: "translateY(-2px)",
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.4)",
            },
          }}
        >
          {t("common.applyButton")}
        </Button>
      </Container>
    </Box>
  );
}
