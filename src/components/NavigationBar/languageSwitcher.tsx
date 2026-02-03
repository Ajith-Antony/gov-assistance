import useAppTranslation from "../../hooks/useAppTranslation";
import { Select, MenuItem } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useAppTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();
  const location = useLocation();

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);

    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";

    const currentPath = location.pathname;
    const currentLang = lang || language;
    const newPath = currentPath.replace(`/${currentLang}`, `/${newLang}`);
    navigate(newPath, { replace: true });
  };

  return (
    <Select
      value={language}
      onChange={(e) => handleLanguageChange(e.target.value)}
      variant="outlined"
      size="small"
      aria-label="Select Language"
      sx={{
        background: "linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)",
        color: "white",
        fontWeight: 600,
        borderRadius: 2,
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(255, 255, 255, 0.3)",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(255, 255, 255, 0.5)",
        },
        "& .MuiSvgIcon-root": {
          color: "white",
        },
      }}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="ar">العربية</MenuItem>
    </Select>
  );
}
