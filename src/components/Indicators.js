import React, { Component } from 'react';
import './Indicators.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MultiSelect } from 'react-selectize';

class Indicators extends Component {

    getIndicatorID(value) {
        this.props.dataIDs.indicators = [];
        for (var i = 0, iLen = value.length; i < iLen; i++) {
            this.props.dataIDs.indicators = (value[i].value);
        }
        this.props.displayGraphs();
    }

    render () {

        var showIndicators= [];
        var def = [];

        for (var i = 0, iLen = this.props.dataIndicators.length; i < iLen; i++) {
/*            if (this.props.dataIndicatorCategories[i].isMandatory === 1) {
                def.label = this.props.dataIndicatorCategories[i].indicators[0].name;
                def.value = this.props.dataIndicatorCategories[i].indicators[0].id;
            }
            else {
                def = "";
            }*/
            showIndicators.push(
                <div>
                    <p>{ this.props.dataIndicatorCategories[i].name }</p>
                    <MultiSelect placeholder = "Select scenarios"
                                theme="material"
                                className="sel"
                                onValuesChange={ value => this.getIndicatorID(value) }
                                options = { this.props.dataIndicators[i].map(
                                    element => ({ label: element.name, value: element.id })
                                )}>
                    </MultiSelect>
                    <p className="sep"/>
                </div>
            );
        }

        return (
            <div className="row">
                <h2 className="i">INDICATORS</h2>
                <div className="col-md-12">
                {showIndicators}
                </div>
            </div>
        )
    }
}

export default Indicators;