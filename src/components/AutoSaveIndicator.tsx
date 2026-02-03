import { Box, Typography, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useTranslation } from "react-i18next";
import { AUTO_SAVE_STATUS } from "../constants";

type AutoSaveStatus = typeof AUTO_SAVE_STATUS[keyof typeof AUTO_SAVE_STATUS];

interface AutoSaveIndicatorProps {
  status: AutoSaveStatus;
}

export default function AutoSaveIndicator({ status }: AutoSaveIndicatorProps) {
  const { t } = useTranslation();

  if (status === AUTO_SAVE_STATUS.IDLE) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        py: 1,
        px: 2,
        borderRadius: 1,
        backgroundColor: "background.paper",
        boxShadow: 1,
      }}
    >
      {status === AUTO_SAVE_STATUS.SAVING && (
        <>
          <CircularProgress size={16} />
          <Typography variant="body2" color="text.secondary">
            {t("autoSave.saving")}
          </Typography>
        </>
      )}

      {status === AUTO_SAVE_STATUS.SAVED && (
        <>
          <CheckCircleIcon sx={{ color: "success.main", fontSize: 20 }} />
          <Typography variant="body2" color="success.main">
            {t("autoSave.saved")}
          </Typography>
        </>
      )}

      {status === AUTO_SAVE_STATUS.ERROR && (
        <>
          <ErrorIcon sx={{ color: "error.main", fontSize: 20 }} />
          <Typography variant="body2" color="error.main">
            {t("autoSave.error")}
          </Typography>
        </>
      )}
    </Box>
  );
}
