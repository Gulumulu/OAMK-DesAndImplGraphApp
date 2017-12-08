import React, { Component } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Switch, Route } from 'react-router-dom';
import Main from './views/Main';
import Feedback from './views/Feedback';
import Layout from './Layout';
import LocalizedStrings from 'react-localization';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

class App extends Component {
    render() {
        return (
            <Switch>
                <Layout>
                    <Route exact path="/" component={ Main } />
                    <Route path="/feedback" component={ Feedback } />
                </Layout>
            </Switch>
		    );
    }
}

export default App;
