export const familyFinancialFields = [
  {
    name: "maritalStatus",
    label: "financial.maritalStatus",
    type: "select",
    component: "Select",
    rules: { required: "errors.required" },
    options: [
      { value: "single", label: "financial.marital_single" },
      { value: "married", label: "financial.marital_married" },
      { value: "divorced", label: "financial.marital_divorced" },
      { value: "widowed", label: "financial.marital_widowed" },
    ],
  },

  {
    name: "dependents",
    label: "financial.dependents",
    type: "number",
    component: "TextField",
    rules: {
      required: "errors.required",
      min: 0,
      max: 20,
    },
  },

  {
    name: "employmentStatus",
    label: "financial.employmentStatus",
    type: "select",
    component: "Select",
    rules: { required: "errors.required" },
    options: [
      { value: "employed", label: "financial.employed" },
      { value: "selfEmployed", label: "financial.selfEmployed" },
      { value: "unemployed", label: "financial.unemployed" },
      { value: "student", label: "financial.student" },
      { value: "retired", label: "financial.retired" },
    ],
  },

  {
    name: "monthlyIncome",
    label: "financial.monthlyIncome",
    type: "number",
    component: "TextField",
    rules: {
      required: "errors.required",
      min: 0,
    },
  },

  {
    name: "housingStatus",
    label: "financial.housingStatus",
    type: "select",
    component: "Select",
    rules: { required: "errors.required" },
    options: [
      { value: "rent", label: "financial.housing_rent" },
      { value: "own", label: "financial.housing_own" },
      { value: "family", label: "financial.housing_family" },
      { value: "temporary", label: "financial.housing_temporary" },
    ],
  },
];
