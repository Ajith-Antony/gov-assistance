import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState, useEffect, Fragment } from "react";
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
      try {
        const data = await fetchCountries();
        console.log("Loaded countries:", data.length);
        setCountries(data);
      } catch (error) {
        console.error("Error loading countries:", error);
      } finally {
        setLoadingCountries(false);
      }
    };
    loadCountries();
  }, []);

  useEffect(() => {
    const loadStates = async () => {
      if (countryValue) {
        // Find the country name from the ISO2 code
        const selectedCountry = countries.find((c) => c.iso2 === countryValue);
        if (!selectedCountry) {
          console.warn("Country not found for ISO2:", countryValue);
          return;
        }

        console.log("Loading states for country:", selectedCountry.country);
        setLoadingStates(true);
        try {
          // API requires country name, not ISO2 code
          const data = await fetchStates(selectedCountry.country);
          console.log("Loaded states:", data.length);
          setStates(data);
        } catch (error) {
          console.error("Error loading states:", error);
          setStates([]);
        } finally {
          setLoadingStates(false);
        }
      } else {
        setStates([]);
      }
    };
    loadStates();
  }, [countryValue, countries]);

  return (
    <Fragment>
      {/* Country Select */}
      <Controller
        name={countryField.name as Path<T>}
        control={control}
        rules={countryField.rules}
        render={({ field: controllerField, fieldState: { error } }) => {
          const hasError = !!error;
          const helperText = hasError ? t(error.message ?? "") : "";
          const helperId = `${countryField.name}-helper`;

          return (
            <FormControl sx={{ minWidth: 250, flex: 1 }} error={hasError}>
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
                value={controllerField.value || ""}
                onChange={(e) => {
                  controllerField.onChange(e);
                  console.log("Country selected:", e.target.value);
                }}
              >
                {loadingCountries ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} />
                  </MenuItem>
                ) : countries.length > 0 ? (
                  countries.map((country) => (
                    <MenuItem key={country.iso2} value={country.iso2}>
                      {country.country}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>{t("common.noCountriesAvailable")}</MenuItem>
                )}
              </Select>
              {hasError && (
                <FormHelperText id={helperId}>{helperText}</FormHelperText>
              )}
            </FormControl>
          );
        }}
      />

      {/* State Select */}
      <Controller
        name={stateField.name as Path<T>}
        control={control}
        rules={stateField.rules}
        render={({ field: controllerField, fieldState: { error } }) => {
          const hasError = !!error;
          const helperText = hasError ? t(error.message ?? "") : "";
          const helperId = `${stateField.name}-helper`;

          return (
            <FormControl sx={{ minWidth: 250, flex: 1 }} error={hasError}>
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
                value={controllerField.value || ""}
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
    </Fragment>
  );
}
