import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';

import Index from './views/Index';
import Login from './views/Login';
import Error from './views/Error';
import Container from './components/Container';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={ Index } />
                    <Route exact path="/login" component={ Login } />
                    <Route path="/dashboard" component={ Container } />
                    <Route component={Error} />
                </Switch>
            </Router>
        );
    }
}

export default App;
