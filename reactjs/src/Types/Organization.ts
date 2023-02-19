import { Identifier, Telecom, CodeableConcept } from './index'

export type OrganiztionResourceType = {
    text: string
    identifier: Identifier[]
    active: boolean
    type: CodeableConcept
    name: string
    telecom: Telecom[]
}
