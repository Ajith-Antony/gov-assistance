import { useState } from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import {
  TextField,
  Box,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useTranslation } from "react-i18next";
import { generateAIText } from "../../services/generateAIText";
import type { FieldConfig } from "../../pages/FormOne/helper";

interface TextAreaWithAIProps<T extends FieldValues> {
  field: FieldConfig;
  control: Control<T>;
}

export default function TextAreaWithAI<T extends FieldValues>({
  field,
  control,
}: TextAreaWithAIProps<T>) {
  const { t } = useTranslation();
  const { name, label, rules } = field;

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const helperId = `${name}-helper`;

  const handleOpen = async (currentValue: string) => {
    setOpen(true);
    setDraft("");
    setError("");
    setLoading(true);

    try {
      // Use existing content as context if present, otherwise use default prompt
      const prompt = currentValue
        ? `Based on this text: "${currentValue}", please improve and expand it to better describe the situation.`
        : `Help me describe my financial situation and need for government support.`;
      
      const result = await generateAIText(prompt);
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
    <Box sx={{ mb: 2, position: "relative", minWidth: 250, flex: 1 }}>
      <Controller
        name={name as Path<T>}
        control={control}
        rules={rules}
        render={({
          field: controllerField,
          fieldState: { error: fieldError },
        }) => {
          const currentValue = controllerField.value as string || "";
          const isEmpty = !currentValue || currentValue.trim() === "";

          return (
            <>
              {isEmpty ? (
                // Show button when field is empty
                <Box>
                  <TextField
                    {...controllerField}
                    fullWidth
                    multiline
                    minRows={4}
                    maxRows={6}
                    placeholder={t(label)}
                    error={!!fieldError}
                    aria-describedby={helperId}
                    sx={{ overflow: "auto" }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<AutoFixHighIcon />}
                    onClick={() => handleOpen(currentValue)}
                    sx={{ mt: 1 }}
                    fullWidth
                  >
                    {t("ai.helpMeWrite")}
                  </Button>
                </Box>
              ) : (
                // Show icon button when field has content
                <TextField
                  {...controllerField}
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={6}
                  placeholder={t(label)}
                  error={!!fieldError}
                  aria-describedby={helperId}
                  sx={{ overflow: "auto" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handleOpen(currentValue)}
                          aria-label={t("ai.improveText")}
                          edge="end"
                        >
                          <AutoFixHighIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              
              {(fieldError || error) && (
                <FormHelperText id={helperId} error>
                  {t(fieldError?.message ?? "") || error}
                </FormHelperText>
              )}

              <Dialog 
                open={open} 
                onClose={handleClose} 
                fullWidth 
                maxWidth="sm"
                PaperProps={{
                  sx: {
                    background: "rgba(255, 255, 255, 0.75)",
                    backdropFilter: "blur(40px) saturate(200%)",
                    WebkitBackdropFilter: "blur(40px) saturate(200%)",
                    borderRadius: 4,
                    boxShadow: "0 20px 60px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.5) inset",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                  },
                }}
                BackdropProps={{
                  sx: {
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(102, 126, 234, 0.2)",
                  },
                }}
              >
                <DialogTitle
                  sx={{
                    background: "linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 700,
                  }}
                >
                  {isEmpty ? t("ai.helpMeWrite") : t("ai.improveText")}
                </DialogTitle>

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
                    sx={{
                      background: "linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #1e40af 0%, #6d28d9 100%)",
                      },
                    }}
                  >
                    {t("ai.accept")}
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          );
        }}
      />
    </Box>
  );
}
