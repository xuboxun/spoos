import React from 'react';
import { Layout, Button, Avatar, Dropdown, Menu, message } from 'antd';
import { Switch, Route, Redirect } from 'react-router';
import './container.css';

import Sidebar from '../../components/Sidebar';

import Dashboard from '../../views/Dashboard';
import ApplicationList from '../../views/Application';
import ApplicationCreate from '../../views/Application/create';
import ApplicationDetail from '../../views/Application/detail';
import ObjectList from '../../views/Object';
import ObjectUpload from '../../views/Object/upload';
import DocCenter from '../../views/DocCenter';
import {auth, logout} from "../../service/user";

const { Header, Content, Footer } = Layout;

class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: ''
        };
        this.checkLogin();
    }

    checkLogin = () => {
        auth().then(res => {
            if (res.code === 200 && res.result) {
                // 已登录
                this.setState({
                    account: res.result.account
                });
            } else {
                this.props.history.push('/');
            }
        })
    }

    handleLogout = () => {
        logout().then(res => {
            if (res.code === 200 && res.result) {
                this.props.history.push('/');
            } else {
                message.error('退出失败，请稍后再试');
            }
        })
    }

    render() {
        const { account } = this.state;
        return (
            <Layout className="container">
                <Sidebar />
                <Layout>
                    <Header style={{ background: '#fff', padding: '0 16px' }}>
                        <Dropdown overlay={(
                            <Menu>
                                <Menu.Item onClick={this.handleLogout} style={{ width: '100px', textAlign: 'center' }}>
                                    退出
                                </Menu.Item>
                            </Menu>
                        )}>
                            <div style={{ display: 'inline-block', float: 'right', cursor: 'pointer' }}>
                                <span style={{ fontSize: '16px', marginRight: '10px' }}>{ account }</span>
                                <Avatar style={{ backgroundColor: '#87d068' }} shape="square" size="small" icon="user" />
                            </div>
                        </Dropdown>
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'auto' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Switch>
                                <Redirect exact from='/dashboard' to='/dashboard/home'/>
                                <Route exact path="/dashboard/home" component={ Dashboard } />
                                <Route exact path="/dashboard/application/create" component={ ApplicationCreate } />
                                <Route exact path="/dashboard/application/list" component={ ApplicationList } />
                                <Route exact path="/dashboard/application/detail/:appId" component={ ApplicationDetail } />
                                <Route exact path="/dashboard/object/list" component={ ObjectList } />
                                <Route exact path="/dashboard/object/upload" component={ ObjectUpload } />
                                <Route exact path="/dashboard/docs" component={ DocCenter } />
                                <Redirect to='/error' />
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        ©2019 Spoos 简单的面向个人的对象存储服务
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Container;
