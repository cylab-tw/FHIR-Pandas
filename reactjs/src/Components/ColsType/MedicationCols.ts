import { Narrative, CodeableConcept } from "./index";

export const MedicationCols = [
    { label: "ID", name: "id", type: "string" },
    {
        label: "Text",
        name: "text",
        type: "object",
        childrens: Narrative,
    },
    {
        label: "Code",
        name: "code",
        type: "object",
        childrens: CodeableConcept,
    },
    {
        label: "Form",
        name: "form",
        type: "object",
        childrens: CodeableConcept,
    },
];
