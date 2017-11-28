import React, { Component } from 'react';
import './Scenarios.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactSelectize, SimpleSelect, MultiSelect } from 'react-selectize';

class Scenarios extends Component {

    render () {

        return (
            <div className="row">
                <div className="col-md-12 head">Regional level</div>
                <div className="col-md-12 drop">
                <SimpleSelect placeholder="Select level">
                    <option value = "region">Region</option>
                    <option value = "municipality">Municipality</option>
                </SimpleSelect>
                </div>
                <div className="col-md-12 head">Region</div>
                <div className="col-md-12 drop">
                <SimpleSelect placeholder="Select region">
                    <option value = "region">Region</option>
                    <option value = "municipality">Municipality</option>
                </SimpleSelect>
                </div>
                <div className="col-md-12 head">Scenario Collection</div>
                <div className="col-md-12 drop">
                <SimpleSelect placeholder="Select scenario group">
                    <option value = "region">Region</option>
                    <option value = "municipality">Municipality</option>
                </SimpleSelect>
                </div>
                <div className="col-md-12 head">Scenarios</div>
                <div className="col-md-12 mult">
                <MultiSelect
                    placeholder = "Select scenarios"
                    options = {["1", "2", "3"].map(
                    scenario => ({label: scenario, value: scenario})
                    )}
                >
                </MultiSelect>
                </div>
                <div className="col-md-12 head">Time period</div>
                <div className="col-sm-12 drop">
                <SimpleSelect placeholder="Select time period">
                    <option value = "period1"> 2021 (- 2025) </option>
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