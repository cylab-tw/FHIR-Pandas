

export const MedicationDispenseCols = [
    { label: "ID", name: "id", type: "string" },
    { label: "Status", name: "status", type: "string" },
    { label: "Medication", name: "medicationReference", type: "Reference" },
    { label: "Subject", name: "subject", type: "Reference" },
    { label: "WhenPrepared", name: "whenPrepared", type: "string" },
]