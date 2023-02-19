module.exports = (definitionFolder, definitionFiles) => {
    let StructureDefinition = definitionFiles.filter(item => item.split('-')[0] == 'StructureDefinition')
    let SearchParameter = definitionFiles.filter(item => item.split('-')[0] == 'SearchParameter')
    let SearchParameterList = {
        "_common": {
            '_id': { "type": "token", "description": "Resource id (not a full URL)" },
            '_lastUpdated': { "type": "date", "description": "Date last updated. Server has discretion on the boundary precision" },
            '_tag': { "type": "token", "description": "Search by a resource tag" },
            '_profile': { "type": "uri", "description": "Search for all resources tagged with a profile" },
            '_security': { "type": "token", "description": "Search by a security label" },
            '_source': { "type": "uri", "description": "Identifies where the resource comes from" },
            '_list': { "type": "string", "description": "All resources in nominated list (by id, Type/id, url or one of the magic List types)" },
            '_text': { "type": "string", "description": "Text search against the narrative" },
            '_content': { "type": "string", "description": "Text search against the entire resource" },
            '_has': { "type": "string", "description": "" },
            '_type': { "type": "string", "description": "" },
            '_query': { "type": "string", "description": "Custom named query" }
        },
        "_result": {
            '_sort': { "type": "string", "description": "Order to sort results in (can repeat for inner sort orders)" },
            '_count': { "type": "number", "description": "Number of results per page" },
            '_summary': { "type": "string", "description": "Just return the summary elements (for resources where this is defined)", "code": ['true', 'false'] },
            '_total': { "type": "string", "description": "", "code": ['none', 'estimate', 'accurate'] },
            '_include': { "type": "string", "description": "Other resources to include in the search results that search matches point to" },
            '_revinclude': { "type": "string", "description": "Other resources to include in the search results when they refer to search matches" },
            '_elements': { "type": "string", "description": "Specific set of elements be returned as part of a resource in the search results" },
            '_contained': { "type": "string", "description": "Whether to return resources contained in other resources in the search matches", "code": ['true', 'false', 'both'] },
            '_containedType': { "type": "string", "description": "If returning contained resources, whether to return the contained or container resource", "code": ['container', 'contained'] }
        }
    }
    for (fn of StructureDefinition.filter(item => new RegExp(".*Model\.json$").test(item))) {
        let model = require(`${definitionFolder}/${fn}`)
        let resource = model.type
        let params = {}
        for (let spFN of SearchParameter.filter(item => new RegExp(`SearchParameter-${resource}-.*\.json$`).test(item))) {
            let model = require(`${definitionFolder}/${spFN}`)
            params[model.code] = {
                type: model.type,
                description: model.description
            }
        }
        SearchParameterList[resource] = params
    }
    return SearchParameterList
}