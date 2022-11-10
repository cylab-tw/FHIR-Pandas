module.exports = {
    "Condition": ["text", "clinicalStatus", "verificationStatus", "category", "severity", "code", "bodySite", "subject", "onset[x]", "abatement[x]", "asserter"],
    "DiagnosticReport": ["text", "status", "category", "code", "subject", "effective[x]", "issued", "performer", "result"],
    "Encounter": ["text", "identifier", "status", "class", "serviceType", "subject", "participant", "period", "reasonCode", "dischargeDisposition", "location"],
    "Medication": ["text", "code", "form"],
    "MedicationRequest": ["text", "identifier", "status", "intent", "category", "medication[x]", "subject", "encounter", "authoredOn", "requester", "reasonReference", "note", "dosageInstruction", "dispenseRequest", "dispenseRequest.validityPeriod", "dispenseRequest.numberOfRepeatsAllowed", "dispenseRequest.expectedSupplyDuration"],
    "Observation": ["text", "resultStatus", "category", "observationCode", "subject", "dateTime", "performer", "results", "subResults"],
    "Organization": ["text", "identifier", "active", "organizationType", "name", "telecom"],
    "Patient": ["text", "identifier", "name", "telecom", "gender", "birthDate", "address", "contact", "organization"],
    "Practitioner": ["text", "identifier", "active", "name", "telecom", "address", "gender", "birthDate", "photo"],
    "Procedure": ["text", "status", "code", "subject", "performedDateTime", "asserter", "performer", "bodySite"],
}