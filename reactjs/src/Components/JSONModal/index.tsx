import React from 'react'
import { Modal } from 'antd'
import ReactJson from 'react-json-view'

import { DownloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const JSONModal = ({
    json,
    isModalOpen,
    openModal,
    closeModal,
}: {
    json: {} | []
    isModalOpen: boolean
    openModal: () => void
    closeModal: () => void
}) => {
    return (
        <Modal open={isModalOpen} onOk={closeModal} onCancel={closeModal} footer={<DownloadJson json={json} />} width={1000}>
            <ReactJson src={json} />
        </Modal>
    )
}

const DownloadJson = (json: { json: {} | [] }) => {
    const onClick = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(json, null, 2))}`
        const link = document.createElement('a')
        const data: { id: string; resourceType: string } = json.json as any
        link.href = jsonString
        link.download = `${data.resourceType}${data.id}.json`

        link.click()
    }

    return (
        <Button type="primary" shape="round" icon={<DownloadOutlined />} onClick={() => onClick()} size="middle">
            Download JSON
        </Button>
    )
}

export default JSONModal
