import { useParams, useNavigate } from "react-router";
import FormWrapper from "../../components/Forms/FormWrapper";
import { personalInfoFields } from "./helper";
import RenderField from "../../components/Forms/FormFieldRenderer";
import { useForm } from "react-hook-form";
import useAppTranslation from "../../hooks/useAppTranslation";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Box } from "@mui/material";

export default function FormOne() {
  const { lang } = useParams();
  const { t } = useAppTranslation();
  const navigate = useNavigate();
  const currentLang = lang || "en";

  const [applicationData, setApplicationData] = useLocalStorage(
    "applicationData",
    {}
  );

  const { control, handleSubmit } = useForm({
    defaultValues: applicationData.personalInfo || {},
  });

  const handleBack = () => {
    navigate(`/${currentLang}/home`);
  };

  const handleNext = handleSubmit((data) => {
    setApplicationData({ ...applicationData, personalInfo: data });
    navigate(`/${currentLang}/apply/second`);
  });

  return (
    <FormWrapper
      title={t("personal.heading")}
      step={1}
      totalSteps={3}
      onBack={handleBack}
      onNext={handleNext}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {personalInfoFields.map((field) => (
          <RenderField key={field.name} field={field} control={control} />
        ))}
      </Box>
    </FormWrapper>
  );
}
