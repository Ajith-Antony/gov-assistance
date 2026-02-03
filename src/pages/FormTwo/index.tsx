import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import FormWrapper from "../../components/Forms/FormWrapper";
import { familyFinancialFields } from "./helper";
import RenderField from "../../components/Forms/FormFieldRenderer";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useLocalStorage from "../../hooks/useLocalStorage";
import useAutoSave from "../../hooks/useAutoSave";
import { Box } from "@mui/material";
import { STORAGE_KEYS } from "../../constants";

export default function FormTwo() {
  const { lang } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentLang = lang || "en";

  const [applicationData, setApplicationData] = useLocalStorage(
    STORAGE_KEYS.APPLICATION_DATA,
    {}
  );

  const { control, handleSubmit, watch } = useForm({
    defaultValues: applicationData.financialInfo || {},
  });

  // Auto-save form data on change (debounced)
  const formData = watch();
  useAutoSave(
    `${STORAGE_KEYS.APPLICATION_DATA}_financialInfo`,
    formData,
    true
  );

  const handleBack = () => {
    navigate(`/${currentLang}/apply/first`);
  };

  const handleNext = handleSubmit((data) => {
    setApplicationData({ ...applicationData, financialInfo: data });
    navigate(`/${currentLang}/apply/third`);
  });

  return (
    <FormWrapper
      title={t("financial.heading")}
      step={2}
      totalSteps={3}
      onBack={handleBack}
      onNext={handleNext}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {familyFinancialFields.map((field) => (
          <RenderField key={field.name} field={field} control={control} />
        ))}
      </Box>
    </FormWrapper>
  );
}
