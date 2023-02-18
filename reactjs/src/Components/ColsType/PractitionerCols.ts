import {
    CodeableConcept,
    Narrative,
    Name,
    Telecom,
    TWCoreAddress,
    Attachment,
} from "./index";

export const PractitionerCols = [
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
        ],
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
    {
        label: "Address",
        name: "address",
        type: "array",
        childrens: TWCoreAddress,
    },
    {
        label: "Gender",
        name: "gender",
        type: "string",
    },
    {
        label: "BirthDate",
        name: "birthDate",
        type: "string",
    },
    {
        label: "Photo",
        name: "photo",
        type: "array",
        childrens: Attachment,
    },
];
