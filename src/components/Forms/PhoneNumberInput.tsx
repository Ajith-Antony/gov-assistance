import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { TextField, Select, MenuItem, Box, FormControl, FormHelperText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import type { FieldConfig } from "../../pages/FormOne/helper";

interface PhoneNumberInputProps<T extends FieldValues> {
  field: FieldConfig;
  control: Control<T>;
}

// Common country codes
const countryCodes = [
  { code: "+971", country: "UAE", iso: "AE" },
  { code: "+1", country: "USA/Canada", iso: "US" },
  { code: "+44", country: "UK", iso: "GB" },
  { code: "+91", country: "India", iso: "IN" },
  { code: "+86", country: "China", iso: "CN" },
  { code: "+81", country: "Japan", iso: "JP" },
  { code: "+82", country: "South Korea", iso: "KR" },
  { code: "+33", country: "France", iso: "FR" },
  { code: "+49", country: "Germany", iso: "DE" },
  { code: "+61", country: "Australia", iso: "AU" },
  { code: "+966", country: "Saudi Arabia", iso: "SA" },
  { code: "+965", country: "Kuwait", iso: "KW" },
  { code: "+974", country: "Qatar", iso: "QA" },
];

export default function PhoneNumberInput<T extends FieldValues>({
  field,
  control,
}: PhoneNumberInputProps<T>) {
  const { t } = useTranslation();
  const { name, label: labelKey, rules } = field;
  const label = t(labelKey);
  const helperId = `${name}-helper`;

  return (
    <Controller
      name={name as Path<T>}
      control={control}
      rules={rules}
      render={({ field: controllerField, fieldState: { error } }) => {
        const hasError = !!error;
        const helperText = hasError ? t(error.message ?? "") : "";
        
        // Parse existing value to extract country code and number
        const fullValue = controllerField.value || "";
        const [selectedCode, setSelectedCode] = useState(() => {
          // Try to extract country code from existing value
          const match = countryCodes.find(c => fullValue.startsWith(c.code));
          return match?.code || "+971";
        });
        
        // Extract number without country code
        const phoneNumber = fullValue.replace(selectedCode, "").trim();

        const handleCodeChange = (newCode: string) => {
          setSelectedCode(newCode);
          // Update the full value with new code
          controllerField.onChange(`${newCode} ${phoneNumber}`);
        };

        const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          // Only allow numbers and spaces
          const value = e.target.value.replace(/[^\d\s]/g, "");
          // Update the full value
          controllerField.onChange(`${selectedCode} ${value}`);
        };

        // Update selected code when value changes externally
        useEffect(() => {
          const match = countryCodes.find(c => fullValue.startsWith(c.code));
          if (match && match.code !== selectedCode) {
            setSelectedCode(match.code);
          }
        }, [fullValue]);

        return (
          <FormControl sx={{ minWidth: 250, flex: 1 }} error={hasError}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Select
                value={selectedCode}
                onChange={(e) => handleCodeChange(e.target.value)}
                sx={{ minWidth: 120 }}
              >
                {countryCodes.map((item) => (
                  <MenuItem key={item.code} value={item.code}>
                    {item.code}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                value={phoneNumber}
                onChange={handleNumberChange}
                label={label}
                placeholder="50 123 4567"
                type="tel"
                inputProps={{
                  inputMode: "numeric",
                }}
                error={hasError}
                sx={{ flex: 1 }}
                aria-invalid={hasError}
                aria-describedby={helperId}
              />
            </Box>
            {hasError && (
              <FormHelperText id={helperId}>{helperText}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
