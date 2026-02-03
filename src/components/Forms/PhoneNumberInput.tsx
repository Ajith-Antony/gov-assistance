import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Box, FormHelperText, type SxProps, type Theme } from "@mui/material";
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
            <Box>
              <label htmlFor={name} style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>
                {label}
              </label>
              <PhoneInput
                {...controllerField}
                id={name}
                international
                defaultCountry="AE"
                value={controllerField.value as string}
                onChange={(value) => controllerField.onChange(value || "")}
                style={{
                  width: "100%",
                  padding: "16.5px 14px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  border: hasError ? "2px solid #d32f2f" : "1px solid rgba(0, 0, 0, 0.23)",
                }}
                aria-invalid={hasError}
                aria-describedby={helperId}
              />
              {hasError && (
                <FormHelperText id={helperId} error>
                  {helperText}
                </FormHelperText>
              )}
            </Box>
          );
        }}
      />
    </Box>
  );
}
