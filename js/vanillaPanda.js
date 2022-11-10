const queryParams = {}

/**
 * 初始化設定
 */
function init() {
    // 取得設定
    let fhirServer = document.getElementById('fhirServer').value    
    let fhirToken = document.getElementById('fhirToken').value
    let option = ({
        server: fhirServer
    })
    // 新增 token
    if (fhirToken) option.token = fhirToken
    fhirRequest.init(option)
    // 顯示
    buildURL()
}

/**
 * 移除搜尋參數key值的前綴符號
 * @param {object} obj 
 * @returns 
 */
function recoverParams(obj) {    
    let newObj = {}
    for (let key of Object.keys(obj)) {
        newObj[key.slice(1)] = obj[key]
    }
    return newObj
}

/**
 * 使用fhirRequest模組進行request
 */
function request() {
    let resource = document.getElementById('fhirResource').value
    let method = document.getElementById('requestMethod').value
    let data = document.getElementById('data').value

    switch (method) {
        case 'get':
            fhirRequest.get(resource, recoverParams(queryParams))
                .then(res => {                    
                    document.getElementById('requestMethod_display').textContent = `GET ${res.status}`
                    document.getElementById('requestURL').textContent = res.url
                    document.getElementById('requestURL').href = res.url
                    document.getElementById('content').value = JSON.stringify(res.data, null, 2)
                }).catch(err => {
                    console.log(err)
                    document.getElementById('content').value = err
                })
            break;
        case 'post':
            if (!data) {
                alert('請輸入新增資料')
            } else {
                fhirRequest.post(resource, data)
                    .then(res => {
                        document.getElementById('content').value = JSON.stringify(res.data, null, 2)
                        document.getElementById('requestURL').textContent = res.url
                        document.getElementById('requestURL').href = res.url
                    }).catch(err => {
                        console.log(err)
                        document.getElementById('content').value = err
                    })
            }
            break;
        case 'put':
            if (!data) {
                alert('請輸入修改資料')
            } else {
                fhirRequest.put(resource, data)
                    .then(res => {
                        document.getElementById('requestMethod_display').textContent = `PUT ${res.status}`                        
                        document.getElementById('requestURL').textContent = res.url
                        document.getElementById('requestURL').href = res.url
                        document.getElementById('content').value = JSON.stringify(res.data, null, 2)
                    }).catch(err => {
                        console.log(err)
                        document.getElementById('content').value = err
                    })
            }
            break;
        case 'delete':
            fhirRequest.delete(resource)
                .then(res => {
                    document.getElementById('requestMethod_display').textContent = `DELETE ${res.status}`                    
                    document.getElementById('requestURL').textContent = res.url
                    document.getElementById('requestURL').href = res.url
                    document.getElementById('content').value = JSON.stringify(res.data, null, 2)
                }).catch(err => {
                    console.log(err)
                    document.getElementById('content').value = err
                })
            break;
    }
}

/**
 * 控制http-method行為
 */
function changeMethod() {
    let method = document.getElementById('requestMethod').value
    // 根據method顯示不同操作區域
    switch (method) {
        case 'get':
            document.getElementById('dataTable').style.display = 'none'
            document.getElementById('queryTable').style.display = ''
            break;
        case 'post':
            document.getElementById('dataTable').style.display = ''
            document.getElementById('queryTable').style.display = 'none'
            break;
        case 'put':
            document.getElementById('dataTable').style.display = ''
            document.getElementById('queryTable').style.display = 'none'
            break;
        case 'delete':
            document.getElementById('dataTable').style.display = 'none'
            document.getElementById('queryTable').style.display = 'none'
            break;
    }
    // 顯示
    document.getElementById('requestMethod_display').textContent = method.toUpperCase()
    document.getElementById('content').value = ''
}

/**
 * 建置request url
 */
function buildURL() {
    // 取得參數
    let fhirServer = document.getElementById('fhirServer').value
    let fhirResource = document.getElementById('fhirResource').value
    let url = `${fhirServer}/${fhirResource}`
    // 新增搜尋參數(for get method)
    if (Object.keys(queryParams).length > 0) {
        url += `?${Object.keys(queryParams).map(function (key, value) {
            return [key.slice(1), queryParams[key]].join('=');
        }).join('&')}`
    }
    // 更新
    document.getElementById('requestURL').textContent = url
}

/**
 * 新增搜尋參數
 */
function addQueryParam() {
    let key = document.getElementById('queryKey').value
    let value = document.getElementById('queryValue').value
    // 為了在json中保持參數順序，因此在key值前新增前綴符號
    if (key != '') queryParams[`$${key}`] = value
    dislayParam()
}

/**
 * 刪除搜尋參數
 * @param {string} key 
 */
function rmQueryParam(key) {
    delete queryParams[key]
    dislayParam()
}

/**
 * 顯示搜尋參數
 */
function dislayParam() {
    let table = document.getElementById('queryParams_display')
    let rows = table.rows.length
    // 清空table
    for (let i = 0; i < (rows - 2); i++) {
        table.deleteRow(1)
    }
    // 顯示參數
    for (let i = 0; i < Object.keys(queryParams).length; i++) {
        let row = document.getElementById('queryParams_display').insertRow(1 + i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let key = Object.keys(queryParams)[i]
        cell1.innerHTML = key.slice(1);
        cell2.innerHTML = queryParams[key];
        cell3.innerHTML = `<button onclick="rmQueryParam('${key}')">-</button>`
    }
    // 清空輸入欄位
    document.getElementById('queryKey').value = null
    document.getElementById('queryValue').value = null
    // 刷新URL
    buildURL()
}

// 初始化
init()
// POST, PUT範例資料
document.getElementById('data').textContent = JSON.stringify({
    "resourceType": "Patient",
    "name": [
        {
            "family": "test",
            "given": [
                "sample"
            ]
        }
    ],
    "gender": "other"
}, null, 4)