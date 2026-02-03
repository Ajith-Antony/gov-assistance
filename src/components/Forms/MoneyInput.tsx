import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import type { FieldConfig } from "../../pages/FormOne/helper";
import { SUPPORTED_CURRENCIES } from "../../constants";

interface MoneyInputProps<T extends FieldValues> {
  field: FieldConfig;
  control: Control<T>;
}

export default function MoneyInput<T extends FieldValues>({
  field,
  control,
}: MoneyInputProps<T>) {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState(SUPPORTED_CURRENCIES[0].code);
  const { name, label: labelKey, rules } = field;
  const label = t(labelKey);
  const helperId = `${name}-helper`;

  const selectedCurrency = SUPPORTED_CURRENCIES.find((c) => c.code === currency);

  return (
    <Box sx={{ 
      display: "flex", 
      gap: 2, 
      flexDirection: { xs: "column", sm: "row" },
      width: "100%", 
      minWidth: { xs: "100%", sm: 250 }, 
      flex: 1 
    }}>
      {/* Currency Selector */}
      <FormControl sx={{ minWidth: { xs: "100%", sm: 120 } }}>
        <InputLabel id="currency-label">{t("financial.currency")}</InputLabel>
        <Select
          labelId="currency-label"
          value={currency}
          label={t("financial.currency")}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {SUPPORTED_CURRENCIES.map((curr) => (
            <MenuItem key={curr.code} value={curr.code}>
              {curr.code} ({curr.symbol})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Amount Input */}
      <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: 200 } }}>
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
                type="number"
                label={label}
                error={hasError}
                helperText={helperText}
                aria-invalid={hasError}
                aria-describedby={helperId}
                FormHelperTextProps={{ id: helperId }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {selectedCurrency?.symbol}
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  min: 0,
                  step: "0.01",
                }}
              />
            );
          }}
        />
      </Box>
    </Box>
  );
}
