import React, { useState } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Button, Space, Table } from 'antd'
import { FileTextOutlined, EditOutlined, DeleteOutlined, BlockOutlined } from '@ant-design/icons'
import DATA from './data.json'
import Resourcesconfigjson from '../../Configs/Resources.config.json'
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons'
import { HTTP } from '../../Types/Query'
import { capitalizeFirstLetter } from './../../Utils/string.converter'
import { PatientCols } from '../ColsType/PatientCols'
import { ConditionCols } from '../ColsType/ConditionCols'
import { MedicationCols } from '../ColsType/MedicationCols'
import { DiagnosticReportCols } from '../ColsType/DiagnosticReportCols'
import { EncounterCols } from '../ColsType/EncounterCols'
import { ProcedureCols } from '../ColsType/ProcedureCols'
import { PractitionerCols } from '../ColsType/PractitionerCols'
import { OrganizationCols } from '../ColsType/OrganizationCols'
import { MedicationRequestCols } from '../ColsType/MedicationRequestCols'
import { ObservationCols } from '../ColsType/ObservationCols'
import { PractitionerRoleCols } from '../ColsType/PractitionerRoleCols'
import { AllergyIntoleranceCols } from '../ColsType/AllergyIntoleranceCols'
import { MedicationStatementCols } from '../ColsType/MedicationStatementCols'
import { CompositionCols } from '../ColsType/CompositionCols'
import { MedicationDispenseCols } from '../ColsType/MedicationDispenseCols'
import { SpecimenCols } from '../ColsType/SpecimenCols'
import { LocationCols } from '../ColsType/LocationCols'
import { ImagingStudyCols } from '../ColsType/ImagingStudyCols'
import { MediaCols } from '../ColsType/MediaCols'
import { BundleCols } from '../ColsType/BundleCols'

import { QueryType } from '../../Types/Query'

const JSONTable = ({
    openModal,
    changeJSONData,
    fetchJson,
    querys,
    updateQueryData,
    updateInputJson,
}: {
    openModal: () => void
    changeJSONData: (data: [] | {}) => void
    fetchJson: any
    querys: QueryType
    updateQueryData: (data: {}) => void
    updateInputJson: (data: string) => void
}) => {
    const [expendedIndex, setExpendedIndex] = useState<number>(-1)
    const [expendedColName, setExpendedColName] = useState<string>('')
    const [expendedData, setExpendedData] = useState<{}[]>([])

    const columnsJSON: any = {
        Patient: PatientCols,
        Condition: ConditionCols,
        Medication: MedicationCols,
        DiagnosticReport: DiagnosticReportCols,
        Encounter: EncounterCols,
        Procedure: ProcedureCols,
        Practitioner: PractitionerCols,
        Organization: OrganizationCols,
        MedicationRequest: MedicationRequestCols,
        Observation: ObservationCols,
        PractitionerRole: PractitionerRoleCols,
        AllergyIntolerance: AllergyIntoleranceCols,
        MedicationStatement: MedicationStatementCols,
        Composition: CompositionCols,
        MedicationDispense: MedicationDispenseCols,
        Specimen: SpecimenCols,
        Location: LocationCols,
        ImagingStudy: ImagingStudyCols,
        Media: MediaCols,
        Bundle: BundleCols,
    }

    type ColType = {
        label: string
        name: string
        type: string
        childrens?: any[]
    }

    const expend = (index: number, columnName: string, record: {}[]) => {
        const expendIndex = expendedIndex === index ? -1 : index
        const expendColName = expendedIndex === index ? '' : columnName
        setExpendedData(record)
        setExpendedIndex(expendIndex)
        setExpendedColName(expendColName)
    }

    const handleClick = (data: {} | []) => {
        changeJSONData(data)
        openModal()
    }

    const switchToPUT = (record: any) => {
        updateQueryData({ HTTP: HTTP.PUT, id: record.id, resourceType: record.resourceType })

        delete record['key']
        updateInputJson(JSON.stringify(record))
    }
    const switchToDELETE = (record: any) => {
        updateQueryData({ HTTP: HTTP.DELETE, id: record.id, resourceType: record.resourceType })
    }

    const expandedRowRender = () => {
        const children =
            expendedData?.length > 0
                ? Object.entries(expendedData[0]).map(([key, value]) =>
                    typeof value === 'object'
                        ? {
                            title: capitalizeFirstLetter(key),
                            dataIndex: key,
                            key: key,
                            render: (record: {} | [], row: object, index: number) => {
                                return (
                                    <Button icon={<FileTextOutlined />} onClick={() => handleClick(record)}>
                                        JSON
                                    </Button>
                                )
                            },
                        }
                        : { title: capitalizeFirstLetter(key), dataIndex: key, key: key, ellipsis: true }
                )
                : []
        const columns = [{ title: capitalizeFirstLetter(expendedColName), children }]

        return <Table size="small" bordered columns={columns} dataSource={expendedData} pagination={false} />
    }

    const typeSwitch = ({ type, label, name, childrens }: ColType): {} => {
        switch (type) {
            case 'string':
                return name === 'id'
                    ? {
                        title: label,
                        dataIndex: name,
                        key: name,
                        fixed: true,
                        width: 100,
                        render: (record: {} | [], row: object, index: number) => {
                            return record || <div>-</div>
                        },
                    }
                    : {
                        title: label,
                        dataIndex: name,
                        key: name,
                        width: 150,
                        render: (record: {} | [], row: object, index: number) => {
                            return record || <div>-</div>
                        },
                    }
            case 'object':
                return {
                    title: label,
                    dataIndex: name,
                    key: name,
                    width: 150,
                    render: (record: {} | [], row: object, index: number) => {
                        return record ? (
                            <Button icon={<FileTextOutlined />} onClick={() => handleClick(record)}>
                                JSON
                            </Button>
                        ) : (
                            <div>-</div>
                        )
                    },
                }
            case 'array':
                return {
                    title: label,
                    key: name,
                    dataIndex: name,
                    width: 150,
                    render: (record: {}[], row: object, index: number) => {
                        const isClicked = index === expendedIndex && expendedColName === name
                        return record ? (
                            <Button
                                danger={isClicked}
                                onClick={() => expend(index, name, record)}
                                icon={isClicked ? <MinusSquareOutlined /> : <PlusSquareOutlined />} >
                                {isClicked ? 'Close' : 'Expand'}
                            </Button>
                        ) : (
                            <div> - </div>
                        )
                    },
                }
            case 'array_string':
                return {
                    title: label,
                    key: name,
                    dataIndex: name,
                    width: 150,
                    render: (record: string[], row: object, index: number) => {
                        return <span>{record.join(',')}</span>
                    },
                }
            case 'boolean':
                return {
                    title: label,
                    key: name,
                    dataIndex: name,
                    width: 150,
                    render: (record: boolean, row: object, index: number) => {
                        return <span>{record ? 'yes' : 'no'}</span>
                    },
                }
            case "Reference":
                return {
                    title: label,
                    key: name,
                    dataIndex: name,
                    width: 150,
                    render: (record: { reference?: string }, row: object, index: number) => {
                        if (!record || !record.reference) {
                            return <div>-</div>;
                        }
                        const recordArray = record.reference ? record.reference.split("/") : [];
                        return record && record.reference ? (
                            <Link target="_blank" to={`?Reference=true&ReferenceResourceType=${recordArray[0]}&ReferenceID=${recordArray[1]}&ReferenceServerURL=${querys.serverURL}`}>
                                <Button icon={<BlockOutlined />} type='primary'>
                                    Reference
                                </Button>
                            </Link >
                        ) : (
                            <div>-</div>
                        );
                    },
                };

            default:
                return {}
        }
    }

    const columns = [
        ...columnsJSON[querys.resourceType].map((col: ColType) => typeSwitch(col)),
        {
            title: 'Actions',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (e: ColType) => (
                <Space>
                    <Button icon={<FileTextOutlined />} onClick={() => handleClick(e)}></Button>
                    <Button icon={<EditOutlined />} onClick={() => switchToPUT(e)}></Button>
                    <Button icon={<DeleteOutlined />} onClick={() => switchToDELETE(e)}></Button>
                </Space>
            ),
        },
    ]

    return (
        <Table
            columns={columns}
            expandable={{
                expandedRowRender,
                expandIcon: () => <></>,
            }}
            expandedRowKeys={[expendedIndex]}
            dataSource={fetchJson.map((d: { resource: object }, i: number) => ({ key: i, ...d.resource }))}
            pagination={false}
            scroll={{ x: window.innerWidth, y: 500 }}
        />
    )
}

export default JSONTable
//handleClick(fetchJson)
