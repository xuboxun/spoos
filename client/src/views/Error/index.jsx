import React from 'react';
import { Button } from 'antd';

class Error extends React.Component {

    handleGoIndex = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', transform: 'translate(0, -30%)' }}>
                    <h1>Spoos Client Error</h1>
                    <p style={{ marginBottom: '40px' }}>404 page not found</p>
                    <Button onClick={this.handleGoIndex}>前往首页</Button>
                </div>
            </div>
        )
    }
}

export default Error;
