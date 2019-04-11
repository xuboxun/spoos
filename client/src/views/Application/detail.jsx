import React from 'react';
import {List, message, Table, Button} from 'antd';
import { getApplicationDetail, getApplicationObjects } from '../../service/application';

class ApplicationDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            appId: props.match.params.appId,
            detail: {},
            objects: {
                items: [],
                total: 0
            },
            query: {
                pageSize: 10,
                pageNum: 1
            }
        }
    }

    componentWillMount() {
        this.searchApplicationDetail();
        this.searchObjects();
    }

    searchApplicationDetail = () => {
        getApplicationDetail(this.state.appId).then(res => {
            if (res.code === 200) {
                this.setState({
                    detail: res.result
                })
            } else {
                message.error(`获取应用详情失败，请稍后再试：${res.msg}`);
            }
        })
    }

    searchObjects = () => {
        getApplicationObjects(this.state.appId).then(res => {
            if (res.code === 200) {
                this.setState({
                    objects: {
                        items: res.result.items.map(item => {
                            return {
                                ...item,
                                key: item.objectId
                            }
                        }),
                        total: res.result.total
                    }
                })
            } else {
                message.error(`获取对象列表失败，请稍后再试：${res.msg}`);
            }
        })
    }

    handlePagerChange = (page) => {
        this.setState({
            query: {
                pageNum: page.current,
                pageSize: page.pageSize
            }
        }, this.searchObjects)
    }

    handleCopyLink = (record) => {

    }

    handleReview = (record) => {
        // window.open(`/object/${record.appKey}/${record.objectKey}`)
    }

    render() {
        const { detail, objects, query } = this.state;
        const { appId, appName, appInfo, appKey, appSecret, status, createTime, updateTime } = detail;
        const DetailData = [
            { key: '应用Id', value: appId },
            { key: '应用名称', value: appName },
            { key: '应用信息', value: appInfo },
            { key: '应用Key', value: appKey },
            { key: '应用秘钥', value: appSecret },
            { key: '运行状态', value: status === 0 ? '已删除' : '运行中' },
            { key: '创建时间', value: createTime ? (new Date(+createTime)).toLocaleDateString() : '-' },
            { key: '更新时间', value: updateTime ? (new Date(+updateTime)).toLocaleDateString() : '-' },
        ];
        const pager = {
            simple: true,
            total: objects.total,
            current: query.pageNum,
            pageSize: query.pageSize
        };
        const columns = [
            {
                title: 'ID',
                dataIndex: 'objectId',
                align: 'center',
                width: 50,
            },
            {
                title: '源名称',
                dataIndex: 'sourceName',
                align: 'center',
            },
            {
                title: '类型',
                dataIndex: 'type',
                align: 'center',
                width: 150,
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                align: 'center',
                width: 120,
                render: (text) => text ? (new Date(+text)).toLocaleDateString() : '-'
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                align: 'center',
                width: 120,
                render: (text) => text ? (new Date(+text)).toLocaleDateString() : '-'
            },
            {
                title: '操作',
                dataIndex: 'opt',
                align: 'center',
                width: 150,
                render: (text, record) => {
                    return (
                        <div>
                            <Button size="small" type="dashed" style={{ marginRight: '5px' }} onClick={() => this.handleReview(record)}>预览</Button>
                            <Button size="small" type="dashed" onClick={() => this.handleCopyLink(record)}>链接</Button>
                        </div>
                    )
                }
            }
        ];
        return (
            <div>
                <List
                    size="small"
                    header={<div style={{ fontSize: '20px' }}>应用信息</div>}
                    footer={<div> </div>}
                    dataSource={DetailData}
                    renderItem={item => (
                        <List.Item>
                            <span style={{ display: 'inline-block', width: '100px', textAlign: 'right' }}>{item.key}：</span>
                            {item.value}
                        </List.Item>
                    )}
                />
                <Table
                    bordered
                    columns={columns}
                    dataSource={objects.items}
                    pagination={pager}
                    onChange={this.handlePagerChange}
                    expandedRowRender={record => {
                        const size = (record.size / 1024).toFixed(2);
                        return (
                            <div>
                                <p style={{ display: 'inline-block', width: '50%' }}>
                                    <span style={{ display: 'inline-block', width: '100px', textAlign: 'right' }}>objectKey：</span>
                                    {record.objectKey}
                                </p>
                                <p style={{ display: 'inline-block', width: '50%' }}>
                                    <span style={{ display: 'inline-block', width: '100px', textAlign: 'right' }}>文件Hash：</span>
                                    {record.hash}
                                </p>
                                <p style={{ display: 'inline-block', width: '50%' }}>
                                    <span style={{ display: 'inline-block', width: '100px', textAlign: 'right' }}>文件名：</span>
                                    {record.objectName}
                                </p>
                                <p style={{ display: 'inline-block', width: '50%' }}>
                                    <span style={{ display: 'inline-block', width: '100px', textAlign: 'right' }}>文件状态：</span>
                                    {record.status === 0 ? '已删除' : '正常'}
                                </p>
                                <p style={{ display: 'inline-block', width: '50%' }}>
                                    <span style={{ display: 'inline-block', width: '100px', textAlign: 'right' }}>文件大小：</span>
                                    {
                                        size >= 1024 ? `${(size / 1024).toFixed(2)}M` : `${size}K`
                                    }
                                </p>
                            </div>
                        )
                    }}
                />
            </div>
        )
    }
}

export default ApplicationDetail;
