import { useState } from "react";
import { Controller } from "react-hook-form";
import {
  TextField,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Alert,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useTranslation } from "react-i18next";
import { generateAIText } from "../../services/generateAIText";

export default function TextAreaWithAI({ field, control }) {
  const { t } = useTranslation();
  const { name, label, rules, ai } = field;

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const helperId = `${name}-helper`;

  const handleOpen = async () => {
    setOpen(true);
    setDraft("");
    setError("");
    setLoading(true);

    try {
      const result = await generateAIText(ai.prompt);
      setDraft(result);
    } catch (err) {
      setError(t("ai.error"));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setDraft("");
    setError("");
    setLoading(false);
    setOpen(false);
  };

  return (
    <Box sx={{ mb: 2, position: "relative" }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
          field: controllerField,
          fieldState: { error: fieldError },
        }) => (
          <>
            <TextField
              {...controllerField}
              fullWidth
              multiline
              minRows={4}
              maxRows={6}
              placeholder={t(label)}
              error={!!fieldError}
              aria-describedby={helperId}
              sx={{
                overflow: "auto",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleOpen}
                      aria-label={t("ai.helpMeWrite")}
                      edge="end"
                    >
                      <AutoFixHighIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {(fieldError || error) && (
              <FormHelperText id={helperId} error>
                {t(fieldError?.message || error)}
              </FormHelperText>
            )}

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
              <DialogTitle>{t("ai.helpMeWrite")}</DialogTitle>

              <DialogContent>
                {loading && (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", py: 3 }}
                  >
                    <CircularProgress />
                  </Box>
                )}

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                {!loading && !error && (
                  <TextField
                    fullWidth
                    multiline
                    minRows={6}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={t("ai.writeHere")}
                    sx={{ overflow: "auto" }}
                  />
                )}
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose}>{t("ai.discard")}</Button>
                <Button
                  variant="contained"
                  disabled={!draft}
                  onClick={() => {
                    controllerField.onChange(draft);
                    handleClose();
                  }}
                >
                  {t("ai.accept")}
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      />
    </Box>
  );
}
