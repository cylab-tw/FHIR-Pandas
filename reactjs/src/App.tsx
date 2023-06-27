import React, { useState, useEffect } from 'react'
import QueryUI from './Components/QueryUI/index'
import { QueryType, ColumnType, ResourceType, ParameterType, HTTP } from './Types/Query'
import { GET, init, POST, PUT, DELETE } from './httpRequest'
import RESOURCES from './Configs/Resources.config.json'
import JSONTable from './Components/JSONTable'
import { message, Space, notification, Tag } from 'antd'
import JSONModal from './Components/JSONModal'

function App() {

    const urlParams = new URLSearchParams(window.location.search);

    const urlParamsReference: Boolean = Boolean(urlParams.get("Reference"))
    const ReferenceResourceType: string = urlParams.get("ReferenceResourceType") || ""
    const ReferenceID: string = urlParams.get("ReferenceID") || ""
    const ReferenceServerURL: string = urlParams.get("ReferenceServerURL") || ""

    const initialQuerys: QueryType = {
        HTTP: HTTP.GET,
        URLHeader: 'https://',
        serverURL: urlParamsReference ? ReferenceServerURL : 'hapi.fhir.tw/fhir',
        resourceType: urlParamsReference ? ReferenceResourceType : RESOURCES[0].type,
        id: urlParamsReference ? ReferenceID : '',
        token: '',
        sortBy: 'id',
        pageCount: 20,
        parameters: [],
        headers: [],
    }
    const [querys, setQuerys] = useState<QueryType>(initialQuerys)
    const [JSONData, setJSONData] = useState<[] | {}>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [fetchJson, setFetchJson] = useState<[] | {}>([]) //存取response的json

    const [inputJson, setInputJson] = useState<string>('')

    useEffect(() => {
        //如果沒有URL沒有輸入參數的話，不發送請求
        sendRequest()
    }, [querys.resourceType])

    useEffect(() => {
        if (querys.HTTP !== HTTP.GET) {
            const { serverURL, resourceType, id } = querys
            // const URL = `${serverURL}/${resourceType}${id ? `/${id}` : ''}`
            setQuerys({
                ...querys,
                parameters: [],
                // URL,
            })
        }
    }, [querys.HTTP])

    const openNotification = ({ statusCode, message, color }: { statusCode: number; message: string; color: string }) => {
        notification.open({
            message: (
                <>
                    Server response：<Tag color={color}>{statusCode}</Tag>
                </>
            ),
            description: `${message}`,
        })
    }

    const responseHandler = (res: any) => {
        const message = res.data.msg ? res.data.msg : res?.issue?.map((i: any) => i.diagnostics).toString()

        if (res.status >= 200 && res.status < 300)
            openNotification({
                statusCode: res.status,
                message: `Successful`,
                color: 'blue',
            })
        else openNotification({ statusCode: res.status, message, color: 'red' })
    }

    const changeJSONData = (data: any) => {
        delete data['key']
        setJSONData(data)
    }

    const updateQueryData = (data: {}) => {
        setQuerys({ ...querys, ...data })
    }

    const updateInputJson = (data: string) => {
        const obj = JSON.parse(data)
        const formatValue = JSON.stringify(obj, undefined, 4)
        setInputJson(formatValue)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const valueOnChange = (columnName: string, value: string | number | ParameterType[]): void => {
        const URLHeader = columnName === 'URLHeader' ? value : querys.URLHeader
        const serverURL = columnName === 'serverURL' ? value : querys.serverURL
        const resourceType = columnName === 'resourceType' ? value : querys.resourceType
        const id = columnName === 'id' ? value : querys.id
        const parameters =
            columnName === 'parameters'
                ? Array.isArray(value)
                    ? value?.map(({ parameter, value }) => `${parameter}=${value || ''}`)
                    : []
                : querys.parameters?.map(({ parameter, value }) => `${parameter}=${value || ''}`)

        const sortBy = columnName === 'sortBy' ? value : querys.sortBy
        const pageCount = columnName === 'pageCount' ? value : querys.pageCount

        // const params = `?${`_sort=${sortBy}`}&${`_count=${pageCount}`}${parameters?.length ? '&' : ''}${parameters?.join('&')}`
        const params = `?${`_count=${pageCount}`}${parameters?.length ? '&' : ''}${parameters?.join('&')}`
        // const URL =
        //     querys.HTTP === HTTP.GET
        //         ? `${URLHeader}${serverURL}/${resourceType}${id ? `/${id}` : ''}${id ? '' : params}`
        //         : `${URLHeader}${serverURL}/${resourceType}${id ? `/${id}` : ''}`

        setQuerys({
            ...querys,
            [columnName]: value,
            // URL,
        })
    }

    const onReset = () => {
        setQuerys(initialQuerys)
    }

    const sendRequest = () => {
        init({ server: querys.serverURL, token: querys.token, resourceType: querys.resourceType })
        const URL = `${querys.URLHeader}${querys.serverURL}/${querys.resourceType}${querys.id ? `/${querys.id}` : ''}`
        console.log(URL)
        switch (querys.HTTP) {
            case 'GET':
                GET(URL)
                    .then(res => {
                        let data = []
                        if (querys.id) data = [{ resource: res.data }]
                        else data = res.data.entry?.length > 0 ? res.data.entry : []

                        setFetchJson(data)
                        responseHandler(res)
                    })
                    .catch(err => openNotification({ statusCode: 404, message: 'Bad Request', color: 'red' }))
                break
            case 'POST':
                POST(URL, inputJson)
                    .then(res => {
                        responseHandler(res)
                    })
                    .catch(err => openNotification({ statusCode: 404, message: 'Bad Request', color: 'red' }))
                break
            case 'PUT':
                PUT(URL, inputJson)
                    .then(res => {
                        responseHandler(res)
                    })
                    .catch(err => openNotification({ statusCode: 404, message: 'Bad Request', color: 'red' }))
                break
            case 'DELETE':
                DELETE(URL)
                    .then(res => {
                        responseHandler(res)
                    })
                    .catch(err => openNotification({ statusCode: 404, message: 'Bad Request', color: 'red' }))
                break
        }
    }

    return (
        <div style={{ padding: '1rem' }}>
            <div>
                <QueryUI
                    querys={querys}
                    valueOnChange={valueOnChange}
                    onReset={onReset}
                    sendRequest={sendRequest}
                    updateInputJson={updateInputJson}
                    inputJson={inputJson}
                />
            </div>

            {/* 只有GET顯示下方Table*/}
            {querys.HTTP === 'GET' && (
                <div style={{ marginTop: '2rem' }}>
                    <JSONTable
                        openModal={openModal}
                        querys={querys}
                        changeJSONData={changeJSONData}
                        fetchJson={fetchJson}
                        updateQueryData={updateQueryData}
                        updateInputJson={updateInputJson}
                    />
                    <JSONModal json={JSONData} isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />
                </div>
            )}
        </div>
    )
}

export default App
