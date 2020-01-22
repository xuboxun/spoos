import React from 'react';
import {Upload, Icon, message, Select, Button, List, Empty} from 'antd';
import filesize from 'filesize';
import ObjectPreview from '../../components/ObjectPreview';
import {getApplicationDetail, getApplicationList} from "../../service/application";
import {uploadObject} from "../../service/object";

const Option = Select.Option;
const Dragger = Upload.Dragger;

class ObjectUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            applicationList: [],
            appId: '',
            appKey: '',
            appSecret: '',
            appName: '',
            fileList: [],

            uploadResult: null
        }
    }

    componentWillMount() {
        this.searchApplicationList();
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

    searchApplicationDetail = () => {
        getApplicationDetail(this.state.appId).then(res => {
            if (res.code === 200) {
                this.setState({
                    appName: res.result.appName,
                    appKey: res.result.appKey,
                    appSecret: res.result.appSecret,
                })
            } else {
                message.error(`获取应用秘钥失败，请稍后再试：${res.msg}`);
            }
        })
    }

    handleTypeChange = (value) => {
        this.setState({
            appId: value,
            appKey: '',
            appSecret: '',
            appName: '',
            uploadResult: null
        }, this.searchApplicationDetail)
    }

    handleBeforeUpload = (file) => {
        this.setState({
            fileList: [file],
            uploadResult: null
        });
        return false;
    }
    handleRemove = () => {
        this.setState({
            fileList: []
        });
    }

    dataCheck = () => {
        const { appKey, appSecret, fileList } = this.state;
        const file = fileList[0];

        return !(!appKey || !appSecret || !file);
    }

    handleUpload = () => {
        if (this.dataCheck()) {
            const { appKey, appSecret, fileList } = this.state;
            const file = fileList[0];

            let data = new FormData();
            data.append('appSecret', appSecret);
            data.append('files', file);
            uploadObject({
                appKey,
                data,
            }).then(res => {
                if (res.code === 200) {
                    console.log(res);
                    this.setState({
                        uploadResult: res.result
                    })
                } else {
                    message.error(`上传出错：${res.msg}`);
                }
            })
        } else {
            message.warning('请检查数据');
        }
    }

    renderUploadResult = () => {
        const { appName, uploadResult } = this.state;

        if (uploadResult) {
            const { apiPath, nginxPath, object } = uploadResult;
            const { appKey, objectId, objectKey, objectName, sourceName, type, size, hash, createTime } = object;

            const uploadData = [
                {
                  key: 'api访问地址',
                  value: apiPath,
                  append: (
                    <React.Fragment>
                      <Button>复制地址</Button>
                      <Button>二维码</Button>
                    </React.Fragment>
                  )
                },
                {
                  key: 'nginx访问地址',
                  value: nginxPath,
                  append: (
                    <React.Fragment>
                      <Button>复制地址</Button>
                      <Button>二维码</Button>
                    </React.Fragment>
                  )
                },
                { key: '应用名称', value: appName },
                { key: 'appKey', value: appKey },
                { key: 'objectId', value: objectId },
                { key: 'objectKey', value: objectKey },
                { key: 'objectName', value: objectName },
                { key: 'hash', value: hash },
                { key: '源名称', value: sourceName },
                { key: '类型', value: type.substr(type.indexOf('/') + 1) },
                { key: '大小', value: filesize(size) },
                { key: '创建时间', value: createTime ? (new Date(+createTime)).toLocaleDateString() : '-' },
            ];
            return <div>
                <List
                    header={<div> </div>}
                    footer={<div> </div>}
                    dataSource={uploadData}
                    renderItem={item => (
                        <List.Item>
                            <span style={{ display: 'inline-block', width: '150px' }}>{item.key}：</span>
                            <span style={{
                              maxWidth: '100%',
                              overflow: 'hidden', 
                              textOverflow: 'ellipsis',
                              display: 'inline-block'
                            }}>
                              {item.value}
                            </span>
                        </List.Item>
                    )}
                />
                <p>预览</p>
                <ObjectPreview type={type} src={apiPath} />
            </div>;
        } else {
            return <Empty />;
        }
    }

    render() {
        const { applicationList, fileList } = this.state;
        const props = {
            fileList,
            multiple: false,
            beforeUpload: this.handleBeforeUpload,
            onRemove: this.handleRemove,
        };
        return (
            <div>
                <Select
                    placeholder="请选择应用"
                    allowClear
                    style={{ width: 400, marginRight: '10px' }}
                    onChange={this.handleTypeChange}>
                    {
                        applicationList.map(item => <Option value={item.appId} key={item.appId}>{item.appName}</Option>)
                    }
                </Select>
                <div style={{ margin: '15px 0' }}>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="cloud-upload" />
                        </p>
                        <p className="ant-upload-hint">支持单文件上传，大小限制100M以内</p>
                    </Dragger>
                </div>
                <Button type="primary" size="large" style={{ width: '100px' }} onClick={this.handleUpload}>上传</Button>

                <div style={{ marginTop: '20px' }}>
                    <div style={{ fontSize: '16px' }}>上传数据详情</div>
                    {this.renderUploadResult()}
                </div>
            </div>
        )
    }
}

export default ObjectUpload;
