import React from 'react';
import { Button } from 'antd';
import './index.css';
import Login from './components/Login';
import { auth } from "../../service/user";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginVisible: false,
            logged: false
        };
        this.checkLogin();
    }

    checkLogin = () => {
        auth().then(res => {
            if (res.code === 200 && res.result) {
                this.setState({
                    logged: true
                })
            } else {
                this.setState({
                    logged: false
                })
            }
        })
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

    handleEnterDashboard = () => {
        this.props.history.push('/dashboard');
    }
    
    render() {
        const { loginVisible, logged } = this.state;
        return (
            <div className="index">
                <div className="content">
                    <h1 className="title">SPOOS</h1>
                    <h2 className="intro">简单、面向个人的对象存储服务</h2>
                    <div className="login">
                        {
                            logged
                            ? <Button style={{ width: '150px' }} onClick={this.handleEnterDashboard}>进入控制台</Button>
                            : <Button style={{ width: '100px' }} onClick={this.handleLogin}>登录</Button>
                        }
                    </div>
                </div>
                <Login visible={loginVisible} onCancel={this.handleCancelLogin} />
            </div>
        )
    }
}

export default Index;
