import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';


import Index from './views/Index';
import Error from './views/Error';
import Container from './components/Container';

class App extends Component {
    render() {
        return (
            <Router basename="/client">
                <Switch>
                    <Route exact path="/" component={ Index } />
                    <Route path="/dashboard" component={ Container } />
                    <Route exact path="/error" component={Error} />
                    <Redirect to="/error" />
                </Switch>
            </Router>
        );
    }
}

export default App;
