import React, { useState, useEffect } from 'react'
import { Input, Descriptions, Select, Button, Slider, Form, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined, AlignLeftOutlined } from '@ant-design/icons'
import RESOURCES from '../../Configs/Resources.config.json'

import { ColumnType, ResourceType, ParameterType, QueryUIProps } from '../../Types/Query'

const { Option, OptGroup } = Select

const SortBySelector = ({
    options,
    value,
    valueOnChange,
}: {
    options?: ColumnType[]
    value: string
    valueOnChange: (type: string, value: string) => void
}) => {
    return (
        <Select
            showSearch
            placeholder="Select a sortBy"
            optionFilterProp="children"
            onChange={value => valueOnChange('sortBy', value)}
            value={value}
            style={{ width: '100%' }}
            filterOption={(input, option) => (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())}
        >
            {options?.map(({ label, key }) => (
                <Option value={label} key={key}>
                    {label}
                </Option>
            ))}
        </Select>
    )
}

const ResourceTypeSelector = ({ value, valueOnChange }: { value: string; valueOnChange: (type: string, value: string) => void }) => {
    return (
        <Select value={value} showSearch style={{ width: '100%' }} onChange={e => valueOnChange('resourceType', e)}>
            {RESOURCES.map(({ type }) => (
                <Option value={type} key={type}>
                    {type}
                </Option>
            ))}
        </Select>
    )
}

const SearchParameterSelector = ({
    options,
    valueOnChange,
}: {
    options?: { label: string; key: string }[]
    valueOnChange: (type: string, value: ParameterType[]) => void
}) => {
    const [form] = Form.useForm()
    const onChange = () => {
        const parameters = form.getFieldValue('parameters')
        valueOnChange('parameters', parameters)
    }
    return (
        <Form form={form} onValuesChange={onChange}>
            <Form.List name="parameters">
                {(fields, { add, remove }) => (
                    <Space direction="vertical">
                        {fields.map((field, index) => (
                            <Space align="baseline" key={field.key}>
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please fill or delete this field.',
                                        },
                                    ]}
                                    name={[field.name, 'parameter']}
                                >
                                    <Select placeholder="Select a Parameter" showSearch style={{ minWidth: '10rem' }}>
                                        {options?.map(({ label, key }) => (
                                            <Option value={label} key={key}>
                                                {label}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please fill or delete this field.',
                                        },
                                    ]}
                                    name={[field.name, 'value']}
                                >
                                    <Input placeholder="Input a value" />
                                </Form.Item>

                                <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add Parameter
                            </Button>
                        </Form.Item>
                    </Space>
                )}
            </Form.List>
        </Form>
    )
}

const SearchHeaderSelector = ({ valueOnChange }: { valueOnChange: (type: string, value: ParameterType[]) => void }) => {
    const [form] = Form.useForm()
    const onChange = () => {
        const headers = form.getFieldValue('headers')
        valueOnChange('headers', headers)
    }
    return (
        <Form form={form} onValuesChange={onChange}>
            <Form.List name="headers">
                {(fields, { add, remove }) => (
                    <Space direction="vertical">
                        {fields.map((field, index) => (
                            <Space align="baseline" key={field.key}>
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please fill or delete this field.',
                                        },
                                    ]}
                                    name={[field.name, 'header']}
                                >
                                    <Input placeholder="Input a header type" />
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please fill or delete this field.',
                                        },
                                    ]}
                                    name={[field.name, 'value']}
                                >
                                    <Input placeholder="Input a value" />
                                </Form.Item>

                                <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                            </Space>
                        ))}
                        <></>
                        <Form.Item>
                            <Button type="dashed" onClick={() => add({})} block icon={<PlusOutlined />}>
                                Add Header
                            </Button>
                        </Form.Item>
                    </Space>
                )}
            </Form.List>
        </Form>
    )
}
const HTTPSelector = ({ value, valueOnChange }: { value: string; valueOnChange: (type: string, value: string) => void }) => {
    return (
        <Select value={value} onChange={e => valueOnChange('HTTP', e)}>
            <Option value="GET">GET</Option>
            <Option value="POST">POST</Option>
            <Option value="PUT">PUT</Option>
            <Option value="DELETE">DELETE</Option>
        </Select>
    )
}

const QueryUI = ({ querys, valueOnChange, onReset, sendRequest, inputJson, updateInputJson }: QueryUIProps) => {
    const { TextArea } = Input

    const textAreaOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        updateInputJson(value)
    }
    const formatJSON = () => {
        const obj = JSON.parse(inputJson)
        const formatValue = JSON.stringify(obj, undefined, 4)
        updateInputJson(formatValue)
    }

    const SelectBefore = (
        <Select defaultValue="https://" onChange={value => valueOnChange('URLHeader', value)}>
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    )

    return (
        <>
            <Descriptions title="RedPanda" bordered>
                <Descriptions.Item label="URL" span={3}>
                    <Space>
                        <Input
                            addonBefore={<HTTPSelector value={querys.HTTP} valueOnChange={valueOnChange} />}
                            style={{ width: '50vw' }}
                            value={querys.URL}
                            readOnly
                        />
                        <Button type="primary" onClick={sendRequest}>
                            Send
                        </Button>
                        <Button type="primary" danger onClick={onReset}>
                            Reset
                        </Button>
                    </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Server URL">
                    <Input addonBefore={SelectBefore} value={querys.serverURL} onChange={e => valueOnChange('serverURL', e.target.value)} />
                </Descriptions.Item>
                <Descriptions.Item label="Resource Type">
                    <ResourceTypeSelector value={querys.resourceType} valueOnChange={valueOnChange} />
                </Descriptions.Item>

                <Descriptions.Item label="ID">
                    <Input value={querys.id} onChange={e => valueOnChange('id', e.target.value)} />
                </Descriptions.Item>

                {querys.HTTP === 'GET' && (
                    <>
                        <Descriptions.Item label="Sort By">
                            <SortBySelector
                                options={RESOURCES.find(r => r.type === querys.resourceType)?.cols}
                                value={querys.sortBy}
                                valueOnChange={valueOnChange}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="Page Count" span={2}>
                            <Slider
                                value={querys.pageCount}
                                min={5}
                                max={200}
                                step={5}
                                onChange={value => valueOnChange('pageCount', value)}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="Search Parameters" span={1.5}>
                            <SearchParameterSelector
                                options={RESOURCES.find(res => res.type === querys.resourceType)?.cols?.filter(res => res.label !== 'id')}
                                valueOnChange={valueOnChange}
                            />
                        </Descriptions.Item>
                    </>
                )}

                <Descriptions.Item label="Token" span={4}>
                    <Input value={querys.token} onChange={e => valueOnChange('token', e.target.value)} />
                </Descriptions.Item>

                {querys.HTTP === 'POST' || querys.HTTP === 'PUT' ? (
                    <Descriptions.Item label="JSON" span={4}>
                        <Button style={{ marginBottom: '1rem' }} icon={<AlignLeftOutlined />} onClick={formatJSON}>
                            Format
                        </Button>
                        <TextArea rows={15} placeholder="input JSON" value={inputJson} onChange={textAreaOnChange} />
                    </Descriptions.Item>
                ) : (
                    <></>
                )}
            </Descriptions>
        </>
    )
}

export default QueryUI
