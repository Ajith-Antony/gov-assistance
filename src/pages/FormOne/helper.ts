export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: string;
  component: string;
  options?: FieldOption[];
  rules?: {
    required?: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    validate?: (value: unknown) => boolean | string;
  };
}

export const personalInfoFields: FieldConfig[] = [
  {
    name: "fullName",
    label: "personal.fullName",
    type: "text",
    component: "TextField",
    rules: { required: "errors.required" },
  },
  {
    name: "nationalId",
    label: "personal.nationalId",
    type: "text",
    component: "TextField",
    rules: { required: "errors.required" },
  },
  {
    name: "dateOfBirth",
    label: "personal.dateOfBirth",
    type: "date",
    component: "DatePicker",
    rules: {
      required: "errors.required",
      validate: (value: unknown) => {
        if (!value) return true;
        const selectedDate = new Date(value as string);
        const today = new Date();
        return selectedDate < today || "errors.dateInFuture";
      },
    },
  },
  {
    name: "gender",
    label: "personal.gender",
    type: "select",
    component: "Select",
    options: [
      { value: "male", label: "personal.gender_male" },
      { value: "female", label: "personal.gender_female" },
    ],
    rules: { required: "errors.required" },
  },
  // Country and State will be rendered together using CountryCitySelect
  {
    name: "country",
    label: "personal.country",
    type: "select",
    component: "CountryCitySelect", // Special marker for grouped rendering
    rules: { required: "errors.required" },
  },
  {
    name: "state",
    label: "personal.state",
    type: "select",
    component: "CountryCitySelect", // Will be rendered with country
    rules: { required: "errors.required" },
  },
  {
    name: "address",
    label: "personal.address",
    type: "text",
    component: "TextField",
    rules: { required: "errors.required" },
  },
  {
    name: "phone",
    label: "personal.phone",
    type: "tel",
    component: "PhoneNumberInput",
    rules: {
      required: "errors.required",
      validate: (value: unknown) => {
        const phoneValue = value as string;
        if (!phoneValue) return "errors.required";
        // Basic validation - react-phone-number-input handles detailed validation
        if (phoneValue.length < 8) return "errors.invalidPhone";
        return true;
      },
    },
  },
  {
    name: "email",
    label: "personal.email",
    type: "email",
    component: "TextField",
    rules: {
      required: "errors.required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "errors.invalidEmail",
      },
    },
  },
];
