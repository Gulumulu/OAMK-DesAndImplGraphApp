import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './views/Main';
import Feedback from './views/Feedback';
import Layout from './Layout';

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path="/" component={ Main } />
                    <Route exact path="/feedback" component={ Feedback } />
                </Switch>
            </Layout>
        );
    }
}

export default App;
