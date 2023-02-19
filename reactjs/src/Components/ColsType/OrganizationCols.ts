import {
    Narrative,
    Identifier,
    CodeableConcept,
    CodingTW,
    Reference,
    Quantity,
    Annotation,
    Period,
    Dosage,
} from "./index";

export const OrganizationCols = [
    { label: "ID", name: "id", type: "string" },
    { label: "Text", name: "text", type: "object", childrens: Narrative },
    {
        label: "Identifier",
        name: "identifier",
        type: "array",
        childrens: [
            { label: "Use", name: "use", type: "string" },
            {
                label: "Type",
                name: "type",
                type: "object",
                childrens: CodeableConcept,
            },
            { label: "System", name: "system", type: "string" },
            { label: "Value", name: "value", type: "string" },
            { label: "Active", name: "active", type: "boolean" },
            {
                label: "Type",
                name: "type",
                type: "object",
                childrens: CodeableConcept,
            },
            { label: "Name", name: "name", type: "string" },
            {
                label: "Telecom",
                name: "telecom",
                type: "array",
                childrens: [
                    { label: "System", name: "system", type: "string" },
                    { label: "Value", name: "value", type: "string" },
                ],
            },
        ],
    },
];
