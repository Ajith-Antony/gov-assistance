import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
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
    <Controller
      name={name as Path<T>}
      control={control}
      rules={rules}
      render={({ field: controllerField, fieldState: { error } }) => {
        const hasError = !!error;
        const helperText = hasError ? t(error.message ?? "") : "";

        return (
          <PhoneInput
            {...controllerField}
            international
            withCountryCallingCode
            defaultCountry="AE"
            countryCallingCodeEditable={false}
            inputComponent={TextField}
            style={{ minWidth: 250, flex: 1 }}
            numberInputProps={{
              label,
              error: hasError,
              helperText,
              "aria-invalid": hasError,
              "aria-describedby": helperId,
              FormHelperTextProps: { id: helperId },
            }}
          />
        );
      }}
    />
  );
}
