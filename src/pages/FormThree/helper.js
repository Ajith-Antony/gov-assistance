export const situationFields = [
  {
    name: "financialSituation",
    label: "situation.financialSituation",
    type: "textarea",
    component: "TextAreaWithAI",
    ai: {
      prompt:
        "I am unemployed with no income. Help me describe my financial hardship.",
    },
    rules: { required: "errors.required" },
  },

  {
    name: "employmentCircumstances",
    label: "situation.employmentCircumstances",
    type: "textarea",
    component: "TextAreaWithAI",
    ai: {
      prompt:
        "I am unemployed with no income. Help me describe my employment circumstances.",
    },
    rules: { required: "errors.required" },
  },

  {
    name: "reasonForApplying",
    label: "situation.reasonForApplying",
    type: "textarea",
    component: "TextAreaWithAI",
    ai: {
      prompt:
        "I am unemployed with no income. Help me describe my reason for applying.",
    },
    rules: { required: "errors.required" },
  },
];
