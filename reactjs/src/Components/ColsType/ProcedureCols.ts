import {
    CodeableConcept,
    Narrative,
    Reference,
} from "./index";

export const ProcedureCols = [
    { label: "ID", name: "id", type: "string" },
    { label: "Text", name: "text", type: "object", childrens: Narrative },
    { label: "Status", name: "status", type: "string" },
    { label: "Code", name: "code", type: "object", childrens: CodeableConcept },
    { label: "PerformedDateTime", name: "performedDateTime", type: "string" },
    {
        label: "Asserter",
        name: "asserter",
        type: "object",
        childrens: Reference,
    },
    {
        label: "Performer",
        name: "performer",
        type: "array",
        childrens: [
            {
                label: "Actor",
                name: "actor",
                type: "object",
                childrens: Reference,
            },
            {
                label: "OnBehalfOf",
                name: "onBehalfOf",
                type: "object",
                childrens: Reference,
            },
        ],
    },
    {
        label: "BodySite",
        name: "bodySite",
        type: "array",
        childrens: CodeableConcept,
    },
];
