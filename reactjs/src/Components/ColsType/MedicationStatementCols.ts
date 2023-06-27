import { CodeableConcept } from "./index"
import { MedicationCols } from "./MedicationCols"
import { PatientCols } from "./PatientCols"
import { EncounterCols } from "./EncounterCols"

export const MedicationStatementCols = [
    { label: "ID", name: "id", type: "string" },
    { label: "Status", name: "status", type: "string" },
    { label: "Category", name: "category", type: "object" ,childrens:CodeableConcept},
    { label: "Medication", name: "medication", type: "object",childrens:MedicationCols },
    { label: "Subject", name: "subject",  type: "object" , childrens: PatientCols},
    { label: "Encounter", name: "encounter", type: "object",childrens:EncounterCols },
    { label: "DateAsserted", name: "dateAsserted", type: "string" },
]