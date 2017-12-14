import React, { Component } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import '../styles/Indicators.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MultiSelect } from 'react-selectize';
import LocalizedStrings from 'react-localization';

class Indicators extends Component {

    getIndicatorID(value) {
        for (var i = 0, iLen = value.length; i < iLen; i++) {
            this.props.dataIDs.indicators.push(value[i].value);
        }
        this.props.dataIDs.boolI = true;
        this.props.displayGraphs();
    }

    render () {

        let strings = new LocalizedStrings({
			fi:{
                title:"INDIKAATTORIT",
                select_scenarios:"Valitse skenaariot"
			},
			en:{
                title:"INDICATORS",
                select_scenarios:"Select scenarios"
			}
		});
		
        strings.setLanguage(reactLocalStorage.get('lang', 'fi'));

        var showIndicators= [];
        var defVal = [];

        for (var i = 0, iLen = this.props.dataIndicators.length; i < iLen; i++) {
            if (this.props.dataIndicators[i][0].isMandatory === 1) {
                defVal = this.props.dataIndicators[0]
            }
//            console.log(defVal)
            showIndicators.push(
                <div>
                    <p>{ this.props.dataIndicatorCategories[i].name }</p>
                    <MultiSelect placeholder = "Select scenarios"
                                theme="material"
                                className="sel"
/*                                values = { this.defVal.map(
                                    element => ({ label: element.description, value: element.id })
                                )}*/
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
                <h2 className="i">{strings.title}</h2>
                <div className="col-md-12">
                {showIndicators}
                </div>
            </div>
        )
    }
}

export default Indicators;
