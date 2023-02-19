import { Narrative, CodeableConcept, Reference, Annotation } from './index'

export const ConditionCols = [
    { label: 'ID', name: 'id', type: 'string' },
    {
        label: 'Text',
        name: 'text',
        type: 'object',
        childrens: Narrative,
    },
    {
        label: 'ClinicalStatus',
        name: 'clinicalStatus',
        type: 'object',
        childrens: CodeableConcept,
    },

    {
        label: 'VerificationStatus',
        name: 'verificationStatus',
        type: 'object',
        childrens: CodeableConcept,
    },
    {
        label: 'Category',
        name: 'category',
        type: 'object',
        childrens: CodeableConcept,
    },
    {
        label: 'Sseverity',
        name: 'severity',
        type: 'object',
        childrens: CodeableConcept,
    },
    {
        label: 'Code',
        name: 'code',
        type: 'object',
        childrens: CodeableConcept,
    },
    {
        label: 'BodySite',
        name: 'bodySite',
        type: 'array',
        childrens: CodeableConcept,
    },
    {
        label: 'Subject',
        name: 'subject',
        type: 'object',
        childrens: Reference,
    },
    {
        label: 'OnsetDateTime',
        name: 'onsetDateTime',
        type: 'string',
    },
    {
        label: 'AbatementDateTime',
        name: 'abatementDateTime',
        type: 'string',
    },
    {
        label: 'Asserter',
        name: 'asserter',
        type: 'object',
        childrens: Reference,
    },
    {
        label: 'Note',
        name: 'note',
        type: 'array',
        childrens: Annotation,
    },
]
