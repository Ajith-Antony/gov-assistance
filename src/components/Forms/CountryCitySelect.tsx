import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import type { FieldConfig } from "../../pages/FormOne/helper";
import { fetchCountries, fetchStates, type Country, type State } from "../../services/locationService";

interface CountryCitySelectProps<T extends FieldValues> {
  countryField: FieldConfig;
  stateField: FieldConfig;
  control: Control<T>;
  countryValue?: string;
}

export default function CountryCitySelect<T extends FieldValues>({
  countryField,
  stateField,
  control,
  countryValue,
}: CountryCitySelectProps<T>) {
  const { t } = useTranslation();
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);

  useEffect(() => {
    const loadCountries = async () => {
      setLoadingCountries(true);
      const data = await fetchCountries();
      setCountries(data);
      setLoadingCountries(false);
    };
    loadCountries();
  }, []);

  useEffect(() => {
    const loadStates = async () => {
      if (countryValue) {
        setLoadingStates(true);
        const data = await fetchStates(countryValue);
        setStates(data);
        setLoadingStates(false);
      } else {
        setStates([]);
      }
    };
    loadStates();
  }, [countryValue]);

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", width: "100%" }}>
      {/* Country Select */}
      <Box sx={{ minWidth: 250, flex: 1 }}>
        <Controller
          name={countryField.name as Path<T>}
          control={control}
          rules={countryField.rules}
          render={({ field: controllerField, fieldState: { error } }) => {
            const hasError = !!error;
            const helperText = hasError ? t(error.message ?? "") : "";
            const helperId = `${countryField.name}-helper`;

            return (
              <FormControl fullWidth error={hasError}>
                <InputLabel id={`${countryField.name}-label`}>
                  {t(countryField.label)}
                </InputLabel>
                <Select
                  {...controllerField}
                  labelId={`${countryField.name}-label`}
                  label={t(countryField.label)}
                  aria-invalid={hasError}
                  aria-describedby={helperId}
                  disabled={loadingCountries}
                >
                  {loadingCountries ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} />
                    </MenuItem>
                  ) : (
                    countries.map((country) => (
                      <MenuItem key={country.iso2} value={country.iso2}>
                        {country.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {hasError && (
                  <FormHelperText id={helperId}>{helperText}</FormHelperText>
                )}
              </FormControl>
            );
          }}
        />
      </Box>

      {/* State Select */}
      <Box sx={{ minWidth: 250, flex: 1 }}>
        <Controller
          name={stateField.name as Path<T>}
          control={control}
          rules={stateField.rules}
          render={({ field: controllerField, fieldState: { error } }) => {
            const hasError = !!error;
            const helperText = hasError ? t(error.message ?? "") : "";
            const helperId = `${stateField.name}-helper`;

            return (
              <FormControl fullWidth error={hasError}>
                <InputLabel id={`${stateField.name}-label`}>
                  {t(stateField.label)}
                </InputLabel>
                <Select
                  {...controllerField}
                  labelId={`${stateField.name}-label`}
                  label={t(stateField.label)}
                  aria-invalid={hasError}
                  aria-describedby={helperId}
                  disabled={!countryValue || loadingStates}
                >
                  {loadingStates ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} />
                    </MenuItem>
                  ) : states.length > 0 ? (
                    states.map((state) => (
                      <MenuItem key={state.state_code} value={state.name}>
                        {state.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>
                      {countryValue ? t("common.noStatesAvailable") : t("common.selectCountryFirst")}
                    </MenuItem>
                  )}
                </Select>
                {hasError && (
                  <FormHelperText id={helperId}>{helperText}</FormHelperText>
                )}
              </FormControl>
            );
          }}
        />
      </Box>
    </Box>
  );
}
