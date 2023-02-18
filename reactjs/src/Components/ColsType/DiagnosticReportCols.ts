import { Narrative, CodeableConcept, Reference } from "./index";

export const DiagnosticReportCols = [
    { label: "ID", name: "id", type: "string" },
    {
        label: "Text",
        name: "text",
        type: "object",
        childrens: Narrative,
    },
    {
        label: "Status",
        name: "status",
        type: "string",
    },
    {
        label: "Category",
        name: "category",
        type: "array",
        childrens: CodeableConcept,
    },
    {
        label: "Code",
        name: "code",
        type: "object",
        childrens: CodeableConcept,
    },
    {
        label: "Subject",
        name: "subject",
        type: "object",
        childrens: Reference,
    },
    {
        label: "EffectiveDateTime",
        name: "effectiveDateTime",
        type: "string",
    },
    { label: "Issued", name: "issued", type: "string" },
    {
        label: "Performer",
        name: "performer",
        type: "array",
        childrens: Reference,
    },
    {
        label: "Result",
        name: "result",
        type: "array",
        childrens: Reference,
    },
    {
        label: "Conclusion",
        name: "conclusion",
        type: "string",
    },
];
