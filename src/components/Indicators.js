import React, { Component } from 'react';
import './Indicators.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MultiSelect } from 'react-selectize';

class Indicators extends Component {

    render () {

        var showIndicators= [];

        for (var i = 0, iLen = this.props.dataIndicators.length; i < iLen; i++) {
            showIndicators.push(
                <div>
                    <p>{ this.props.dataIndicatorCategories[i].name }</p>
                    <MultiSelect placeholder = "Select scenarios"
                                theme="material"
                                className="sel"
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