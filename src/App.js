import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './views/Main';
import Print from './views/Print';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={ Main } />
                <Route exact path="/print" component={ Print } />
            </Switch>
        );
    }
}

export default App;
