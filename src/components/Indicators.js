import React, { Component } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import '../styles/Indicators.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MultiSelect } from 'react-selectize';
import LocalizedStrings from 'react-localization';

class Indicators extends Component {

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

        console.log(this.props.dataIndicators);

        var showIndicators= [];
        for (var i = 0, iLen = this.props.dataIndicatorCategories.length; i < iLen; i++) {
            showIndicators.push(
                <div>
                    <p>{ this.props.dataIndicatorCategories[i].name }</p>
                    <MultiSelect placeholder = {strings.select_scenarios}
                                theme="material"
                                className="sel"
                                options = { this.props.dataIndicators.map(
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
