const fs = require('fs')

let definitionFolder = `${__dirname}/definitions.json`
let definitionFiles = fs.readdirSync(definitionFolder)
let ImplementationGuide = definitionFiles.filter(item => item.split('-')[0] == 'ImplementationGuide')
//let StructureDefinition = definitionFiles.filter(item => item.split('-')[0] == 'StructureDefinition')
let CodeSystem = definitionFiles.filter(item => item.split('-')[0] == 'CodeSystem')
let SearchParameter = definitionFiles.filter(item => item.split('-')[0] == 'SearchParameter')

/* -----Setting----- */
let dirPath = '../data/definitions.json' // config.js預計移動及IG definitions資料夾的相對位置
//let savePath = `${__dirname}/../js/config.js` // config.js輸出位置
let savePath = `./config.js`
let config = ''
/* ----------------- */

function iterStr(str, n) {
    let text = ""
    for (let i = 0; i < n; i++) {
        text += str
    }
    return text
}
function writeObj(name, obj, shift = 2) {
    let text = []
    let objText = JSON.stringify(obj, null, 4).split('\n')    
    text.push(`${iterStr('\t', shift)}${name} : ${objText[0]}`)

    for (let row of objText.slice(1)) {        
        text.push(`${iterStr('\t', shift)}${row}`)
    }
    return text.join('\n') + ',\n'
}

if (ImplementationGuide.length == 1) {
    // 1. 添加 IG 資訊
    let IG = require(`${definitionFolder}/${ImplementationGuide[0]}`)
    config += `/*\n`
    config += `\t${IG.title}\n`
    config += `\tID：${IG.name}\n`
    config += `\tName：${IG.id}\n`
    config += `\tVersion：${IG.version}\n`
    config += `\tFhir Version：${IG.fhirVersion}\n`
    config += `\tDate：${IG.date}\n`
    config += `\tUrl：${IG.url}\n`
    config += `*/\n\n`
    // Config Start
    config += `const config = (function () {\n`
    config += `\treturn {\n`

    // 2. StructureDefinition
    let StructureDefinition = require('./models/StructureDefinition')(definitionFolder, definitionFiles)
    config += writeObj('StructureDefinition', StructureDefinition)

    // 3. StructureDefinitionModal
    let StructureDefinitionModel = require('./models/StructureDefinitionModel')(definitionFolder, definitionFiles)
    config += writeObj('StructureDefinitionModel', StructureDefinitionModel)

    // 4. SearchParameter
    let SearchParameter = require('./models/SearchParameter')(definitionFolder, definitionFiles)
    config += writeObj('SearchParameter', SearchParameter)

    // 5. SearchParameterModifier
    let SearchParameterModifier = require('./models/SearchParameterModifier')
    config += writeObj('SearchParameterModifier', SearchParameterModifier)

    // 6. display
    let display = require('./models/displayDefault')
    config += writeObj('display', display)

    // Save
    // Config end
    config += `\t}\n`
    config += `})()\n`
    config += `\nexport default config`

    fs.writeFileSync(savePath, config)
    console.log(`# Save config to ${savePath}`)
} else {
    console.log('ERROR：Not found or multiple ImplementationGuide definitions')
    console.log(ImplementationGuide)
}