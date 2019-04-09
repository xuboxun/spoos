import React from 'react';
import { Button } from 'antd';
import './index.css';

class Index extends React.Component {
    render() {
        return (
            <div className="index">
                <div className="content">
                    <h1 className="title">SPOOS</h1>
                    <h2 className="intro">简单、面向个人的对象存储服务</h2>
                    <div className="login">
                        <Button style={{ width: '100px' }}>登录</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index;
