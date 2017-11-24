import React, { Component } from 'react';
import './Scenarios.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ReactSelectize, SimpleSelect} from 'react-selectize';

class Scenarios extends Component {
    render () {

        return (
            <div className="row">
                <div className="col-md-12">Regional level</div>
                <div className="col-md-12">
                <SimpleSelect placeholder="Select the level">
                    <option value = "region">Region</option>
                    <option value = "municipality">Municipality</option>
                </SimpleSelect>
                </div>
                <div className="col-md-12">Region</div>
                <div className="col-md-12">
                <SimpleSelect placeholder="Select the level">
                    <option value = "region">Region</option>
                    <option value = "municipality">Municipality</option>
                </SimpleSelect>
                </div>
            </div>
        )

    }
}

export default Scenarios;