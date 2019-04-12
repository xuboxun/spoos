import React from 'react';
import {Button, Select, Input, Card, Popover, List, Icon, Row, Col, message} from "antd";
import ObjectPreview from '../../components/ObjectPreview';
import { getApplicationList } from "../../service/application";
import { getAllObjectList, getObjectDetailApi } from "../../service/object";

const Option = Select.Option;

class ObjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            applicationList: [],
            objectList: [],
            total: 0,
            query: {
                appKey: '',
                objectKey: '',
                objectName: '',
                pageSize: 10,
                pageNum: 1,
            }
        }
    }

    componentWillMount() {
        this.searchApplicationList();
        this.searchObjectList();
    }

    searchApplicationList = () => {
        getApplicationList({
            pageSize: 500
        }).then(res => {
            this.setState({
                applicationList: res.result.items.map(item => {
                    return {
                        ...item,
                        key: item.appId
                    }
                }),
            });
        })
    }

    searchObjectList = () => {
        getAllObjectList(this.state.query).then(res => {
            if (res.code === 200) {
                this.setState({
                    objectList: res.result.items.map(item => {
                        return {
                            ...item,
                            key: item.objectId
                        }
                    }),
                    total: res.result.total,
                })
            } else {
                message.error(`对象列表查询失败，请稍后再试：${res.result.msg}`);
            }
        })
    }

    handleFilterObjectKey = () => {
        //
    }

    handleUpload = () => {
        this.props.history.push('/dashboard/object/upload');
    }

    render() {
        const { query, applicationList, objectList } = this.state;
        return (
            <div>
                <div style={{ marginBottom: '15px' }}>
                    <Select
                        defaultValue={query.type}
                        placeholder="请选择应用"
                        allowClear
                        style={{ width: 200, marginRight: '10px' }}
                        onChange={this.handleTypeChange}>
                        {
                            applicationList.map(item => <Option value={item.appKey} key={item.appId}>{item.appName}</Option>)
                        }
                    </Select>
                    <Input
                        placeholder="请输入对象Key"
                        onChange={this.handleFilterObjectKey}
                        style={{ width: 200 }}
                    />
                    <Button type="primary" style={{ float: 'right' }} onClick={this.handleUpload}>对象存储</Button>
                </div>
                <div style={{ borderTop: '1px solid #dedede', paddingTop: '20px' }}>
                    <Row gutter={20}>
                        {
                            objectList.map(item => {
                                const { objectId, objectKey, appKey, type, sourceName, createTime, updateTime } = item;
                                let size = (item.size / 1024).toFixed(2);
                                size = size >= 1024 ? `${(size / 1024).toFixed(2)}M` : `${size}K`;
                                const data = [
                                    { key: 'appKey', value: appKey },
                                    { key: 'objectKey', value: objectKey },
                                    { key: '源名称', value: sourceName },
                                    { key: '类型', value: type.substr(type.indexOf('/') + 1) },
                                    { key: '大小', value: size },
                                    { key: '创建时间', value: createTime ? (new Date(+createTime)).toLocaleDateString() : '-' },
                                    { key: '更新时间', value: updateTime ? (new Date(+updateTime)).toLocaleDateString() : '-' },
                                ];
                                return (
                                    <Col xs={12} sm={8} lg={6} xl={4} xxl={3} key={objectId} style={{ marginBottom: '15px' }}>
                                        <Card style={{ display: 'inline-block', width: '100%' }}>
                                            <div style={{ height: '100px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <ObjectPreview type={type} src={getObjectDetailApi(appKey, objectKey)} />
                                            </div>
                                            <div style={{ marginTop: '10px' }}>
                                                <Popover
                                                    placement="right"
                                                    title={null}
                                                    arrowPointAtCenter
                                                    trigger="hover"
                                                    content={<List
                                                        header={null}
                                                        footer={null}
                                                        size="small"
                                                        dataSource={data}
                                                        renderItem={item => (
                                                            <List.Item>
                                                                <span style={{ display: 'inline-block', width: '100px' }}>{item.key}：</span>
                                                                {item.value}
                                                            </List.Item>
                                                        )}
                                                    />}>
                                                    <p style={{ textAlign: 'center', marginBottom: '0' }}><Icon type="eye" style={{ fontSize: '20px' }} /></p>
                                                </Popover>
                                            </div>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
            </div>
        )
    }
}

export default ObjectList;
