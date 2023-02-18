import {
    Narrative,
    Identifier,
    CodeableConcept,
    Reference,
    Annotation,
    Dosage,
    Period,
    Duration,
} from "./index";

export const MedicationRequestCols = [
    { label: "ID", name: "id", type: "string" },
    { label: "Text", name: "text", type: "object", childrens: Narrative },
    {
        label: "Identifier",
        name: "identifier",
        type: "array",
        childrens: Identifier,
    },
    { label: "Status", name: "status", type: "string" },
    { label: "Intent", name: "intent", type: "string" },
    {
        label: "Category",
        name: "category",
        type: "array",
        childrens: CodeableConcept,
    },
    {
        label: "Medication",
        name: "medication",
        type: "object",
        childrens: [
            {
                label: "MedicationCodeableConcept",
                name: "medicationCodeableConcept",
                type: "object",
                childrens: CodeableConcept,
            },
            {
                label: "MedicationReference",
                name: "medicationReference",
                type: "object",
                childrens: Reference,
            },
        ],
    },
    {
        label: "NedicationCodeableConcept",
        name: "medicationCodeableConcept",
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
        label: "Encounter",
        name: "encounter",
        type: "object",
        childrens: Reference,
    },
    {
        label: "SupportingInformation",
        name: "supportingInformation",
        type: "array",
        childrens: Reference,
    },
    {
        label: "AuthoredOn",
        name: "authoredOn",
        type: "string",
    },
    {
        label: "Requester",
        name: "requester",
        type: "object",
        childrens: Reference,
    },
    {
        label: "ReasonReference",
        name: "reasonReference",
        type: "array",
        childrens: Reference,
    },
    {
        label: "Note",
        name: "note",
        type: "array",
        childrens: Annotation,
    },
    {
        label: "DosageInstruction",
        name: "dosageInstruction",
        type: "array",
        childrens: Dosage,
    },
    {
        label: "DispenseRequest",
        name: "dispenseRequest",
        type: "object",
        childrens: [
            {
                label: "ValidityPeriod",
                name: "validityPeriod",
                type: "object",
                childrens: Period,
            },
            {
                label: "NumberOfRepeatsAllowed",
                name: "numberOfRepeatsAllowed",
                type: "string",
            },
            {
                label: "ExpectedSupplyDuration",
                name: "expectedSupplyDuration",
                type: "object",
                childrens: Duration,
            },
        ],
    },
];
