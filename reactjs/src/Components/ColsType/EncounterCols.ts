import {
    Narrative,
    Identifier,
    CodeableConcept,
    CodingTW,
    Reference,
    Period,
} from "./index";

export const EncounterCols = [
    { label: "ID", name: "id", type: "string" },
    {
        label: "Text",
        name: "text",
        type: "object",
        childrens: Narrative,
    },
    {
        label: "Identifier",
        name: "identifier",
        type: "array",
        childrens: [
            { label: "system", name: "system", type: "string" },
            { label: "value", name: "value", type: "string" },
        ],
    },
    {
        label: "Status",
        name: "status",
        type: "string",
    },
    {
        label: "Class",
        name: "class",
        type: "object",
        childrens: CodingTW,
    },
    {
        label: "ServiceType",
        name: "serviceType",
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
        label: "Participant",
        name: "participant",
        type: "array",
        childrens: [
            {
                label: "Type",
                name: "type",
                type: "array",
                childrens: CodeableConcept,
            },
            {
                label: "Period",
                name: "period",
                type: "object",
                childrens: Period,
            },
            {
                label: "Individual",
                name: "individual",
                type: "object",
                childrens: Reference,
            },
        ],
    },
    {
        label: "Period",
        name: "period",
        type: "object",
        childrens: Period,
    },
    {
        label: "ReasonCode",
        name: "reasonCode",
        type: "array",
        childrens: CodeableConcept,
    },
    {
        label: "Hospitalization",
        name: "hospitalization",
        type: "object",
        childrens: [
            {
                label: "DischargeDisposition",
                name: "dischargeDisposition",
                type: "object",
                childrens: CodeableConcept,
            },
        ],
    },
    {
        label: "Location",
        name: "location",
        type: "array",
        childrens: [
            {
                label: "Location",
                name: "location",
                type: "object",
                childrens: Reference,
            },
        ],
    },
    {
        label: "ServiceProvider",
        name: "serviceProvider",
        type: "object",
        childrens: Reference,
    },
];
