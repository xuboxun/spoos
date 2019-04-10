import React from 'react';
import { Form, Input, Button, Modal, message, List } from 'antd';
import { createApplication, isNameExisted } from '../../service/application';

const { TextArea } = Input;

class ApplicationCreate extends React.Component {

    timer = null;

    validatorNameExist = (rule, value, callback) => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            isNameExisted({
                appName: value
            }).then(res => {
                if (res.code === 200) {
                    if (res.result) {
                        callback('应用名称已存在');
                    } else {
                        callback();
                    }
                } else {
                    callback('查询名称出错，请稍后再试');
                }
            })
        }, 200);
    }

    handleCreate = (values) => {
        createApplication({
            appName: values.appName,
            appInfo: values.appInfo
        }).then(res => {
            if (res.code === 200) {
                const { appId, appName, appInfo, appKey, appSecret, status } = res.result;
                const data = [
                    { key: '应用Id', value: appId },
                    { key: '应用名称', value: appName },
                    { key: '应用信息', value: appInfo },
                    { key: '应用Key', value: appKey },
                    { key: '应用秘钥', value: appSecret },
                    { key: '运行状态', value: status === 0 ? '已删除' : '运行中' },
                ];
                Modal.success({
                    width: 600,
                    title: '应用创建成功',
                    content: (
                        <List
                            size="small"
                            header={<div style={{ textAlign: 'center' }}>应用信息</div>}
                            footer={<div style={{ textAlign: 'center' }}>欢迎使用</div>}
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <span style={{ display: 'inline-block', width: '100px', textAlign: 'right' }}>{item.key}：</span>
                                    {item.value}
                                </List.Item>
                            )}
                        />
                    ),
                    onOk: () => {
                        this.props.history.push('/dashboard/application/list')
                    },
                });
            } else {
                message.error(`应用创建失败，请稍后再试：${res.result.msg}`);
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // 表单校验
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.handleCreate(values);
            } else {
                message.error('表单校验失败，请检查后提交');
            }
        })
    }

    render() {
        const {
            getFieldDecorator,
        } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 20,
                    offset: 4,
                },
            },
        };
        return (
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="应用名称"
                    >
                        {getFieldDecorator('appName', {
                            rules: [
                                { required: true, message: 'Please input appName' },
                                { validator: this.validatorNameExist,}
                            ],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="应用信息"
                    >
                        {getFieldDecorator('appInfo', {
                            rules: [
                                { max: 200 }
                            ]
                        })(
                            <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">创建</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Form.create({ name: 'ApplicationCreate' })(ApplicationCreate);
