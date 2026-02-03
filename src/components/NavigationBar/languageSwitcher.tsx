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
        color: "inherit",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(255, 255, 255, 0.3)",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(255, 255, 255, 0.5)",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(255, 255, 255, 0.7)",
        },
        "& .MuiSvgIcon-root": {
          color: "inherit",
        },
      }}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="ar">العربية</MenuItem>
    </Select>
  );
}
