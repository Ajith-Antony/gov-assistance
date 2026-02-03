import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";

export const getTheme = (dir: "ltr" | "rtl" = "ltr"): Theme =>
  createTheme({
    direction: dir,
    typography: {
      fontFamily: dir === "rtl" ? "Tajawal, sans-serif" : "Roboto, sans-serif",
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            textAlign: dir === "rtl" ? "right" : "left",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            textAlign: dir === "rtl" ? "right" : "left",
          },
        },
      },
    },
  });

