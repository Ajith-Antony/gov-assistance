import { Button, Container } from "@mui/material";
import { useParams, useNavigate } from "react-router";

import useAppTranslation from "../../hooks/useAppTranslation";
import TypingEffect from "../../components/TypingText";

export default function Home() {
  const { t } = useAppTranslation();
  const { lang } = useParams();
  const currentLang = lang || "en";
  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate(`/${currentLang}/apply/first`);
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 64px)",
        textAlign: "center",
      }}
    >
      <TypingEffect
        text={t("common.welcome")}
        speed={200}
        style={{ marginBottom: "2rem" }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={onButtonClick}
        aria-label={t("common.applyButton")}
      >
        {t("common.applyButton")}
      </Button>
    </Container>
  );
}
