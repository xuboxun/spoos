import React from 'react';
import { withRouter } from 'react-router-dom';
import {Icon, Layout, Menu} from "antd";


const { Sider } = Layout;

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: props.location.pathname
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            active: nextProps.location.pathname
        })
    }

    handleMenuClick = ({ key }) => {
        this.props.history.push(key);
    }

    handleGoIndex = () => {
        this.props.history.push('/');
    }

    render() {
        const { active } = this.state;
        return (
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => { console.log(broken); }}
                onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
            >
                <div className="logo">
                    <p style={{ cursor: 'pointer' }} onClick={this.handleGoIndex}>Spoos Client</p>
                    <p>简单面向个人的对象存储服务</p>
                </div>
                <Menu theme="dark" mode="inline" selectedKeys={[active]} onClick={this.handleMenuClick}>
                    <Menu.Item key="/dashboard/home">
                        <Icon type="dashboard" />
                        <span className="nav-text">控制面板</span>
                    </Menu.Item>
                    <Menu.Item key="/dashboard/application/list">
                        <Icon type="ordered-list" />
                        <span className="nav-text">应用列表</span>
                    </Menu.Item>
                    <Menu.Item key="/dashboard/application/create">
                        <Icon type="folder-add" />
                        <span className="nav-text">创建应用</span>
                    </Menu.Item>
                    <Menu.Item key="/dashboard/object/list">
                        <Icon type="profile" />
                        <span className="nav-text">对象列表</span>
                    </Menu.Item>
                    <Menu.Item key="/dashboard/object/upload">
                        <Icon type="cloud-upload" />
                        <span className="nav-text">对象存储</span>
                    </Menu.Item>
                    <Menu.Item key="/dashboard/docs">
                        <Icon type="file-markdown" />
                        <span className="nav-text">文档中心</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(Sidebar);
