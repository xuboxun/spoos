import React from 'react';
import { Button } from 'antd';
import './index.css';
import Login from './components/Login';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginVisible: false
        }
    }
    
    handleLogin = () => {
        this.setState({
            loginVisible: true
        })
    }

    handleCancelLogin = () => {
        this.setState({
            loginVisible: false
        })
    }
    
    render() {
        const { loginVisible } = this.state;
        return (
            <div className="index">
                <div className="content">
                    <h1 className="title">SPOOS</h1>
                    <h2 className="intro">简单、面向个人的对象存储服务</h2>
                    <div className="login">
                        <Button style={{ width: '100px' }} onClick={this.handleLogin}>登录</Button>
                    </div>
                </div>
                <Login visible={loginVisible} onCancel={this.handleCancelLogin} />
            </div>
        )
    }
}

export default Index;
