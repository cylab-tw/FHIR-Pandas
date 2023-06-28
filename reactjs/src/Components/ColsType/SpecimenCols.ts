import { CodeableConcept } from "./index"

const collection = [
    { label: "Collector", name: "collector", type: "Reference" },
    { label: "Duration", name: "duration", type: "object" },
]

export const SpecimenCols = [
    { label: "ID", name: "id", type: "string" },
    { label: "AccessionIdentifier", name: "accessionIdentifier", type: "string" },
    { label: "Status", name: "status", type: "string" },
    { label: "Type", name: "type", type: "object", childrens: CodeableConcept },
    { label: "Subject", name: "subject", type: "Reference" },
    { label: "ReceivedTime", name: "receivedTime", type: "string" },
    { label: "Combined", name: "combined", type: "string" },
    { label: "Collection", name: "collection", type: "object", childrens: collection },
    { label: "Condition", name: "condition", type: "object", childrens: CodeableConcept },
]

