export const personalInfoFields = [
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
      validate: (value) => {
        if (!value) return true;
        const selectedDate = new Date(value);
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
  {
    name: "address",
    label: "personal.address",
    type: "text",
    component: "TextField",
    rules: { required: "errors.required" },
  },
  {
    name: "city",
    label: "personal.city",
    type: "text",
    component: "TextField",
    rules: { required: "errors.required" },
  },
  {
    name: "state",
    label: "personal.state",
    type: "text",
    component: "TextField",
    rules: { required: "errors.required" },
  },
  {
    name: "country",
    label: "personal.country",
    type: "select",
    component: "Select",
    options: [
      { value: "ae", label: "countries.ae" },
      { value: "us", label: "countries.us" },
      { value: "uk", label: "countries.uk" },
    ],
    rules: { required: "errors.required" },
  },
  {
    name: "phone",
    label: "personal.phone",
    type: "text",
    component: "TextField",
    rules: {
      required: "errors.required",
      pattern: {
        value: /^[0-9]{8,15}$/,
        message: "errors.invalidPhone",
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
