import React, { Component } from 'react';
import Indicator from './Indicators';
import Scenario from './Scenarios';
import Graphs from './Graphs';
import 'bootstrap/dist/css/bootstrap.min.css';

class Menu extends Component {
    render () {

        return (
            <div class="container">
                <h1 class="header">Forest Service Indicator</h1>
                <div class="row">
                    <div class="col-md-3">
                        <Scenario />
                    </div>
                    <div class="col-md-6">
                        <Graphs />
                    </div>
                    <div class="col-md-3">
                        <Indicator />
                    </div>
                </div>
            </div>
        )

    }
}

export default Menu;