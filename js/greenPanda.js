import fhirRequest from './fhirRequest_ES6.js'
import template from './template.js'
import config from './config.js'

let app = new Vue({
    el: '#app',
    data() {
        return {
            /* Setting */
            setting: {
                server: '',
                resource: 'Patient',
                id: '',
                token: null,
                forceHttps: true
            },
            exampleSetting: {
                server: 'https://hapi.fhir.org/baseR4',
                resource: 'Patient',
                id: '',
                token: null,
                forceHttps: true
            },
            config: null,
            /* Display used */
            requestResult: {},
            requestStatus: null,
            requestErrors: [],
            requestMethod: 'get',
            resourceList: [],
            resultDisplay: template.info,
            resultDisplayCols: [],
            /* ViewModal */
            viewModal: {
                title: 'title',
                table: 'nothing',
                data: null,
                editData: null,
                importData: null
            },
            createModal: {
                data: null
            },
            /* Parameters */
            searchParameter: {
                key: '',
                value: '',
                modifier: { value: '', display: '<i class="fa-regular fa-equals"></i>', description: '' },
                modifierDefault: { value: '', display: '<i class="fa-regular fa-equals"></i>', description: '' },
                list: []
            },
            displayParameter: {
                key: '',
                value: '',
                list: [],
                _count: 20,
                _sort: {
                    key: '',
                    order: true
                }
            }
        }
    },
    created: function () {
        this.config = config
        window.downLoadJSON = this.downLoadJSON
        window.deleteFHIR = this.deleteFHIR
        window.buildViewModal = this.buildViewModal
        window.exampleSearch = () => {
            location.href = `${location.origin + location.pathname}?server=${this.exampleSetting.server}&resource=${this.exampleSetting.resource}&apply=true`
        }
    },
    computed: {
        requestURL() {
            if (!this.setting.server) return ''
            let url = this.setting.server
            if (this.setting.resource) url += `/${this.setting.resource}`
            if (this.setting.id) {
                url += `/${this.setting.id}`
            } else {
                let query = [this.searchParameterMerged, this.displayParameterMerged].filter(el => el);
                if (query.length > 0) url += `?${query.join('&')}`
            }
            return url
        },
        searchParameterMerged() {
            let param = []
            if (this.searchParameter.list.length > 0) {
                for (let item of this.searchParameter.list) {
                    let type = this.getParameterType(this.setting.resource, item.key)
                    if (['string', 'uri', 'token'].includes(type)) {
                        if (item.modifier.value) {
                            param.push(`${item.key}:${item.modifier.value}=${item.value}`)
                        } else {
                            param.push(`${item.key}=${item.value}`)
                        }
                    } else {
                        // number, date, quantity...
                        param.push(`${item.key}=${item.modifier.value}${item.value}`)
                    }
                }
            }
            return param.join('&')
        },
        displayParameterMerged() {
            let param = []
            // _count
            param.push(`_count=${this.displayParameter._count}`)
            // _sort
            if (this.displayParameter._sort.key) {
                param.push(`_sort=${(this.displayParameter._sort.order) ? '' : '-'}${this.displayParameter._sort.key}`)
            }
            // other
            if (this.displayParameter.list.length > 0) {
                for (let item of this.displayParameter.list) {
                    param.push(`${item.key}=${item.value}`)
                }
            }
            return param.join('&')
        }
    },
    methods: {
        // Request function
        getFHIR(url) {
            // Init                   
            let resource = this.setting.resource
            // Check
            if (!this.setting.server) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Server is required',
                    text: 'Please check your setting！'
                })
                return
            }
            if (!this.setting.resource) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Resource is required',
                    text: 'Please check your setting！'
                })
                return
            }
            // Init display
            this.resultDisplay = template.loadingSpinners
            this.requestResult = {}
            // Build url
            if (!url) url = this.requestURL
            if (this.setting.forceHttps) url = url.replace(/^http:\/\//, 'https://')
            // Set default parameter
            if (!this.setting.id) url += (url.includes('?')) ? '&_total=accurate' : '?_total=accurate'
            // Request
            fhirRequest.get(url, undefined, true)
                .then(res => {
                    if (res.status == '200') {
                        // 將單 resource 還原為 Bundle 結構
                        if (res.data.resourceType != 'Bundle') {
                            res.data = {
                                entry: [{
                                    fullUrl: res.url,
                                    resource: res.data
                                }],
                                link: [],
                                total: 1
                            }
                        }
                        // 儲存資料
                        this.requestResult = res.data
                        // 儲存狀態
                        this.requestStatus = {
                            status: res.status,
                            text: res.text,
                            url: res.url,
                            method: 'get',
                            resource,
                            link: {},
                            page: getPageInfo(res.url, this.requestResult.total)
                        }
                        for (let item of res.data.link) {
                            this.requestStatus.link[item.relation] = item.url
                        }
                        this.buildResultDisplay(resource)
                    } else {
                        // 顯示警告                        
                        Swal.fire({
                            icon: 'warning',
                            title: res.data.resourceType
                        })
                        // 儲存狀態
                        this.requestStatus = {
                            status: res.status,
                            text: res.text,
                            url: res.url,
                            method: 'get',
                            resource,
                            link: {},
                            page: {
                                now: '-',
                                total: '-'
                            },
                            errorInfo: res.data.issue
                        }
                        this.resultDisplay = ""
                    }
                }).catch(err => {
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Request failed',
                        text: 'Server error'
                    })
                    this.requestStatus = {
                        status: 'failed',
                        text: '',
                        url,
                        method: 'get',
                        resource,
                        link: {},
                        page: {
                            now: '-',
                            total: '-'
                        },
                        errorInfo: [{
                            "severity": "error",
                            "code": "request",
                            "diagnostics": `Please check server status. <a class="ms-1" href="${url}" target="_blank">More..</a>`
                        }]
                    }
                    this.resultDisplay = ""
                })
            function getPageInfo(url, total) {
                let query = url.split('?')
                let page = {
                    now: 1,
                    total: Math.max(Math.ceil(total / 20), 1)
                }
                if (query.length == 2) {
                    let params = {}
                    for (let item of query[1].split('&')) {
                        params[item.split('=')[0]] = item.split('=')[1]
                    }
                    if (params['_count']) {
                        page.total = Math.max(Math.ceil(total / params['_count']), 1)
                        if (params['_getpagesoffset']) {
                            page.now = params['_getpagesoffset'] / params['_count'] + 1
                        }
                    }
                }
                return page
            }
        },
        deleteFHIR(target) {
            Swal.fire({
                title: `Delete ${target} ?`,
                text: `You won't be able to revert this！`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it'
            }).then((result) => {
                if (result.isConfirmed) {
                    fhirRequest.delete(target)
                        .then(res => {
                            Swal.fire(
                                'Deleted!',
                                target,
                                'success'
                            ).then((result) => {
                                if (result.isConfirmed) {
                                    this.getFHIR(this.requestStatus.link.self)
                                }
                            })
                        }).catch(err => {
                            console.log(err)
                            Swal.fire({
                                icon: 'error',
                                title: 'Delete failed',
                                text: 'Please check server status'
                            })
                        })
                }
            })
        },
        putFHIR(data, editData) {
            let target = `${data.resourceType}/${data.id}`
            if (this.strToJson(editData)) {
                Swal.fire({
                    title: `Update ${target} ?`,
                    text: `Please confirm your change！`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Update'
                }).then((result) => {
                    if (result.isConfirmed) {
                        fhirRequest.put(target, editData)
                            .then(res => {
                                if (res.status == "200") {
                                    Swal.fire(
                                        {
                                            'itle': 'Update success！',
                                            'html': `<a href='${`${location.origin + location.pathname}?server=${this.setting.server}&resource=${res.data.resourceType}&id=${res.data.id}&apply=true`}' target="_blank">${res.data.resourceType} / ${res.data.id}</a>`,
                                            'icon': 'success'
                                        }
                                    ).then((result) => {
                                        if (result.isConfirmed) {
                                            this.getFHIR(this.requestStatus.link.self)
                                        }
                                    })
                                } else {
                                    let htmlStr = ''
                                    for (let err of res.data.issue) {
                                        htmlStr += `<div class="alert alert-danger">
                                                    <i class="fa-regular fa-circle-exclamation me-2"></i>
                                                    <strong class="text-capitalize">${err.code}</strong>
                                                    <strong class="text-uppercase ms-1">${err.severity}：</strong>
                                                    <span>${err.diagnostics}</span>
                                                    </div>`
                                    }
                                    // 顯示警告                        
                                    Swal.fire({
                                        title: res.data.resourceType,
                                        html: htmlStr,
                                        icon: 'error'
                                    })
                                }
                            }).catch(err => {
                                console.log(err)
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Update failed',
                                    text: 'Please check server status'
                                })
                            })
                    }
                })
            }
        },
        postFHIR() {
            let data = this.createModal.data
            let target = this.setting.resource
            if (this.strToJson(data)) {
                Swal.fire({
                    title: `Create ${target} ?`,
                    text: `Please confirm your data！`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Create'
                }).then((result) => {
                    if (result.isConfirmed) {
                        fhirRequest.post(target, data)
                            .then(res => {
                                console.log(res)
                                if (res.status == "201") {
                                    Swal.fire(
                                        {
                                            'title': 'Create success！',
                                            'html': `<a href='${`${location.origin + location.pathname}?server=${this.setting.server}&resource=${res.data.resourceType}&id=${res.data.id}&apply=true`}' target="_blank">${res.data.resourceType} / ${res.data.id}</a>`,
                                            'icon': 'success'
                                        }
                                    ).then((result) => {
                                        if (result.isConfirmed) {
                                            this.getFHIR(this.requestStatus.link.self)
                                        }
                                    })
                                } else {
                                    let htmlStr = ''
                                    for (let err of res.data.issue) {
                                        htmlStr += `<div class="alert alert-danger">
                                                    <i class="fa-regular fa-circle-exclamation me-2"></i>
                                                    <strong class="text-capitalize">${err.code}</strong>
                                                    <strong class="text-uppercase ms-1">${err.severity}：</strong>
                                                    <span>${err.diagnostics}</span>
                                                    </div>`
                                    }
                                    // 顯示警告                        
                                    Swal.fire({
                                        title: res.data.resourceType,
                                        html: htmlStr,
                                        icon: 'error'
                                    })
                                }

                            }).catch(err => {
                                console.log(err)
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Create failed',
                                    text: 'Please check server status'
                                })
                            })
                    }
                })
            }
        },
        upFhirServer() {
            fhirRequest.init({
                server: this.setting.server
            })
        },
        /* Display control */
        buildResultDisplay(resource) {
            // 要顯示的欄位
            let header = config.display[resource]
            // Add table head
            let html = `<div class='table-responsive'>
                        <table class="table table-bordered table-hover align-middle text-center">`
            // Add table header
            html += `<thead class="table-light"><tr>`
            html += `<th class="table-secondary">ID</th>`
            html += header.reduce((previousValue, currentValue) => {
                return previousValue + `<th class='text-capitalize table-secondary'>${currentValue}</th>\n`
            }, '');
            html += `<th class="table-secondary">Operate</th>`
            html += `<tr/></thead>`
            // Add table body
            html += `<tbody>`
            if (this.requestResult.entry) {
                for (let [i, row] of this.requestResult.entry.entries()) {
                    let id = row.resource.id
                    // Row start                    
                    html += `<tr>`
                    // Add ID
                    html += `<td><a href="${row.fullUrl}" target="_blank">${id}</a></td>`
                    // Add columns
                    for (let col of header) {
                        let colStr = ''
                        let data = row.resource[col]
                        if (!data) {
                            colStr = '-'
                        } else if (typeof data == 'object') {
                            colStr = `<button type="button" class="btn btn-sm btn-outline-secondary text-nowrap" onclick="buildViewModal(${i}, '${col}')" data-bs-toggle="modal" data-bs-target="#ViewModal">
                                    ${(data.length != undefined) ? `${data.length} rows` : 'View'}
                                    </button>`
                        } else {
                            colStr = data
                        }

                        html += `<td>${colStr}</td>`
                    }
                    // Add Opearate buttons
                    html += `<td class='text-nowrap'>
                            <button type="button" class="btn btn-sm btn-info" onclick="buildViewModal(${i})" data-bs-toggle="modal" data-bs-target="#ViewModal" title="View more"><i class="fa-regular fa-table-list"></i></button>
                            <button class='btn btn-sm btn-primary text-light' onclick="downLoadJSON(${i}, '${resource}_${id}')" title="Download"><i class="fa-solid fa-download"></i></button>    
                            <button class='btn btn-sm btn-danger text-light' onclick="deleteFHIR('${resource}/${id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>                    
                            </td></tr>`
                }
            }
            html += `</tbody></table></div>`
            // Apply display
            this.resultDisplay = html
        },
        buildViewModal(i, col = null) {
            let row = this.requestResult.entry[i].resource
            let server = this.setting.server
            if (col) {
                this.viewModal.data = row[col]
                this.viewModal.editData = null
                this.viewModal.title = `${row.resourceType} / ${row.id}：${col}`
            } else {
                this.viewModal.data = row
                this.viewModal.editData = JSON.stringify(this.viewModal.data, null, 4)
                this.viewModal.title = `${row.resourceType} / ${row.id}`
            }
            // 切換頁面
            viewModalNavTab_table.click()
            this.viewModal.table = parseValue(null, this.viewModal.data, `${row.resourceType}_${row.id}`)

            function parseValue(k, v, id) {
                if (typeof (v) == 'object') {
                    if (v.length != undefined) {
                        return parseArray(k, v, id)
                    } else {
                        return parseObj(k, v, id)
                    }
                } else {
                    if (k == 'reference') {
                        if (v.split('/').length = 2) {
                            let resource = v.split('/')[0]
                            let id = v.split('/')[1]
                            return `<a href='${`${location.origin + location.pathname}?server=${server}&resource=${resource}&id=${id}&apply=true`}' target="_blank">${resource} / ${id}</a>`
                        } else {
                            return `<a class="btn btn-link" href="${v}" target="_blank">${v}</a>`
                        }
                    } else {
                        return v
                    }
                }
            }
            function parseObj(k, v, id) {
                // Table header
                let htmlStr = `<table class="table table-sm align-middle text-center table-bordered">`
                for (let [key, value] of Object.entries(v)) {
                    htmlStr += `<tr>`
                    htmlStr += `<th class="w-25 text-capitalize fw-bold table-secondary">${key}</th>`
                    htmlStr += `<td class="w-75">${parseValue(key, value, `${id}_${key}`)}</td>`
                    htmlStr += `</tr>`
                }
                htmlStr += `</table>`
                return htmlStr
            }
            function parseArray(k, v, id) {
                let htmlStr = `<div class="accordion accordion-flush">`
                for (let [i, row] of v.entries()) {
                    htmlStr += `<div class="accordion-item">`
                    // accordion-header
                    htmlStr += `<h2 class="accordion-header">
                               <button class="accordion-button ${(!col) && 'collapsed'}" type="button" data-mdb-toggle="collapse" data-mdb-target="#${id}_accordion_${i}">                           
                                ${(v.length == 1) ? '<i class="fa-regular fa-list"></i>' : (i + 1) + '.'}
                               </button>
                               </h2>`
                    // accordion-collapse
                    htmlStr += `<div id="${id}_accordion_${i}" class="accordion-collapse collapse ${(col) && 'show'}">
                               <div class="accordion-body">${parseValue(k, row, `${id}_${i}`)}`
                    htmlStr += `</div></div></div>`
                }
                htmlStr += `</div>`
                return htmlStr
            }
        },
        // Parameter control
        addSearchParameter() {
            if (this.searchParameter.key && this.searchParameter.value) {
                this.searchParameter.list.push({ key: this.searchParameter.key, value: this.searchParameter.value, modifier: this.searchParameter.modifier })
                this.searchParameter.key = ''
                this.searchParameter.value = ''
                this.searchParameter.modifier = this.searchParameter.modifierDefault
            }
        },
        rmSearchParameter(pos) {
            this.searchParameter.list.splice(pos, 1)
        },
        addDisplayParameter() {
            if (this.displayParameter.key && this.displayParameter.value) {
                this.displayParameter.list.push({ key: this.displayParameter.key, value: this.displayParameter.value })
                this.displayParameter.key = ''
                this.displayParameter.value = ''
            }
        },
        rmDisplayParameter(pos) {
            this.displayParameter.list.splice(pos, 1)
        },
        getParameterType(resource, key) {
            if (typeof (config.SearchParameter[resource][key]) != 'undefined') {
                return config.SearchParameter[resource][key].type
            } else if (typeof (config.SearchParameter['_common'][key]) != 'undefined') {
                return config.SearchParameter['_common'][key].type
            } else {
                return ''
            }
        },
        getParameterModifier(resource, key) {
            let type = this.getParameterType(resource, key)
            if (type) {
                return config.SearchParameterModifier[type]
            }

        },
        // User Function
        downLoadJSON(pos, exportName) {
            let obj = (pos == -1) ? this.requestResult : this.requestResult.entry[pos].resource
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj, null, 4));
            var downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", exportName + ".json");
            document.body.appendChild(downloadAnchorNode); // required for firefox
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        },
        jsonToStr(json) {
            try {
                let jsonFormat = JSON.parse(json)
                return JSON.stringify(jsonFormat, null, 4)
            } catch (e) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Wrong format (json)',
                    text: 'Please check your data'
                })
                return json
            }
        },
        strToJson(text) {
            try {
                return JSON.parse(text)
            } catch (e) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Wrong format (json)',
                    text: 'Please check your data'
                })
                return false
            }
        },
        async importViewModalJSON(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.viewModal.editData = await this.readFile(files[0]);
            document.getElementById('viewModalImportFile').value = ''
        },
        async importCreateModalJSON(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createModal.data = await this.readFile(files[0]);
            document.getElementById('createModalImportFile').value = ''
        },
        readFile(file) {
            return new Promise(reslove => {
                let reader = new FileReader();
                reader.onload = e => {
                    return reslove(this.jsonToStr(e.target.result))
                };
                reader.readAsText(file);
            })
        }
    },
    async mounted() {
        try {
            this.resourceList = Object.keys(this.config.StructureDefinitionModel)
            // Get url query
            var getUrlString = location.href;
            var url = new URL(getUrlString);
            url.searchParams.get('server') && (this.setting.server = url.searchParams.get('server'))
            url.searchParams.get('resource') && (this.setting.resource = url.searchParams.get('resource'))
            url.searchParams.get('id') && (this.setting.id = url.searchParams.get('id'))
            fhirRequest.init({
                server: this.setting.server
            })
            if (url.searchParams.get('apply')) this.getFHIR()
        } catch (e) {
            console.log(e);
        }
    }
})


let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


console.json = (obj) => {
    console.log(JSON.parse(JSON.stringify(obj)))
}
