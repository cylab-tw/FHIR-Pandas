import { CodeableConcept } from "./index"

export const ImagingStudyCols = [
    { label: "ID", name: "id", type: "string" },
    { label: "Status", name: "status", type: "string" },
    { label: "Modality", name: "modality", type: "object", childrens: CodeableConcept },
    { label: "Subject", name: "subject", type: "Reference" },
    { label: "Encounter", name: "encounter", type: "Reference" },
    { label: "Started", name: "started", type: "string" },
    { label: "BasedOn", name: "basedOn", type: "Reference" },
    { label: "PartOf", name: "partOf", type: "array" },
    { label: "Referrer", name: "referrer", type: "Reference" },
    { label: "Endpoint", name: "endpoint", type: "array" },
    { label: "NumberOfSeries", name: "numberOfSeries", type: "string" },
    { label: "NumberOfInstances", name: "numberOfInstances", type: "string" },
    { label: "ProcedureReference", name: "procedureReference", type: "array" },
    { label: "Location", name: "location", type: "Reference" },
    { label: "Reason", name: "reason", type: "array" },
    { label: "Note", name: "note", type: "array" },
    { label: "Description", name: "description", type: "string" },
    { label: "Series", name: "series", type: "array" },
]