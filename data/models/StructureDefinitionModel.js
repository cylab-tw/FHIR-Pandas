module.exports = (definitionFolder, definitionFiles) => {
    let StructureDefinition = definitionFiles.filter(item => item.split('-')[0] == 'StructureDefinition')
    let resourceModel = {}
    for (fn of StructureDefinition.filter(item => new RegExp(".*Model\.json$").test(item))) {
        let model = require(`${definitionFolder}/${fn}`)
        resourceModel[model.type] = model.snapshot.element
    }
    return resourceModel
}