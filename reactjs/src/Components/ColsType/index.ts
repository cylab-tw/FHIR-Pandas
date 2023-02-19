export const Narrative = [
    { label: 'Status', name: 'status', type: 'string' },
    { label: 'Div', name: 'div', type: 'string' },
]

export const Coding = [
    { label: 'System', name: 'system', type: 'string' },
    { label: 'Code', name: 'code', type: 'string' },
    { label: 'Display', name: 'display', type: 'string' },
]

export const Attachment = [
    { label: 'ContentType', name: 'contentType', type: 'string' },
    { label: 'Language', name: 'language', type: 'string' },
    { label: 'Data', name: 'data', type: 'string' },
    { label: 'Url', name: 'url', type: 'string' },
    { label: 'Size', name: 'size', type: 'string' },
    { label: 'Hash', name: 'hash', type: 'string' },
    { label: 'Title', name: 'title', type: 'string' },
    { label: 'Creation', name: 'creation', type: 'string' },
]

export const Quantity = [
    { label: 'Value', name: 'value', type: 'string' },
    { label: 'Unit', name: 'unit', type: 'string' },
    { label: 'System', name: 'system', type: 'string' },
    { label: 'Code', name: 'code', type: 'string' },
]

export const Period = [
    { label: 'Start', name: 'start', type: 'string' },
    { label: 'End', name: 'end', type: 'string' },
]

export const Name = [
    { label: 'Use', name: 'use', type: 'string' },
    { label: 'Text', name: 'text', type: 'string' },
    { label: 'Family', name: 'family', type: 'string' },
    {
        label: 'Given',
        name: 'give',
        type: 'array_string',
    },
]

export const Duration = [
    { label: 'Value', name: 'value', type: 'string' },
    { label: 'Currency', name: 'currency', type: 'string' },
]

export const Reference = [
    {
        label: 'Reference',
        name: 'reference',
        type: 'string',
    },
]

export const Telecom = [
    { label: 'Use', name: 'use', type: 'string' },
    { label: 'System', name: 'system', type: 'string' },
    { label: 'Value', name: 'value', type: 'string' },
    {
        label: 'Period',
        name: 'period',
        type: 'object',
        children: Period,
    },
]

export const Author = [
    {
        label: 'AuthorReference',
        name: 'authorReference',
        type: 'object',
        childrens: Reference,
    },
    {
        label: 'AuthorString',
        name: 'authorString',
        type: 'string',
    },
]

export const Annotation = [
    {
        lable: 'AuthorReference',
        name: 'authorReference',
        type: 'object',
        childrens: [
            {
                label: 'Author',
                name: 'author',
                type: 'object',
                childrens: Author,
            },
            {
                label: 'Time',
                name: 'time',
                type: 'string',
            },
            {
                label: 'Text',
                name: 'text',
                type: 'string',
            },
        ],
    },
]

export const CodingTW = [
    { label: 'System', name: 'system', type: 'string' },
    {
        label: 'Code',
        name: 'code',
        type: 'string',
    },
    {
        label: 'Display',
        name: 'display',
        type: 'string',
    },
]

export const CodeableConcept = [
    {
        label: 'Codeing',
        name: 'codeing',
        type: 'array',
        childrens: CodingTW,
    },
    { label: 'Text', name: 'text', type: 'string' },
]

export const Timing = [{ label: 'Code', name: 'code', type: 'object', childrens: CodeableConcept }]

export const Dosage = [
    { label: 'Text', name: 'text', type: 'string' },
    { label: 'Timing', name: 'timing', type: 'object', childrens: Timing },
    {
        label: 'Route',
        name: 'route',
        type: 'object',
        childrens: CodeableConcept,
    },
]

export const Identifier = [
    { label: 'Use', name: 'use', type: 'string' },
    { label: 'System', name: 'system', type: 'string' },
    { label: 'Value', name: 'value', type: 'string' },
    {
        label: 'Type',
        name: 'type',
        type: 'object',
        childrens: CodeableConcept,
    },
]

export const TWCoreAddress = [
    { label: 'Room', name: 'room', type: 'string' },
    {
        label: 'floor',
        name: 'floor',
        type: 'string',
    },
    {
        label: 'Number',
        name: 'number',
        type: 'string',
    },
    {
        label: 'Alley',
        name: 'alley',
        type: 'string',
    },
    {
        label: 'Lane',
        name: 'lane',
        type: 'string',
    },
    {
        label: 'Section',
        name: 'section',
        type: 'string',
    },
    {
        label: 'Neighborhood',
        name: 'neighborhood',
        type: 'string',
    },
    {
        label: 'Village',
        name: 'village',
        type: 'string',
    },
    {
        label: 'Use',
        name: 'use',
        type: 'string',
    },
    { label: 'Type', name: 'type', type: 'string' },
    { label: 'Text', name: 'text', type: 'string' },
    { label: 'Line', name: 'line', type: 'string' },
    { label: 'City', name: 'city', type: 'string' },
    { label: 'District', name: 'district', type: 'string' },
    { label: 'State', name: 'state', type: 'string' },
    { label: 'PostalCode', name: 'postalCode', type: 'string' },
    { label: 'Country', name: 'country', type: 'string' },
]
