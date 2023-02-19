import { Identifier, Name, Telecom, CodeableConcept, Coding, Period } from './index'

export type PatientResourceType = {
    id: string
    text: { status: string; div: string }
    identifier: Identifier[]
    active: boolean
    name: Name[]
    telecom: Telecom[]
    gender: 'male' | 'female' | 'other' | 'unknown'
    birthDate: string
    address: {
        room: string
        floor: string
        number: string
        alley: string
        lane: string
        section: string
        neighborhood: string
        use: 'home' | 'work' | 'temp' | 'old' | 'billing'
        type: 'postal' | 'physical' | 'both'
        text: string
        line: string
        city: string
        district: string
        postalCode: string
        country: string
        _postalCode: {
            extension: {
                url: string
                valueCodeableConcept: {
                    coding: Coding[]
                }
            }[]
        }
        extension: {
            url: string
            valueString: string
        }
    }[]
    maritalStatus: CodeableConcept
    photo: { contentType: string; data: string; url: string }[]
    contract: {
        relationShip: CodeableConcept[]
        name: Name
        telecom: Telecom[]
        period: Period
    }[]
    communication: {
        language: CodeableConcept
    }[]
    managingOrganization: { reference: string }
}
