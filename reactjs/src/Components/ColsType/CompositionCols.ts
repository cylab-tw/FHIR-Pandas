import { CodeableConcept, Reference } from "./index"

export const CompositionCols = [
    { label: "ID", name: "id", type: "string" },
    { label: "Url", name: "url", type: "string" },
    { label: "Status", name: "status", type: "string" },
    { label: "Version", name: "version", type: "string" },
    { label: "Type", name: "type", type: "object", childrens: CodeableConcept },
    { label: "Category", name: "category", type: "object", childrens: CodeableConcept },
    { label: "Subject", name: "subject", type: "Reference" },
    { label: "Encounter", name: "encounter", type: "Reference" },
    { label: "Date", name: "date", type: "string" },
    { label: "Author", name: "author", type: "array" },
    { label: "Name", name: "name", type: "string" },
    { label: "Title", name: "title", type: "string" },
    { label: "Custodian", name: "custodian", type: "Reference" },
    { label: "Event", name: "event", type: "array" },
    { label: "Section", name: "section", type: "array" },
]