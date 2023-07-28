import { CodeableConcept } from "./index"
export const LocationCols = [
    { label: "ID", name: "id", type: "string" },
    { lable: "Status", name: "status", type: "string" },
    { label: "Name", name: "name", type: "string" },
    { label: "Description", name: "description", type: "string" },
    { label: "Type", name: "type", type: "object", cchildrens: CodeableConcept },
    { label: "Mode", name: "mode", type: "string" },
    { label: "From", name: "from", type: "object", childrens: CodeableConcept },
    { label: "ManagingOrganization	", name: "managingOrganization	", type: "Reference" },
]