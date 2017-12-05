import React, { Component } from 'react';
import './Scenarios.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SimpleSelect, MultiSelect } from 'react-selectize';

class Scenarios extends Component {

    getTimeID(value) {
        this.props.dataIDs.time = value.value;
        this.props.displayGraphs();
    }

    getScenarioID(value) {
        this.props.dataIDs.scenarios = [];
        for (var i = 0, iLen = value.length; i < iLen; i++) {
            this.props.dataIDs.scenarios = (value[i].value);
        }
        this.props.displayGraphs();
    }

    render () {

        return (
            <div className="row">
                <h2 className="s">SCENARIOS</h2>
                <div className="col-md-12 head1-s">Regional level</div>
                <div className="col-md-12">
                <SimpleSelect placeholder="Select regional level"
                            theme="material"
                            onValueChange={ value => this.props.getRegionData(value) }
                            options = { this.props.data.map(
                                element => ({ label: element.name, value: element.id })
                            )}>
                </SimpleSelect>
                </div>
                <div className="col-md-12 head-s">Region</div>
                <div className="col-md-12">
                <SimpleSelect placeholder="Select region"
                            theme="material"
                            onValueChange={ value => this.props.getScenarioCollectionData(value) }
                            options = { this.props.dataRegions.map(
                                element => ({ label: element.name, value: element.id })
                            )}>
                </SimpleSelect>
                </div>
                <div className="col-md-12 head-s">Scenario Collection</div>
                <div className="col-md-12">
                <SimpleSelect placeholder="Select scenario collection"
                            theme="material"
                            onValueChange={ value => this.props.getScenarioData(value) }
                            options = { this.props.dataScenarioCollection.map(
                                element => ({ label: element.name, value: element.id })
                            )}>
                </SimpleSelect>
                </div>
                <div className="col-md-12 head-s">Scenarios</div>
                <div className="col-md-12">
                <MultiSelect placeholder = "Select scenarios"
                            theme="material"
                            onValuesChange={ value => this.getScenarioID(value) }
                            options = { this.props.dataScenarios.map(
                                element => ({ label: element.description, value: element.id })
                            )}>
                </MultiSelect>
                </div>
                <div className="col-md-12 head-s">Time period</div>
                <div className="col-sm-12">
                <SimpleSelect placeholder="Select time period"
                            className="sel"
                            theme="material"
                            onValueChange={ value => this.getTimeID(value) }
                            options = { this.props.dataTimePeriods.map(
                                element => ({ label: element.yearStart.toString() + " - " + element.yearEnd.toString(), value: element.id })
                            )}>
                </SimpleSelect>
                </div>
            </div>
        )

    }
}

export default Scenarios;