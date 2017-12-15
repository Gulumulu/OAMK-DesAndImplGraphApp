import React, { Component } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import '../styles/Indicators.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MultiSelect } from 'react-selectize';
import LocalizedStrings from 'react-localization';

class Indicators extends Component {

    getIndicatorID(value) {
        this.props.indicatorsSelected(value);
    }

    render () {

        let strings = new LocalizedStrings({
			fi:{
                title:"INDIKAATTORIT",
                select_indicators:"Valitse indikaattorit"
			},
			en:{
                title:"INDICATORS",
                select_indicators:"Select indocators"
			}
		});
		
        strings.setLanguage(reactLocalStorage.get('lang', 'fi'));

        var showIndicators= [];
        var defVal = [];

        for (var i = 0, iLen = this.props.dataIndicators.length; i < iLen; i++) {
            if (this.props.dataIndicatorCategories[i].isMandatory === 1) {
                defVal.push(this.props.dataIndicators[i][0]);
            }
            showIndicators.push(
                <div key={i}>
                    <p key={i+100}>{ this.props.dataIndicatorCategories[i].name }</p>
                    <MultiSelect placeholder={strings.select_indicators}
                                theme="material"
                                className="sel"
                                key={i+1000}
                                onValuesChange={ value => this.getIndicatorID(value) }
                                defaultValues = { defVal.map(
                                    element => ({ label: element.name, value: element.id })
                                )}
                                options = { this.props.dataIndicators[i].map(
                                    element => ({ label: element.name, value: element.id })
                                )}>
                    </MultiSelect>
                    <p className="sep"/>
                </div>
            );
            defVal = [];
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
