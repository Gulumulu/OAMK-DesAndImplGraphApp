import React, { Component } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import '../styles/Scenarios.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SimpleSelect, MultiSelect } from 'react-selectize';
import LocalizedStrings from 'react-localization';
import { Tooltip } from 'react-lightweight-tooltip';

class Scenarios extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selected_regional_level: -1,
            selected_region: -1,
            selected_scenario_collection: -1
        }
    }

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

    getDescription() {
        if (this.props.data[this.state.selected_regional_level] === undefined) {
            return;
        } else {
            return this.props.data[this.state.selected_regional_level].description;
        }

    }

    render() {

        let strings = new LocalizedStrings({
            fi: {
                title: "SKENAARIOT",
                regional_level: "Aluetaso",
                select_regional_level: "Valitse aluetaso",
                region: "Alue",
                select_region: "Valitse alue",
                scenario_collection: "Skenaariokokoelma",
                select_scenario_collection: "Valitse skenaariokokoelma",
                scenarios: "Skenaariot",
                select_scenarios: "Valitse skenaariot",
                time_period: "Ajankohta",
                select_time_period: "Valitse ajankohta"
            },
            en: {
                title: "SCENARIOS",
                regional_level: "Regional level",
                select_regional_level: "Select regional level",
                region: "Region",
                select_region: "Select region",
                scenario_collection: "Scenario collection",
                select_scenario_collection: "Select scenario collection",
                scenarios: "Scenarios",
                select_scenarios: "Select scenarios",
                time_period: "Time period",
                select_time_period: "Select time period"
            }
        });

        strings.setLanguage(reactLocalStorage.get('lang', 'fi'));

        return (
            <div className="row">

                <h2 className="s">{strings.title}</h2>
                <div className="col-md-12 head1-s">{strings.regional_level}</div>
                <div className="col-md-12">
                    <Tooltip content={this.getDescription()} ><SimpleSelect placeholder={strings.select_regional_level}
                        theme="material"
                        onValueChange={value => {this.props.getRegionData(value),
                            ((value !== undefined) ? this.setState({selected_regional_level: value.value-1}): this.setState({selected_regional_level: -1})),
                            console.log(this.state.selected_regional_level)}}
                        options={this.props.data.map(
                            element => ({ label: element.name, value: element.id })
                        )}>
                    </SimpleSelect></Tooltip>
                </div>
                <div className="col-md-12 head-s">{strings.region}</div>
                <div className="col-md-12">
                    <SimpleSelect placeholder={strings.select_region}
                        theme="material"
                        onValueChange={value => this.props.getScenarioCollectionData(value)}
                        options={this.props.dataRegions.map(
                            element => ({ label: element.name, value: element.id })
                        )}>
                    </SimpleSelect>
                </div>
                <div className="col-md-12 head-s">{strings.scenario_collection}</div>
                <div className="col-md-12">
                    <SimpleSelect placeholder={strings.select_scenario_collection}
                        theme="material"
                        onValueChange={value => this.props.getScenarioData(value)}
                        options={this.props.dataScenarioCollection.map(
                            element => ({ label: element.name, value: element.id })
                        )}>
                    </SimpleSelect>
                </div>
                <div className="col-md-12 head-s">{strings.scenarios}</div>
                <div className="col-md-12">
                    <MultiSelect placeholder={strings.select_scenarios}
                        theme="material"
                        onValuesChange={value => this.getScenarioID(value)}
                        options={this.props.dataScenarios.map(
                            element => ({ label: element.description, value: element.id })
                        )}>
                    </MultiSelect>
                </div>
                <div className="col-md-12 head-s">{strings.time_period}</div>
                <div className="col-sm-12">
                    <SimpleSelect placeholder={strings.select_time_period}
                        className="sel"
                        theme="material"
                        onValueChange={value => this.getTimeID(value)}
                        options={this.props.dataTimePeriods.map(
                            element => ({ label: element.yearStart.toString() + " - " + element.yearEnd.toString(), value: element.id })
                        )}>
                    </SimpleSelect>
                </div>
            </div>
        )

    }
}

export default Scenarios;
