/* 
    Reference：https://www.hl7.org/fhir/search.html
    Description：搜尋參數的修飾符定義，用於FHIR GET使用。
    Definition：value為該數值，display為顯示模板，description為顯示說明
*/
module.exports = {
    number: {
        'eq': { value: 'eq', display: '<i class="fa-regular fa-equals"></i>', description: 'the value for the parameter in the resource is equal to the provided value' },
        'ne': { value: 'ne', display: '<i class="fa-regular fa-not-equal"></i>', description: 'the value for the parameter in the resource is not equal to the provided value' },
        'gt': { value: 'gt', display: '<i class="fa-regular fa-greater"></i>', description: 'the value for the parameter in the resource is greater than the provided value' },
        'lt': { value: 'lt', display: '<i class="fa-regular fa-less-than"></i>', description: 'the value for the parameter in the resource is less than the provided value' },
        'ge': { value: 'ge', display: '<i class="fa-regular fa-greater-than-equal"></i>', description: 'the value for the parameter in the resource is greater or equal to the provided value' },
        'le': { value: 'le', display: '<i class="fa-regular fa-less-than-equal"></i>', description: 'the value for the parameter in the resource is less or equal to the provided value' },
        'sa': { value: 'sa', display: 'Start after', description: 'the value for the parameter in the resource starts after the provided value' },
        'eb': { value: 'eb', display: 'End before', description: 'the value for the parameter in the resource ends before the provided value' },
        'ap': { value: 'ap', display: 'Approximately', description: 'the value for the parameter in the resource is approximately the same to the provided value.' }
    },
    date: {
        'eq': { value: 'eq', display: '<i class="fa-regular fa-equals"></i>', description: 'the value for the parameter in the resource is equal to the provided value' },
        'ne': { value: 'ne', display: '<i class="fa-regular fa-not-equal"></i>', description: 'the value for the parameter in the resource is not equal to the provided value' },
        'gt': { value: 'gt', display: '<i class="fa-regular fa-greater-than"></i>', description: 'the value for the parameter in the resource is greater than the provided value' },
        'lt': { value: 'lt', display: '<i class="fa-regular fa-less-than"></i>', description: 'the value for the parameter in the resource is less than the provided value' },
        'ge': { value: 'ge', display: '<i class="fa-regular fa-greater-than-equal"></i>', description: 'the value for the parameter in the resource is greater or equal to the provided value' },
        'le': { value: 'le', display: '<i class="fa-regular fa-less-than-equal"></i>', description: 'the value for the parameter in the resource is less or equal to the provided value' },
        'sa': { value: 'sa', display: 'Start after', description: 'the value for the parameter in the resource starts after the provided value' },
        'eb': { value: 'eb', display: 'End before', description: 'the value for the parameter in the resource ends before the provided value' },
        'ap': { value: 'ap', display: 'Approximately', description: 'the value for the parameter in the resource is approximately the same to the provided value.' }
    },
    string: {
        'contains': { value: 'contains', display: 'contains', description: "It's returns results that include the supplied parameter value anywhere within the field being searched." },
        'exact': { value: 'exact', display: 'exact', description: "It's returns results that match the entire supplied parameter, including casing and accents." }
    },
    token: {
        'text': { value: 'text', display: 'text', description: 'The search parameter is processed as a string that searches text associated with the code/value - either CodeableConcept.text, Coding.display, or Identifier.type.text. In this case, the search functions as a normal string search' },
        'not': { value: 'not', display: 'not', description: 'Reverse the code matching described in the paragraph above: return all resources that do not have a matching item. Note that this includes resources that have no value for the parameter - e.g. ?gender:not=male includes all patients that do not have gender = male, including patients that do not have a gender at all' },
        'above': { value: 'above', display: 'above', description: 'The search parameter is a concept with the form [system]|[code], and the search parameter tests whether the coding in a resource subsumes the specified search code. For example, the search concept has an is-a relationship with the coding in the resource, and this includes the coding itself.' },
        'below': { value: 'below', display: 'below', description: 'the search parameter is a concept with the form [system]|[code], and the search parameter tests whether the coding in a resource is subsumed by the specified search code. For example, the coding in the resource has an is-a relationship with the search concept, and this includes the coding itself.' },
        'in': { value: 'in', display: 'in', description: 'The search parameter is a URI (relative or absolute) that identifies a value set, and the search parameter tests whether the coding is in the specified value set. The reference may be literal (to an address where the value set can be found) or logical (a reference to ValueSet.url). If the server can treat the reference as a literal URL, it does, else it tries to match known logical ValueSet.url values.' },
        'not-in': { value: 'not-in', display: 'not-in', description: 'The search parameter is a URI (relative or absolute) that identifies a value set, and the search parameter tests whether the coding is not in the specified value set.' },
        'of-type': { value: 'of-type', display: 'of-type', description: 'The search parameter has the format system|code|value, where the system and code refer to a Identifier.type.coding.system and .code, and match if any of the type codes match. All 3 parts must be present' }
    },
    reference: {},
    composite: {},
    quantity: {
        'eq': { value: 'eq', display: '<i class="fa-regular fa-equals"></i>', description: 'the value for the parameter in the resource is equal to the provided value' },
        'ne': { value: 'ne', display: '<i class="fa-regular fa-not-equal"></i>', description: 'the value for the parameter in the resource is not equal to the provided value' },
        'gt': { value: 'gt', display: '<i class="fa-regular fa-greater"></i>', description: 'the value for the parameter in the resource is greater than the provided value' },
        'lt': { value: 'lt', display: '<i class="fa-regular fa-less-than"></i>', description: 'the value for the parameter in the resource is less than the provided value' },
        'ge': { value: 'ge', display: '<i class="fa-regular fa-greater-than-equal"></i>', description: 'the value for the parameter in the resource is greater or equal to the provided value' },
        'le': { value: 'le', display: '<i class="fa-regular fa-less-than-equal"></i>', description: 'the value for the parameter in the resource is less or equal to the provided value' },
        'sa': { value: 'sa', display: 'Start after', description: 'the value for the parameter in the resource starts after the provided value' },
        'eb': { value: 'eb', display: 'End before', description: 'the value for the parameter in the resource ends before the provided value' },
        'ap': { value: 'ap', display: 'Approximately', description: 'the value for the parameter in the resource is approximately the same to the provided value.' }
    },
    uri: {
        'below': { value: 'below', display: 'below', description: 'A search that will return any value sets that have a URL that starts with url' },
        'above': { value: 'above', display: 'above', description: 'A search for any value set above a given specific URL' }
    },
    special: {}
}