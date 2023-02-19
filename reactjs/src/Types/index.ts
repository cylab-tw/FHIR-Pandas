export type Coding = { system: string; code: string; display: string }
export type CodeableConcept = {
    coding: Coding[]
    text: string
}
export type Identifier = {
    use: 'usual' | 'official' | 'temp' | 'secondary' | 'old'
    type: CodeableConcept
    system: string
    value: string
}
export type Name = {
    use: 'usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden'
    text: string
    family: string
    given: string[]
}
export type Period = { start: 'string'; end: 'string' }
export type Telecom = {
    system: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other'
    value: string
    use: 'home' | 'work' | 'temp' | 'old' | 'mobile'
    period: Period
}
