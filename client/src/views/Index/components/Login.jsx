import React from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Input, message } from 'antd';
import { login } from '../../../service/user';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: ''
        }
    }

    handleAccountChange = (e) => {
        this.setState({
            account: e.target.value
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = () => {
        const { account, password } = this.state;
        if (account && password) {
            login({
                account,
                password
            }).then(res => {
                if (res.code === 200 && res.result) {
                    this.props.history.push('/dashboard');
                } else {
                    message.error(`登录失败，请重试：${res.msg}`);
                }
            })
        } else {
            message.warning('请填写登录信息');
        }
    }

    handleCancel = () => {
        this.props.onCancel();
    }

    render() {
        const { visible } = this.props;
        return (
            <Modal
                title="登录"
                visible={visible}
                onCancel={this.handleCancel}
                footer={null}
            >
                <div>
                    <div>
                        <p>
                            <Input placeholder="用户名" onChange={this.handleAccountChange}/>
                        </p>
                        <p>
                            <Input.Password placeholder="密码" onChange={this.handlePasswordChange} />
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.handleLogin}>登录</Button>
                        <Button onClick={this.handleCancel} style={{ marginLeft: '10px' }}>取消</Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withRouter(Login);
