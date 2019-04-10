import React from 'react';
import { Layout } from 'antd';
import { Switch, Route, Redirect } from 'react-router';
import './container.css';

import Sidebar from '../../components/Sidebar';

import Dashboard from '../../views/Dashboard';
import ApplicationCreate from '../../views/ApplicationCreate';
import ApplicationList from '../../views/Application';
import ApplicationDetail from '../../views/Application/detail';
import DocCenter from '../../views/DocCenter';

const { Header, Content, Footer } = Layout;

class Container extends React.Component {
    render() {
        return (
            <Layout className="container">
                <Sidebar />
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Switch>
                                <Redirect exact from='/dashboard' to='/dashboard/home'/>
                                <Route exact path="/dashboard/home" component={ Dashboard } />
                                <Route exact path="/dashboard/application/create" component={ ApplicationCreate } />
                                <Route exact path="/dashboard/application/list" component={ ApplicationList } />
                                <Route exact path="/dashboard/application/detail/:appId" component={ ApplicationDetail } />
                                <Route exact path="/dashboard/docs" component={ DocCenter } />
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
