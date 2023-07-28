import {Period,CodeableConcept} from "./index"
import { PractitionerCols } from "./PractitionerCols"
import { OrganizationCols } from "./OrganizationCols"
import { LocationCols } from "./LocationCols"

export const PractitionerRoleCols=[
    {label:"ID",name:"id",type:"string"},
    {label:"Active",name:"active",type:"boolean"},
    {label:"Period",name:"period",type:"object",children:Period},
    {label:"Practitioner",name:"practitioner",type:"Reference"},
    {label:"Organization",name:"organization",type:"Reference"},
    {label:"Code",name:"code",type:"object",children:CodeableConcept},
    {label:"Specialty",name:"specialty",type:"object",children:CodeableConcept},
    {label:"Location",name:"location",type:"Reference"},
]