import React from 'react';
import { Table, Button, Input, Select } from 'antd';
import { getApplicationList } from "../../service/application";

const Search = Input.Search;
const Option = Select.Option;

class ApplicationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
            query: {
                type: 'appName',
                keyword: '',
                pageSize: 10,
                pageNum: 1
            }
        }
    }

    componentWillMount() {
        this.searchApplicationList();
    }

    searchApplicationList = () => {
        getApplicationList(this.state.query).then(res => {
            console.log(res);
            this.setState({
                data: res.result.items.map(item => {
                    return {
                        ...item,
                        key: item.appId
                    }
                }),
                total: res.result.total
            });
        })
    }

    handleSeeDetail = (record) => {
        this.props.history.push(`/dashboard/application/detail/${record.appId}`);
    }

    handleCreate = () => {
        this.props.history.push(`/dashboard/application/create`);
    }

    handleTypeChange = () => {
        //
    }

    handleSearch = (value) => {
        this.setState({
            query: {
                ...this.state.query,
                keyword: value,
                pageNum: 1,
            }
        }, this.searchApplicationList);
    }

    handlePagerChange = (page) => {
        this.setState({
            query: {
                ...this.state.query,
                pageNum: page.current,
                pageSize: page.pageSize
            }
        }, this.searchApplicationList)
    }

    render() {
        const { data, query, total } = this.state;
        const pager = {
            simple: true,
            total,
            current: query.pageNum,
            pageSize: query.pageSize
        };
        const columns = [
            {
                title: 'ID',
                dataIndex: 'appId',
                align: 'center',
                width: 50,
            },
            {
                title: '应用名称',
                dataIndex: 'appName',
                align: 'center',
            },
            {
                title: '应用信息',
                dataIndex: 'appInfo',
                align: 'center',
                width: 200,
            },
            {
                title: '状态',
                dataIndex: 'status',
                align: 'center',
                width: 80,
                render: (text) => text === 1 ? '运行中' : '已删除'
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
                width: 100,
                render: (text, record) => <Button size="small" type="dashed" onClick={() => this.handleSeeDetail(record) }>详情</Button>
            }
        ];

        return (
            <div>
                <div style={{ marginBottom: '15px' }}>
                    <Select defaultValue={query.type} style={{ width: 150, marginRight: '10px' }} onChange={this.handleTypeChange}>
                        <Option value="appName">按appName检索</Option>
                        <Option value="appKey">按appKey检索</Option>
                    </Select>
                    <Search
                        placeholder="请输入检索内容"
                        onSearch={this.handleSearch}
                        style={{ width: 200 }}
                    />
                    <Button type="primary" style={{ float: 'right' }} onClick={this.handleCreate}>新建应用</Button>
                </div>
                <Table bordered columns={columns} dataSource={data} pagination={pager} onChange={this.handlePagerChange} />
            </div>
        )
    }
}

export default ApplicationList;
