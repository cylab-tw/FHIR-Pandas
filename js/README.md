# Redpandav2

# fhirRequest module
### 說明
* 使用fetch實作，提供FHIR request操作模組
### 使用教學
1. 在 html 引入模組
    ```html
    <html>
        <head>
            ...
        </head>
        <body>
            ...
        </body>
        <script src="./js/vanillaPanda.js"></script>
    </html>
    ```
2. 設定基本參數
    ```js
    fhirRequest.init({
        server：YOUR_FHIR_SERVER,
        token：YOUR_TOKEN
    })
    ```
    * server ( String, required )：FHIR server的基本網址，如 https://hapi.fhir.tw/fhir
    * token ( String, optional )：FHIR server的驗證token
### 功能說明
1. 查看目前設定
    ```js
    fhirRequest.getSetting()

    // Response
    {
        server: 'https://hapi.fhir.tw/fhir', 
        token: null
    }     
    ```
2. 搜尋資料 GET request
    ```js
    fhirRequest.get(FHIR_RESOURCE, SEARCH_PARAMETERS, MANUAL)
        .then(res => {                    
           ...
        }).catch(err => {
            ...
        })
    ```
    * FHIR_RESOURCE ( String, required )：目標Resource，如 Patient, Patient/[ID] 等
    * SEARCH_PARAMETERS ( Object, optional )：key值為搜尋的欄位，value為關鍵字
    * MANUAL(boolean, default false)：以 FHIR_RESOURCE 傳入自訂的 request url ( 注意：開啟此參數將應用 fhirRequest.init 之 server 設定 )
    ```json
    // SEARCH_PARAMETERS example
    {
        "name"："someone",
        "_sort"："birthDate"
    }
    ```
    ```js
    // Response
    {
        "status": 200,
        "text": "",
        "data": { ... },
        "url": "https://hapi.fhir.tw/fhir/Patient?name=someone&_sort=birthDate"
    }
    ```
    * status：HTTP status code
    * text：HTTP status text
    * data：FHIR server response data
    * url：request url
3. 新增資料 POST request
    ```js
    fhirRequest.post(FHIR_RESOURCE, DATA, MANUAL)
        .then(res => {                    
           ...
        }).catch(err => {
            ...
        })
    ```
    * FHIR_RESOURCE ( String, required )：目標Resource，如Patient, Observation<br/>
    * DATA ( Object, required )：新增資料<br/>
    * MANUAL(boolean, default false)：以 FHIR_RESOURCE 傳入自訂的 request url ( 注意：開啟此參數將應用 fhirRequest.init 之 server 設定 )
    ```json
    // DATA example
    {
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
    }
    ```
    ```js
    // Response
    {
        "status": 201,
        "text": "",
        "data": { ... },
        "url": "https://hapi.fhir.tw/fhir/Patient"
    }
    ```
    * status：HTTP status code
    * text：HTTP status text
    * data：FHIR server response data
    * url：request url
4. 修改資料 PUT request
    ```js
    fhirRequest.put(FHIR_RESOURCE_ID, DATA, MANUAL)
        .then(res => {                    
           ...
        }).catch(err => {
            ...
        })
    ```
    * FHIR_RESOURCE_ID ( String, required )：目標Resource及ID，如Patient/[id]
    * DATA ( Object, required )：修改資料，資料內需包含 id 欄位
    * MANUAL(boolean, default false)：以 FHIR_RESOURCE 傳入自訂的 request url ( 注意：開啟此參數將應用 fhirRequest.init 之 server 設定 )
    ```json
    // FHIR_RESOURCE_ID"Patient/933"
    // DATA example
    {
        "resourceType": "Patient",
        "id": "933",
        "name": [
            {
                "family": "test",
                "given": [
                    "sample_new"
                ]
            }
        ],
        "gender": "other"
    }
    ```
    ```js
    // Response
    {
        "status": 200,
        "text": "",
        "data": { ... },
        "url": "https://hapi.fhir.tw/fhir/Patient/933"
    }
    ```
    * status：HTTP status code
    * text：HTTP status text
    * data：FHIR server response data
    * url：request url
5. 刪除資料 DELETE request
    ```js
    fhirRequest.delete(FHIR_RESOURCE_ID, MANUAL)
        .then(res => {                    
           ...
        }).catch(err => {
            ...
        })
    ```
    * FHIR_RESOURCE_ID ( String, required )：目標Resource及ID，如Patient/[ID]
    * MANUAL(boolean, default false)：以 FHIR_RESOURCE 傳入自訂的 request url ( 注意：開啟此參數將應用 fhirRequest.init 之 server 設定 )
    ```json
    // FHIR_RESOURCE_ID："Patient/933"
    ```
    ```js
    // Response
    {
        "status": 200,
        "text": "",
        "data": { ... },
        "url": "https://hapi.fhir.tw/fhir/Patient/933"
    }
    ```
    * status：HTTP status code
    * text：HTTP status text
    * data：FHIR server response data
    * url：request url