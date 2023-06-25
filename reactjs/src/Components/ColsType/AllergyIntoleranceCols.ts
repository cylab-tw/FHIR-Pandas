import { PatientCols } from "./PatientCols"
import { ObservationCols } from "./ObservationCols"

export const AllergyIntoleranceCols = [
    { label: "ID", name: "id", type: "string" },
    { label: "Type", name: "type", type: "string" },
    { label: "Patient", name: "patient", type: "object",childrens: PatientCols },
    { label: "Reaction", name: "reaction", type: "array",childrens:[{ label: "Manifestation", name: "manifestation", type: "object", childrens:ObservationCols},{ label: "Severity", name: "severity", type: "string" }]},
]