import {
    Narrative,
    CodeableConcept,
    Reference,
    Quantity,
} from "./index";

export const ObservationCols = [
    { label: "ID", name: "id", type: "string" },
    { label: "Text", name: "text", type: "object", childrens: Narrative },
    { label: "Status", name: "status", type: "string" },
    {
        label: "Category",
        name: "category",
        type: "array",
        childrens: CodeableConcept,
    },
    { label: "Code", name: "code", type: "object", childrens: CodeableConcept },
    { label: "Subject", name: "subject", type: "object", childrens: Reference },
    { label: "Effective", name: "effective", type: "string" },
    {
        label: "Performer",
        name: "performer",
        type: "array",
        childrens: Reference,
    },
    { label: "Value", name: "value", type: "string" },
    {
        label: "Component",
        name: "component",
        type: "object",
        childrens: [
            {
                label: "ValueQuantity",
                name: "valueQuantity",
                type: "object",
                childrens: Quantity,
            },
        ],
    },
];
