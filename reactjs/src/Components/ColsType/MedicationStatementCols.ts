import { CodeableConcept } from "./index"

export const MedicationStatementCols = [
    { label: "ID", name: "id", type: "string" },
    { label: "Status", name: "status", type: "string" },
    { label: "Category", name: "category", type: "object", childrens: CodeableConcept },
    { label: "Medication", name: "medication", type: "Reference" },
    { label: "Subject", name: "subject", type: "Reference" },
    { label: "Encounter", name: "encounter", type: "Reference" },
    { label: "DateAsserted", name: "dateAsserted", type: "string" },
]