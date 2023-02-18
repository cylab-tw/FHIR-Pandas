export enum HTTP {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export type QueryType = {
    HTTP: string
    URLHeader: string
    URL: string
    serverURL: string
    resourceType: string
    id: string
    token: string
    sortBy: string
    pageCount: number
    parameters: ParameterType[]
    headers: { header: string; value: string }[]
}
export type ColumnType = {
    label: string
    key: string
}

export type ResourceType = {
    type: string
    cols: ColumnType[]
}

export type ParameterType = {
    parameter: string
    value: string
}

export type QueryUIProps = {
    querys: QueryType
    valueOnChange: (columnName: string, value: string | number | ParameterType[]) => void
    onReset: () => void
    sendRequest: () => void
    updateInputJson: (value: string) => void
    inputJson: string
}
