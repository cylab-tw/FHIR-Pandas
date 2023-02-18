import {
    CodeableConcept,
    Narrative,
    Name,
    Telecom,
    Period,
    TWCoreAddress,
    Reference,
    Identifier,
    Attachment,
} from "./index";

export const PatientCols = [
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
        childrens: Identifier,
    },
    {
        label: "Active",
        name: "active",
        type: "boolean",
    },
    {
        label: "Name",
        name: "name",
        type: "array",
        childrens: Name,
    },
    {
        label: "Telecom",
        name: "telecom",
        type: "array",
        childrens: Telecom,
    },
    { label: "Gender", name: "gender", type: "string" },
    { label: "BirthDate", name: "birthDate", type: "string" },
    {
        label: "Address",
        name: "address",
        type: "array",
        childrens: TWCoreAddress,
    },
    {
        label: "MaritalStatus",
        name: "maritalStatus",
        type: "object",

        childrens: CodeableConcept,
    },
    {
        label: "Photo",
        name: "photo",
        type: "array",
        childrens: Attachment,
    },
    {
        label: "Contact",
        name: "contact",
        type: "array",
        childrens: [
            {
                label: "RelationShip",
                name: "relationShip",
                type: "array",
                childrens: CodeableConcept,
            },
            {
                label: "Name",
                name: "name",
                type: "array",
                childrens: Name,
            },
            {
                label: "Telecom",
                name: "telecom",
                type: "array",
                childrens: Telecom,
            },
            {
                label: "Period",
                name: "period",
                type: "object",
                childrens: Period,
            },
        ],
    },
    {
        label: "Communication",
        name: "communication",
        type: "array",
        childrens: [
            {
                label: "Language",
                name: "language",
                type: "object",
                childrens: CodeableConcept,
            },
        ],
    },
    {
        label: "ManagingOrganization",
        name: "managingOrganization",
        type: "object",
        childrens: Reference,
    },
];
