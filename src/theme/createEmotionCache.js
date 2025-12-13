import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

export const createEmotionCache = (dir = "ltr") =>
  createCache({
    key: dir === "rtl" ? "mui-rtl" : "mui",
    stylisPlugins: dir === "rtl" ? [rtlPlugin] : [],
  });
