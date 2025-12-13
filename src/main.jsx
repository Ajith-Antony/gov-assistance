import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
import { getTheme } from "./theme/theme";
import { createEmotionCache } from "./theme/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import i18n from "./i18n";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function Root() {
  const dir = i18n.dir();
  const cache = createEmotionCache(dir);
  const theme = getTheme(dir);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <App />
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
