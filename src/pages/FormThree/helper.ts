import type { FieldConfig } from "../FormOne/helper";

export const situationFields: FieldConfig[] = [
  {
    name: "financialSituation",
    label: "situation.financialSituation",
    type: "textarea",
    component: "TextAreaWithAI",
    rules: { required: "errors.required" },
  },

  {
    name: "employmentCircumstances",
    label: "situation.employmentCircumstances",
    type: "textarea",
    component: "TextAreaWithAI",
    rules: { required: "errors.required" },
  },

  {
    name: "reasonForApplying",
    label: "situation.reasonForApplying",
    type: "textarea",
    component: "TextAreaWithAI",
    rules: { required: "errors.required" },
  },
];
