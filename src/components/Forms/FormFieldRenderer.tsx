import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
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
import PhoneNumberInput from "./PhoneNumberInput";
import CountryCitySelect from "./CountryCitySelect";
import MoneyInput from "./MoneyInput";
import dayjs from "dayjs";
import type { FieldConfig } from "../../pages/FormOne/helper";

interface RenderFieldProps<T extends FieldValues> {
  field: FieldConfig;
  control: Control<T>;
  countryValue?: string;
  relatedFields?: {
    countryField?: FieldConfig;
    stateField?: FieldConfig;
  };
}

export default function RenderField<T extends FieldValues>({
  field,
  control,
  countryValue,
  relatedFields,
}: RenderFieldProps<T>) {
  const { t } = useTranslation();
  const { name, label: labelKey, component, type, options, rules } = field;
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

          switch (component) {
            case "PhoneNumberInput":
              return <PhoneNumberInput field={field} control={control} />;

            case "CountryCitySelect":
              if (relatedFields?.countryField && relatedFields?.stateField) {
                return (
                  <CountryCitySelect
                    countryField={relatedFields.countryField}
                    stateField={relatedFields.stateField}
                    control={control}
                  />
                );
              }
              return null;

            case "MoneyInput":
              return <MoneyInput field={field} control={control} />;

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
                    label={label}
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
