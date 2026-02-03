import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { TextField, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { FieldConfig } from "../../pages/FormOne/helper";

interface PhoneNumberInputProps<T extends FieldValues> {
  field: FieldConfig;
  control: Control<T>;
}

export default function PhoneNumberInput<T extends FieldValues>({
  field,
  control,
}: PhoneNumberInputProps<T>) {
  const { t } = useTranslation();
  const { name, label: labelKey, rules } = field;
  const label = t(labelKey);
  const helperId = `${name}-helper`;

  return (
    <Box sx={{ minWidth: 250, flex: 1 }}>
      <Controller
        name={name as Path<T>}
        control={control}
        rules={rules}
        render={({ field: controllerField, fieldState: { error } }) => {
          const hasError = !!error;
          const helperText = hasError ? t(error.message ?? "") : "";

          return (
            <TextField
              {...controllerField}
              fullWidth
              type="tel"
              label={label}
              error={hasError}
              helperText={helperText}
              placeholder="+971 50 123 4567"
              aria-invalid={hasError}
              aria-describedby={helperId}
              FormHelperTextProps={{ id: helperId }}
            />
          );
        }}
      />
    </Box>
  );
}
