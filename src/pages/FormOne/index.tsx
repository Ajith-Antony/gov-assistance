import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import FormWrapper from "../../components/Forms/FormWrapper";
import { personalInfoFields } from "./helper";
import RenderField from "../../components/Forms/FormFieldRenderer";
import { useForm } from "react-hook-form";
import useAppTranslation from "../../hooks/useAppTranslation";
import useLocalStorage from "../../hooks/useLocalStorage";
import useAutoSave from "../../hooks/useAutoSave";
import { Box } from "@mui/material";
import { STORAGE_KEYS } from "../../constants";

export default function FormOne() {
  const { lang } = useParams();
  const { t } = useAppTranslation();
  const navigate = useNavigate();
  const currentLang = lang || "en";

  const [applicationData, setApplicationData] = useLocalStorage<Record<string, unknown>>(
    STORAGE_KEYS.APPLICATION_DATA,
    {}
  );

  const { control, handleSubmit, watch } = useForm({
    defaultValues: (applicationData.personalInfo as Record<string, unknown>) || {},
  });

  // Watch country value for dependent state dropdown
  const countryValue = watch("country") as string | undefined;

  // Auto-save form data on change (debounced)
  const formData = watch();
  useAutoSave(
    `${STORAGE_KEYS.APPLICATION_DATA}_personalInfo`,
    formData,
    true
  );

  // Update applicationData when form changes (for final submission)
  useEffect(() => {
    setApplicationData({ ...applicationData, personalInfo: formData });
  }, [formData]); // Only update when formData changes

  const handleBack = () => {
    navigate(`/${currentLang}/home`);
  };

  const handleNext = handleSubmit((data) => {
    setApplicationData({ ...applicationData, personalInfo: data });
    navigate(`/${currentLang}/apply/second`);
  });

  // Find country and state fields for CountryCitySelect
  const countryField = personalInfoFields.find((f) => f.name === "country");
  const stateField = personalInfoFields.find((f) => f.name === "state");

  return (
    <FormWrapper
      title={t("personal.heading")}
      step={1}
      totalSteps={3}
      onBack={handleBack}
      onNext={handleNext}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {personalInfoFields.map((field) => {
          // Skip state field as it will be rendered with country
          if (field.name === "state") return null;

          // Render country with state together
          if (field.name === "country" && countryField && stateField) {
            return (
              <RenderField
                key="country-state"
                field={countryField}
                control={control}
                countryValue={countryValue}
                relatedFields={{
                  countryField,
                  stateField,
                }}
              />
            );
          }

          return <RenderField key={field.name} field={field} control={control} />;
        })}
      </Box>
    </FormWrapper>
  );
}
