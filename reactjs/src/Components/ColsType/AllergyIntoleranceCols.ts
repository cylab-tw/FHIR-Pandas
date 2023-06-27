import {CodeableConcept} from "./index"
import { PatientCols } from "./PatientCols"
import { ObservationCols } from "./ObservationCols"

export const AllergyIntoleranceCols = [
    { label: "ID", name: "id", type: "string" },
    { label: "ClinicalStatus", name: "clinicalStatus", type: "object" ,childrens:CodeableConcept},
    { label: "VerificationStatus", name: "verificationStatus", type: "object",childrens:CodeableConcept },
    { label: "Type", name: "type",  type: "object",childrens:CodeableConcept},
    { label: "Category", name: "category", type: "array" },
    { label: "Code", name: "code", type: "object",childrens:CodeableConcept },
    { label: "Patient", name: "patient", type: "Reference" },
]