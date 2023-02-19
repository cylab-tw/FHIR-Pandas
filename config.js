/*
	臺灣核心實作指引(TW Core IG)
	ID：TWCore
	Name：twcore.mohw.gov.tw
	Version：0.0.1
	Fhir Version：4.0.1
	Date：2022-09-07T20:47:29+08:00
	Url：https://twcore.mohw.gov.tw/fhir/ImplementationGuide/twcore.mohw.gov.tw
*/

// StructureDefinition Models
import TWConditionModel from '../data/definitions.json/StructureDefinition-TWConditionModel.json' assert { type: "json" }
import TWDiagnosticReportModel from '../data/definitions.json/StructureDefinition-TWDiagnosticReportModel.json' assert { type: "json" }
import TWEncounterModel from '../data/definitions.json/StructureDefinition-TWEncounterModel.json' assert { type: "json" }
import TWMedicationModel from '../data/definitions.json/StructureDefinition-TWMedicationModel.json' assert { type: "json" }
import TWMedicationRequestModel from '../data/definitions.json/StructureDefinition-TWMedicationRequestModel.json' assert { type: "json" }
import TWObservationModel from '../data/definitions.json/StructureDefinition-TWObservationModel.json' assert { type: "json" }
import TWOrganizationModel from '../data/definitions.json/StructureDefinition-TWOrganizationModel.json' assert { type: "json" }
import TWPatientModel from '../data/definitions.json/StructureDefinition-TWPatientModel.json' assert { type: "json" }
import TWPractitionerModel from '../data/definitions.json/StructureDefinition-TWPractitionerModel.json' assert { type: "json" }
import TWProcedureModel from '../data/definitions.json/StructureDefinition-TWProcedureModel.json' assert { type: "json" }

// StructureDefinition
import TWCoreAddress from '../data/definitions.json/StructureDefinition-Address-twcore.json' assert { type: "json" }
import CodeableConceptTW from '../data/definitions.json/StructureDefinition-CodeableConcept-tw.json' assert { type: "json" }
import CodingTW from '../data/definitions.json/StructureDefinition-Coding-tw.json' assert { type: "json" }
import TWCoreCondition from '../data/definitions.json/StructureDefinition-Condition-twcore.json' assert { type: "json" }
import TWCoreDiagnosticReport from '../data/definitions.json/StructureDefinition-DiagnosticReport-twcore.json' assert { type: "json" }
import TWCoreEncounter from '../data/definitions.json/StructureDefinition-Encounter-twcore.json' assert { type: "json" }
import TWCoreMedication from '../data/definitions.json/StructureDefinition-Medication-twcore.json' assert { type: "json" }
import TWCoreMedicationRequest from '../data/definitions.json/StructureDefinition-MedicationRequest-twcore.json' assert { type: "json" }
import TWCoreObservationBloodPressure from '../data/definitions.json/StructureDefinition-Observation-bloodPressure-twcore.json' assert { type: "json" }
import TWCoreObservationBMI from '../data/definitions.json/StructureDefinition-Observation-bmi-twcore.json' assert { type: "json" }
import TWCoreObservationLaboratoryResult from '../data/definitions.json/StructureDefinition-Observation-laboratoryResult-twcore.json' assert { type: "json" }
import TWCoreObservationVitalSigns from '../data/definitions.json/StructureDefinition-Observation-vitalSigns-twcore.json' assert { type: "json" }
import TWCoreOrganizationCo from '../data/definitions.json/StructureDefinition-Organization-co-twcore.json' assert { type: "json" }
import TWCoreOrganizationGovt from '../data/definitions.json/StructureDefinition-Organization-govt-twcore.json' assert { type: "json" }
import TWCoreOrganizationHosp from '../data/definitions.json/StructureDefinition-Organization-hosp-twcore.json' assert { type: "json" }
import TWCoreOrganization from '../data/definitions.json/StructureDefinition-Organization-twcore.json' assert { type: "json" }
import TWCorePatient from '../data/definitions.json/StructureDefinition-Patient-twcore.json' assert { type: "json" }
import PersonAge from '../data/definitions.json/StructureDefinition-person-age.json' assert { type: "json" }
import TWCorePractitioner from '../data/definitions.json/StructureDefinition-Practitioner-twcore.json' assert { type: "json" }
import TWCoreProcedure from '../data/definitions.json/StructureDefinition-Procedure-twcore.json' assert { type: "json" }
import TWAlley from '../data/definitions.json/StructureDefinition-tw-alley.json' assert { type: "json" }
import TWFloor from '../data/definitions.json/StructureDefinition-tw-floor.json' assert { type: "json" }
import TWLane from '../data/definitions.json/StructureDefinition-tw-lane.json' assert { type: "json" }
import TWNeighborhood from '../data/definitions.json/StructureDefinition-tw-neighborhood.json' assert { type: "json" }
import TWNumber from '../data/definitions.json/StructureDefinition-tw-number.json' assert { type: "json" }
import TWPostalCode from '../data/definitions.json/StructureDefinition-tw-postal-code.json' assert { type: "json" }
import TWRoom from '../data/definitions.json/StructureDefinition-tw-room.json' assert { type: "json" }
import TWSection from '../data/definitions.json/StructureDefinition-tw-section.json' assert { type: "json" }
import TWVillage from '../data/definitions.json/StructureDefinition-tw-village.json' assert { type: "json" }

// CodeSystem
import TWHealthProfessional from '../data/definitions.json/CodeSystem-health-professional-tw.json' assert { type: "json" }
import TW2014ICD10CM from '../data/definitions.json/CodeSystem-icd-10-cm-2014-tw.json' assert { type: "json" }
import TW2021ICD10CM from '../data/definitions.json/CodeSystem-icd-10-cm-2021-tw.json' assert { type: "json" }
import TW2014ICD10PCS from '../data/definitions.json/CodeSystem-icd-10-pcs-2014-tw.json' assert { type: "json" }
import TW2021ICD10PCS from '../data/definitions.json/CodeSystem-icd-10-pcs-2021-tw.json' assert { type: "json" }
import TWMaritalStatus from '../data/definitions.json/CodeSystem-marital-status-tw.json' assert { type: "json" }
import TWMedicalServicePayment from '../data/definitions.json/CodeSystem-medical-service-payment-tw.json' assert { type: "json" }
import TWMedicationDeviceFDA from '../data/definitions.json/CodeSystem-medication-device-fda-tw.json' assert { type: "json" }
import TWMedicationFDA from '../data/definitions.json/CodeSystem-medication-fda-tw.json' assert { type: "json" }
import TWMedicationFrequency from '../data/definitions.json/CodeSystem-medication-frequency-tw.json' assert { type: "json" }
import TWMedicationNHI from '../data/definitions.json/CodeSystem-medication-nhi-tw.json' assert { type: "json" }
import TWMedicationPath from '../data/definitions.json/CodeSystem-medication-path-tw.json' assert { type: "json" }
import TWOrganizationIdentifier from '../data/definitions.json/CodeSystem-organization-identifier-tw.json' assert { type: "json" }
import TWPostalCode3 from '../data/definitions.json/CodeSystem-postal-code3-tw.json' assert { type: "json" }
import TWPostalCode5 from '../data/definitions.json/CodeSystem-postal-code5-tw.json' assert { type: "json" }
import TWPostalCode6 from '../data/definitions.json/CodeSystem-postal-code6-tw.json' assert { type: "json" }
import TWIdentifierType_V20203 from '../data/definitions.json/CodeSystem-v2-0203.json' assert { type: "json" }

const config = (function () {
	return {
		/* Resource模型定義 */
		resource: {
			"Condition": TWConditionModel,
			"DiagnosticReport": TWDiagnosticReportModel,
			"Encounter": TWEncounterModel,
			"Medication": TWMedicationModel,
			"MedicationRequest": TWMedicationRequestModel,
			"Observation": TWObservationModel,
			"Organization": TWOrganizationModel,
			"Patient": TWPatientModel,
			"Practitioner": TWPractitionerModel,
			"Procedure": TWProcedureModel,
		},
		/* Resource顯示欄位 (預設為must support) */
		display: {
			"Condition": ["text","clinicalStatus","verificationStatus","category","severity","code","bodySite","subject","onset[x]","abatement[x]","asserter"],
			"DiagnosticReport": ["text","status","category","code","subject","effective[x]","issued","performer","result"],
			"Encounter": ["text","identifier","status","class","serviceType","subject","participant","period","reasonCode","dischargeDisposition","location"],
			"Medication": ["text","code","form"],
			"MedicationRequest": ["text","identifier","status","intent","category","medication[x]","subject","encounter","authoredOn","requester","reasonReference","note","dosageInstruction","dispenseRequest","dispenseRequest.validityPeriod","dispenseRequest.numberOfRepeatsAllowed","dispenseRequest.expectedSupplyDuration"],
			"Observation": ["text","resultStatus","category","observationCode","subject","dateTime","performer","results","subResults"],
			"Organization": ["text","identifier","active","organizationType","name","telecom"],
			"Patient": ["text","identifier","active","name","telecom","gender","birthDate","address","maritalStatus","photo","contact","communicationLanguage","organization"],
			"Practitioner": ["text","identifier","active","name","telecom","address","gender","birthDate","photo"],
			"Procedure": ["text","status","code","subject","performedDateTime","asserter","performer","bodySite"],
		},
		/* Resource詳細欄位定義 */
		structureDefinition: {
			"TWCoreAddress": TWCoreAddress,
			"CodeableConceptTW": CodeableConceptTW,
			"CodingTW": CodingTW,
			"TWCoreCondition": TWCoreCondition,
			"TWCoreDiagnosticReport": TWCoreDiagnosticReport,
			"TWCoreEncounter": TWCoreEncounter,
			"TWCoreMedication": TWCoreMedication,
			"TWCoreMedicationRequest": TWCoreMedicationRequest,
			"TWCoreObservationBloodPressure": TWCoreObservationBloodPressure,
			"TWCoreObservationBMI": TWCoreObservationBMI,
			"TWCoreObservationLaboratoryResult": TWCoreObservationLaboratoryResult,
			"TWCoreObservationVitalSigns": TWCoreObservationVitalSigns,
			"TWCoreOrganizationCo": TWCoreOrganizationCo,
			"TWCoreOrganizationGovt": TWCoreOrganizationGovt,
			"TWCoreOrganizationHosp": TWCoreOrganizationHosp,
			"TWCoreOrganization": TWCoreOrganization,
			"TWCorePatient": TWCorePatient,
			"PersonAge": PersonAge,
			"TWCorePractitioner": TWCorePractitioner,
			"TWCoreProcedure": TWCoreProcedure,
			"TWAlley": TWAlley,
			"TWFloor": TWFloor,
			"TWLane": TWLane,
			"TWNeighborhood": TWNeighborhood,
			"TWNumber": TWNumber,
			"TWPostalCode": TWPostalCode,
			"TWRoom": TWRoom,
			"TWSection": TWSection,
			"TWVillage": TWVillage,
		},
		codeSystem: {
			"TWHealthProfessional": TWHealthProfessional,
			"TW2014ICD10CM": TW2014ICD10CM,
			"TW2021ICD10CM": TW2021ICD10CM,
			"TW2014ICD10PCS": TW2014ICD10PCS,
			"TW2021ICD10PCS": TW2021ICD10PCS,
			"TWMaritalStatus": TWMaritalStatus,
			"TWMedicalServicePayment": TWMedicalServicePayment,
			"TWMedicationDeviceFDA": TWMedicationDeviceFDA,
			"TWMedicationFDA": TWMedicationFDA,
			"TWMedicationFrequency": TWMedicationFrequency,
			"TWMedicationNHI": TWMedicationNHI,
			"TWMedicationPath": TWMedicationPath,
			"TWOrganizationIdentifier": TWOrganizationIdentifier,
			"TWPostalCode3": TWPostalCode3,
			"TWPostalCode5": TWPostalCode5,
			"TWPostalCode6": TWPostalCode6,
			"TWIdentifierType_V20203": TWIdentifierType_V20203,
		},
		searchParameter: {
			"_common": {"_id":{"type":"token","description":"Resource id (not a full URL)"},"_lastUpdated":{"type":"date","description":"Date last updated. Server has discretion on the boundary precision"},"_tag":{"type":"token","description":"Search by a resource tag"},"_profile":{"type":"uri","description":"Search for all resources tagged with a profile"},"_security":{"type":"token","description":"Search by a security label"},"_source":{"type":"uri","description":"Identifies where the resource comes from"},"_list":{"type":"string","description":"All resources in nominated list (by id, Type/id, url or one of the magic List types)"},"_text":{"type":"string","description":"Text search against the narrative"},"_content":{"type":"string","description":"Text search against the entire resource"},"_has":{"type":"string","description":""},"_type":{"type":"string","description":""},"_query":{"type":"string","description":"Custom named query"}},
			"_result": {"_sort":{"type":"string","description":"Order to sort results in (can repeat for inner sort orders)"},"_count":{"type":"number","description":"Number of results per page"},"_summary":{"type":"string","description":"Just return the summary elements (for resources where this is defined)","code":["true","false"]},"_total":{"type":"string","description":"","code":["none","estimate","accurate"]},"_include":{"type":"string","description":"Other resources to include in the search results that search matches point to"},"_revinclude":{"type":"string","description":"Other resources to include in the search results when they refer to search matches"},"_elements":{"type":"string","description":"Specific set of elements be returned as part of a resource in the search results"},"_contained":{"type":"string","description":"Whether to return resources contained in other resources in the search matches","code":["true","false","both"]},"_containedType":{"type":"string","description":"If returning contained resources, whether to return the contained or container resource","code":["container","contained"]}},
			"Condition": {"abatement-date":{"type":"date","description":"解決/緩解的日期(abatement)"},"clinical-status":{"type":"token","description":"病情、問題或診斷的臨床狀態(clinicalStatus)"},"code":{"type":"token","description":"病情、問題或診斷的識別(code)"},"_id":{"type":"token","description":"病情、問題或診斷的邏輯性ID"},"onset-date":{"type":"date","description":"病情、問題或診斷的日期(onset)"},"severity":{"type":"token","description":"病情、問題或診斷的主觀嚴重程度(severity)"},"subject":{"type":"reference","description":"有此病情、問題或診斷的病人(subject)"}},
			"DiagnosticReport": {"category":{"type":"token","description":"診斷報告的類別(category)"},"code":{"type":"token","description":"診斷報告的代碼(code)"},"date":{"type":"date","description":"診斷報告的時間(date)"},"_id":{"type":"token","description":"診斷報告的邏輯性ID"},"status":{"type":"token","description":"診斷報告的狀態(status)"},"subject":{"type":"reference","description":"診斷報告的對象(subject)"}},
			"Encounter": {"class":{"type":"token","description":"病人就醫的分類(class)"},"date":{"type":"date","description":"就醫的時間(date)"},"_id":{"type":"token","description":"就醫事件的邏輯性ID"},"identifier":{"type":"token","description":"就醫事件的識別碼(identifier)"},"location":{"type":"reference","description":"病人曾去過的一個或多個地點(location)"},"status":{"type":"token","description":"就醫現況(status)"},"subject":{"type":"reference","description":"就醫的病人(subject)"}},
			"Medication": {"code":{"type":"token","description":"藥品的代碼(code)"},"_id":{"type":"token","description":"藥品的邏輯性ID"}},
			"MedicationRequest": {"authoredon":{"type":"date","description":"藥品處方的最初請求時間(authoredon)"},"encounter":{"type":"reference","description":"藥品處方的就醫事件(encounter)"},"_id":{"type":"token","description":"藥品處方的邏輯性ID"},"intent":{"type":"token","description":"藥品處方的意圖(intent)"},"medication":{"type":"reference","description":"藥品處方的藥品(medication)"},"status":{"type":"token","description":"藥品處方的狀態(status)"},"subject":{"type":"reference","description":"藥品處方的對象(subject)"}},
			"Observation": {"category":{"type":"token","description":"檢驗檢查的類別(category)"},"code":{"type":"token","description":"檢驗檢查項目(code)"},"date":{"type":"date","description":"檢驗檢查的日期（時間）(effective)"},"_id":{"type":"token","description":"檢驗檢查的邏輯性ID"},"performer":{"type":"reference","description":"執行檢驗檢查的人員(performer)"},"status":{"type":"token","description":"檢驗檢查的狀態(status)"},"subject":{"type":"reference","description":"檢驗檢查有關的對象及（或）事物(subject)"}},
			"Organization": {"_id":{"type":"token","description":"機構的邏輯性ID"},"identifier":{"type":"token","description":"機構的唯一識別碼(identifier)"},"name":{"type":"string","description":"機構的名稱(name)"},"type":{"type":"token","description":"機構的型別(type)"}},
			"Patient": {"birthdate":{"type":"date","description":"病人的出生日期(birthdate)"},"gender":{"type":"token","description":"病人的性別(gender)"},"_id":{"type":"token","description":"病人的邏輯性ID"},"identifier":{"type":"token","description":"病人的身份識別碼(identifier)"},"name":{"type":"string","description":"病人的姓名(name)，該查詢可能與 HumanName 中的任何字串匹配，包括完整的中文姓名(text)、英文姓(family)、英文名(given)、姓名前面的頭銜(prefix)、姓名後面的稱謂(suffix)。"}},
			"Practitioner": {"_id":{"type":"token","description":"健康照護服務提供人員的邏輯性ID"},"identifier":{"type":"token","description":"健康照護服務提供人員的識別碼(identifier)"},"name":{"type":"string","description":"健康照護服務提供人員的姓名(name)，該查詢可能與 HumanName 中的任何字串匹配，包括完整的中文姓名(text)、英文姓(family)、英文名(given)、姓名前面的頭銜(prefix)、姓名後面的稱謂(suffix)。"}},
			"Procedure": {"code":{"type":"token","description":"處置的識別碼(code)"},"date":{"type":"date","description":"處置的日期(date)"},"_id":{"type":"token","description":"處置的邏輯性ID"},"status":{"type":"token","description":"處置的狀態(status)"},"subject":{"type":"reference","description":"處置服務的對象(subject)"}},
		}
	}
})()

export default config