import React from 'react';
import {Upload, Icon, message, Select, Button, List, Empty, Modal} from 'antd';
import filesize from 'filesize';
import QRCode from 'qrcode.react';
import copy from 'copy-to-clipboard';
import ObjectPreview from '../../components/ObjectPreview';
import {getApplicationDetail, getApplicationList} from "../../service/application";
import {uploadObject} from "../../service/object";

const Option = Select.Option;
const Dragger = Upload.Dragger;

const UrlOperator = ({ url }) => {
    const handleCopyUrl = () => {
        copy(url);
        message.success('链接copy成功')
    }

    const handleShowQrCode = () => {
        Modal.info({
            title: (
              <h2 style={{ fontSize: 20, fontWeight: 400, textAlign: 'center' }}>二维码</h2>
            ),
            content: (
              <div style={{ textAlign: 'center', marginBottom: 25 }}>
                  <div style={{ display: 'inline-block', padding: 6, paddingBottom: 1, border: '1px solid #e2e2e2', borderRadius: 3 }}>
                      <QRCode value={url} size={256} bgColor="white" />
                  </div>
              </div>
            ),
            centered: true,
            maskClosable: true,
            icon: null,
            okText: '确定',
            okButtonProps: {
                type: 'default',
                style: { position: 'absolute', left: '50%', bottom: 20, transform: 'translate(-50%, 0)' }
            }
        })
    }
    return (
      <React.Fragment>
          <Button onClick={handleCopyUrl} icon="copy" size="small">复制</Button>
          <Button onClick={handleShowQrCode} icon="qrcode" size="small" style={{ marginLeft: 5 }}>二维码</Button>
      </React.Fragment>
    )
}

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
                    append: <UrlOperator url={apiPath} />
                },
                {
                    key: 'nginx访问地址',
                    value: nginxPath,
                    append: <UrlOperator url={nginxPath} />
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
                            <span style={{ display: 'inline-block', width: '150px', flex: '0 0 auto' }}>{item.key}：</span>
                            <span
                                style={{
                                    maxWidth: '100%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    display: 'inline-block',
                                    marginRight: 10,
                                    marginBottom: 5
                                }}
                            >
                                {item.value}
                            </span>
                            {item.append ? item.append : null}
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
                    style={{ width: 400, maxWidth: '100%', marginRight: '10px' }}
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
