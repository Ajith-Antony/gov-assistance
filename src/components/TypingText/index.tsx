import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function TypingEffect({ text, speed = 40, fontSize = "40px" }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <Typography
      sx={{ whiteSpace: "pre-wrap", fontSize, minHeight: "60px" }}
      aria-live="polite"
    >
      {displayed}
      <span style={{ opacity: 0.7 }}>|</span>
    </Typography>
  );
}
