import { Controller } from "react-hook-form";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useTranslation } from "react-i18next";
import TextAreaWithAI from "./TextAreaWithAI";
import dayjs from "dayjs";

export default function RenderField({ field, control, onAIGenerate = null }) {
  const { t } = useTranslation();
  const { name, label: labelKey, component, type, options, rules } = field;
  const label = t(labelKey);
  const helperId = `${name}-helper`;

  return (
    <Box sx={{ minWidth: 250, flex: 1 }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: controllerField, fieldState: { error } }) => {
          const hasError = !!error;
          const helperText = hasError ? t(error.message) : "";

          switch (component) {
            case "TextField":
              return (
                <TextField
                  {...controllerField}
                  fullWidth
                  type={type}
                  label={label}
                  error={hasError}
                  helperText={helperText}
                  aria-invalid={hasError}
                  aria-describedby={helperId}
                  FormHelperTextProps={{ id: helperId }}
                />
              );

            case "Select":
              const selectedValue =
                controllerField.value !== undefined &&
                controllerField.value !== null
                  ? controllerField.value
                  : "";
              return (
                <FormControl fullWidth error={hasError}>
                  <InputLabel id={`${name}-label`}>{label}</InputLabel>
                  <Select
                    {...controllerField}
                    labelId={`${name}-label`}
                    aria-invalid={hasError}
                    aria-describedby={helperId}
                    value={selectedValue}
                  >
                    {options?.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {t(opt.label)}
                      </MenuItem>
                    ))}
                  </Select>
                  {hasError && (
                    <FormHelperText id={helperId}>{helperText}</FormHelperText>
                  )}
                </FormControl>
              );

            case "DatePicker":
              return (
                <DatePicker
                  label={label}
                  value={
                    controllerField.value ? dayjs(controllerField.value) : null
                  }
                  onChange={(date) =>
                    controllerField.onChange(date ? date.toISOString() : null)
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: hasError,
                      helperText: helperText,
                      "aria-invalid": hasError,
                      "aria-describedby": helperId,
                      FormHelperTextProps: { id: helperId },
                    },
                  }}
                />
              );

            case "TextAreaWithAI":
              return (
                <TextAreaWithAI
                  field={field}
                  control={control}
                  onAIGenerate={onAIGenerate}
                  aria-label={label}
                />
              );

            default:
              return (
                <TextField
                  {...controllerField}
                  fullWidth
                  label={label}
                  aria-label={label}
                  aria-invalid={hasError}
                  aria-describedby={helperId}
                  FormHelperTextProps={{ id: helperId }}
                />
              );
          }
        }}
      />
    </Box>
  );
}
