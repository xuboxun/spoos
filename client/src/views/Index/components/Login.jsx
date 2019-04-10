import React from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'antd';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLogin = () => {
        // todo: 发送登录请求
        this.props.history.push('/dashboard');
    }

    handleCancel = () => {
        this.props.onCancel();
    }

    render() {
        const { visible } = this.props;
        return (
            <Modal
                title="Title"
                visible={visible}
                onCancel={this.handleCancel}
                footer={null}
            >
                <div>
                    <p>login</p>
                    <div>
                        <Button onClick={this.handleLogin}>登录</Button>
                        <Button onClick={this.handleCancel}>取消</Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withRouter(Login);
