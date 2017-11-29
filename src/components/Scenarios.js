import React, { Component } from 'react';
import './Scenarios.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactSelectize, SimpleSelect, MultiSelect } from 'react-selectize';

class Scenarios extends Component {

    render () {

        return (
            <div className="row">
                <h2 className="s">SCENARIOS</h2>
                <div className="col-md-12 head1-s">Regional level</div>
                <div className="col-md-12 drop">
                <SimpleSelect placeholder="Select level"
                            theme="material"
                            className="sel"
                            onValueChange={value => alert(value)}
                            options = {this.props.data.map(
                                element => ({label: element.name, value: element.name})
                            )}>
                </SimpleSelect>
                </div>
                <div className="col-md-12 head-s">Region</div>
                <div className="col-md-12 drop">
                <SimpleSelect placeholder="Select region"
                            theme="material"
                            className="sel">
                    <option value = "region">Region</option>
                    <option value = "municipality">Municipality</option>
                </SimpleSelect>
                </div>
                <div className="col-md-12 head-s">Scenario Collection</div>
                <div className="col-md-12 drop">
                <SimpleSelect placeholder="Select scenario group"
                            theme="material"
                            className="sel">
                    <option value = "region">Region</option>
                    <option value = "municipality">Municipality</option>
                </SimpleSelect>
                </div>
                <div className="col-md-12 head-s">Scenarios</div>
                <div className="col-md-12 mult">
                <MultiSelect placeholder = "Select scenarios"
                            theme="material"
                            className="sel"
                            options = {["1", "2", "3"].map(
                            scenario => ({label: scenario, value: scenario})
                            )}>
                </MultiSelect>
                </div>
                <div className="col-md-12 head-s">Time period</div>
                <div className="col-sm-12 drop">
                <SimpleSelect placeholder="Select time period"
                            theme="material"
                            className="sel">
                    <option value = "period1">2021 (- 2025)</option>
                    <option value = "period2">2026 (- 2030)</option>
                    <option value = "period3">2031 (- 2035)</option>
                    <option value = "period4">2036 (- 2040)</option>
                    <option value = "period5">2041 (- 2045)</option>
                    <option value = "period6">2046 (- 2050)</option>
                </SimpleSelect>
                </div>
            </div>
        )

    }
}

export default Scenarios;