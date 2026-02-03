import { useParams, useNavigate } from "react-router";
import FormWrapper from "../../components/Forms/FormWrapper";
import { situationFields } from "./helper";
import { useForm } from "react-hook-form";
import RenderField from "../../components/Forms/FormFieldRenderer";
import useAppTranslation from "../../hooks/useAppTranslation";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function FormThree() {
  const { lang } = useParams();
  const [applicationData, setApplicationData, removeValue] = useLocalStorage(
    "applicationData",
    {}
  );
  const { t } = useAppTranslation();
  const navigate = useNavigate();
  const currentLang = lang || "en";

  const { control, handleSubmit } = useForm({
    defaultValues: applicationData.situationInfo || {},
  });

  const handleBack = () => {
    navigate(`/${currentLang}/apply/second`);
  };

  const handleNext = async (data) => {
    try {
      setApplicationData({ ...applicationData, situationInfo: data });
      const response = await submitForm();

      if (response.success) {
        removeValue();
        navigate(`/${currentLang}/apply/done?status=success`);
      } else {
        navigate(`/${currentLang}/apply/done?status=error`);
      }
    } catch (error) {
      navigate(`/${currentLang}/apply/done?status=error`);
    }
  };

  const submitForm = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: Math.random() > 0.5 });
      }, 1000);
    });
  };

  return (
    <FormWrapper
      title={t("situation.heading")}
      step={3}
      totalSteps={3}
      onBack={handleBack}
      onNext={handleSubmit(handleNext)}
      nextButtonText="common.submit"
    >
      {situationFields.map((field) => (
        <RenderField key={field.name} field={field} control={control} />
      ))}
    </FormWrapper>
  );
}
