import { useParams, useNavigate } from "react-router";
import FormWrapper from "../../components/Forms/FormWrapper";
import { personalInfoFields } from "./helper";
import RenderField from "../../components/Forms/FormFieldRenderer";
import CountryCitySelect from "../../components/Forms/CountryCitySelect";
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

  // Auto-save form data on change (debounced)
  const formData = watch();
  useAutoSave(
    STORAGE_KEYS.APPLICATION_DATA,
    { ...applicationData, personalInfo: formData },
    true
  );

  const handleBack = () => {
    navigate(`/${currentLang}/home`);
  };

  const handleNext = handleSubmit((data) => {
    setApplicationData({ ...applicationData, personalInfo: data });
    navigate(`/${currentLang}/apply/second`);
  });

  // Get country and state fields from personalInfoFields
  const countryField = personalInfoFields.find((f) => f.name === "country");
  const stateField = personalInfoFields.find((f) => f.name === "state");

  return (
    <FormWrapper
      title={t("form.personalInfo")}
      step={1}
      totalSteps={3}
      onBack={handleBack}
      onNext={handleNext}
      showBackButton={false}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {personalInfoFields.map((field) => {
          // Skip state field as it's rendered with country
          if (field.name === "state") {
            return null;
          }

          // Render country with state together
          if (field.name === "country" && countryField && stateField) {
            return (
              <Box
                key="country-state-wrapper"
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "nowrap",
                  width: "100%",
                }}
              >
                <CountryCitySelect
                  control={control}
                  countryField={countryField}
                  stateField={stateField}
                />
              </Box>
            );
          }

          return <RenderField key={field.name} field={field} control={control} />;
        })}
      </Box>
    </FormWrapper>
  );
}
