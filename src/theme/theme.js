import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

export const getTheme = (dir = "ltr") =>
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
          "&::placeholder": {
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
