import { useParams, useNavigate } from "react-router";
import FormWrapper from "../../components/Forms/FormWrapper";
import { familyFinancialFields } from "./helper";
import RenderField from "../../components/Forms/FormFieldRenderer";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Box } from "@mui/material";

export default function FormTwo() {
  const { lang } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentLang = lang || "en";

  const [applicationData, setApplicationData] = useLocalStorage(
    "applicationData",
    {}
  );

  const { control, handleSubmit } = useForm({
    defaultValues: applicationData.financialInfo || {},
  });

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
