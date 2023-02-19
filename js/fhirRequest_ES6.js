const fhirRequest = (function () {
    // 連線設定
    const reqSetting = {
        server: null,
        token: null
    }

    /**
     * 初始化參數
     * @param {object} obj 設定參數
     */
    function init(obj) {
        for (let key of Object.keys(reqSetting)) {
            if (Object.keys(obj).includes(key)) {
                reqSetting[key] = obj[key]
            }
        }
    }

    function getSetting() {
        console.log(reqSetting)
    }

    function buildOption(option) {
        if (reqSetting.token) {
            if (option.headers == undefined) {
                option.headers = { 'Authorization': `Bearer ${reqSetting.token}` }
            } else {
                option.headers['Authorization'] = `Bearer ${reqSetting.token}`
            }
        }
        return option
    }

    function GET(resource, query = {}, manual = false) {
        return new Promise((reslove, reject) => {
            if (!resource) return reject(`ERROR: undefined request resource or url`)
            if (manual) {
                var url = resource
            } else {
                if (!reqSetting.server) return reject(`ERROR: please use init() to set the server url`)
                // Request url
                var url = `${reqSetting.server}/${resource}`
                if (query && Object.keys(query).length > 0 && !url.includes('?')) {
                    url += `?${Object.keys(query).map(function (key, value) { return [key, query[key]].join('='); }).join('&')}`
                }
            }
            // Request option
            let option = buildOption({
                method: 'GET',
                headers: { 'Content-Type': 'application/fhir+json;charset=UTF-8' }
            })
            // Request
            fetch(url, option)
                .then(async res => {
                    return reslove({
                        status: res.status,
                        text: res.statusText,
                        data: await res.json(),
                        url: res.url
                    })
                }).catch(err => {
                    return reject(err.message)
                })
        })
    }

    function POST(resource, data, manual = false) {
        return new Promise((reslove, reject) => {
            if (!resource) return reject(`ERROR: undefined request resource or url`)
            if (manual) {
                var url = resource
            } else {
                if (!reqSetting.server) return reject(`ERROR: please use init() to set the server url`)
                // Request url
                var url = `${reqSetting.server}/${resource}`
            }
            // Request option
            let option = buildOption({
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/fhir+json;charset=UTF-8' }
            })
            // Request
            fetch(url, option)
                .then(async res => {
                    return reslove({
                        status: res.status,
                        text: res.statusText,
                        data: await res.json(),
                        url: res.url
                    })
                }).catch(err => {
                    return reject(err)
                })
        })
    }

    function PUT(resource, data, manual = false) {
        return new Promise((reslove, reject) => {
            if (!resource) return reject(`ERROR: undefined request resource or url`)
            if (manual) {
                var url = resource
            } else {
                if (!reqSetting.server) return reject(`ERROR: please use init() to set the server url`)
                // Request url
                var url = `${reqSetting.server}/${resource}`
            }
            // Request option
            let option = buildOption({
                method: 'PUT',
                body: data,
                headers: { 'Content-Type': 'application/fhir+json;charset=UTF-8' }
            })
            // Request
            fetch(url, option)
                .then(async res => {
                    return reslove({
                        status: res.status,
                        text: res.statusText,
                        data: await res.json(),
                        url: res.url
                    })
                }).catch(err => {
                    return reject(err)
                })
        })
    }
    function DELETE(resource, manual = false) {
        return new Promise((reslove, reject) => {
            if (!resource) return reject(`ERROR: undefined request resource or url`)
            if (manual) {
                var url = resource
            } else {
                if (!reqSetting.server) return reject(`ERROR: please use init() to set the server url`)
                // Request url
                var url = `${reqSetting.server}/${resource}`
            }
            // Request option
            let option = buildOption({
                method: 'DELETE'
            })
            // Request
            fetch(url, option)
                .then(async res => {
                    return reslove({
                        status: res.status,
                        text: res.statusText,
                        data: await res.json(),
                        url: res.url
                    })
                }).catch(err => {
                    return reject(err)
                })
        })
    }

    return {
        init,
        getSetting,
        get: GET,
        post: POST,
        put: PUT,
        delete: DELETE
    };
}())

export default fhirRequest