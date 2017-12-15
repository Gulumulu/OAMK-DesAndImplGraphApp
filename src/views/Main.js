import React, { Component } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Link } from 'react-router-dom';
import Indicator from '../components/Indicators';
import Scenario from '../components/Scenarios';
import DataView from '../components/DataView';
import LangSwitcher from '../components/LangSwitcher';
import forestData from '../data/ForestData';
import LocalizedStrings from 'react-localization';
import ReactTooltip from 'react-tooltip'

import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Main extends Component {
	constructor(props) {
		super(props)

		this.state = {
			lang: reactLocalStorage.get('lang', 'fi'),
			data: [],
			dataRegions: [],
			dataScenarioCollection: [],
			dataScenarios: [],
			dataTimePeriods: [],
			dataIndicatorCategories: [],
			dataIndicators: [],
			dataValues: [],
			dataIDs: [{
				scenarios: "",
				time: "",
				indicators: "",
				boolT: false,
				boolS: false,
				boolI: false
			}],
			finalData: [],
			regID: "",
		}

		this.getRegionData = this.getRegionData.bind(this);
		this.getScenarioCollectionData = this.getScenarioCollectionData.bind(this);
		this.getScenarioData = this.getScenarioData.bind(this);
		this.displayGraphs = this.displayGraphs.bind(this);
		this.toggleLanguage = this.toggleLanguage.bind(this);
		this.scenariosSelected = this.scenariosSelected.bind(this);
		this.indicatorsSelected = this.indicatorsSelected.bind(this);
		this.timePeriodsSelected = this.timePeriodsSelected.bind(this);

		this.state.dataIDs.indicators = [];
		this.state.dataIDs.scenarios = [];
	}

	toggleLanguage() {
		if (this.state.lang === 'fi') {
			this.setState({ lang: 'en' })
			reactLocalStorage.set('lang', 'en');
		} else if (this.state.lang === 'en') {
			this.setState({ lang: 'fi' })
			reactLocalStorage.set('lang', 'fi');
		} else {
			this.setState({ lang: 'fi' })
			reactLocalStorage.set('lang', 'fi');
		}
		forestData.getRegionLevels().then(result => {
			this.setState({ data: result });
		});
		window.location.reload(false);
	}

	// fetch the upper level data == REGIONS
	getRegionData(regionLevelData) {
		if (regionLevelData === undefined) {
			return;
		}
		else {
			forestData.getRegions(regionLevelData.value).then(result => {
				this.setState({ dataRegions: result });
			});
		}
	}

	// fetch the middle level data == SCENARIO COLLECTIONS
	getScenarioCollectionData(regionData) {
		if (regionData === undefined) {
			return;
		}
		else {
			for (var i = 0, iLen = this.state.dataRegions.length; i < iLen; i++) {
				if (this.state.dataRegions[i].id === regionData.value) {
					this.setState({ regID: regionData.value });
					this.setState({ dataScenarioCollection: this.state.dataRegions[i].scenarioCollections });
				};
			}
		}
	}

	// fetch the lower level data == SCENARIOS, TIME PERIODS, INDICATOR CATEGORIES, INDICATORS, VALUES
	getScenarioData(sceCol) {
		var tmpArr = [];
		if (sceCol === undefined || this.state.regID === undefined) {
			return;
		}
		else {
			forestData.getScenarios(sceCol.value, this.state.regID).then(result => {
				for (var i = 0, iLen = result.length; i < iLen; i++) {
					for (var j = 0, jLen = result[i].indicatorCategories.length; j < jLen; j++) {
						tmpArr.push(result[i].indicatorCategories[j].indicators);
					}
					this.setState({
						dataScenarios: result[i].scenarios,
						dataTimePeriods: result[i].timePeriods,
						dataIndicatorCategories: result[i].indicatorCategories,
						dataIndicators: tmpArr,
						dataValues: result[i].values
					});
					tmpArr = [];
				};
			})
		}
	}

	scenariosSelected(scenarios) {
		for (var i = 0, iLen = scenarios.length; i < iLen; i++) {
			this.state.dataIDs.scenarios.push(scenarios[i].value);
        }
		this.state.dataIDs.boolS = true;

    	for (var i = 0, iLen = this.state.dataIndicators.length; i < iLen; i++) {
            if (this.state.dataIndicatorCategories[i].isMandatory === 1) {
                var def = [{
                    label: "",
                    value: ""
                }];
                def[0].label = this.state.dataIndicators[i][0].name;
                def[0].value = this.state.dataIndicators[i][0].id;
                this.indicatorsSelected(def);
            }
        }
		def = [];
		
		this.displayGraphs();
	}

	timePeriodsSelected(time) {
		this.state.dataIDs.time = time.value;
		this.state.dataIDs.boolT = true;

		this.displayGraphs();
	}

	indicatorsSelected(indicators) {
		for (var i = 0, iLen = indicators.length; i < iLen; i++) {
            this.state.dataIDs.indicators.push(indicators[i].value);
        }
		this.state.dataIDs.boolI = true;

		this.displayGraphs();
	}

	// filter values based on selected indicators, scenarios and time period
	displayGraphs() {
		var filter = {scenarioId: this.state.dataIDs.scenarios, indicatorId: this.state.dataIDs.indicators, timePeriodId: this.state.dataIDs.time};
		var filteredData = [];
		
		if (this.state.dataIDs.boolI === true && this.state.dataIDs.boolS === true && this.state.dataIDs.boolT === true) {
			filteredData = (this.state.dataValues.filter(item => {
				if (item.timePeriodId !== filter.timePeriodId) { 
					return false;
				}
				if (!filter.scenarioId.includes(item.scenarioId)) {
					return false
				}
				if (!filter.indicatorId.includes(item.indicatorId)) {
					return false
				}
				return true;
			}));
			this.setState({ finalData : filteredData });
		}
	}

	// fetch region levels when the site is loaded
	componentDidMount() {
		forestData.getRegionLevels().then(result => {
			this.setState({ data: result });
		});
	}

	render() {

		let strings = new LocalizedStrings({
			fi: {
				app_title: "Metsämittari",
				lang_switch: "Vaihda kieltä",
				feedback: "Palaute"
			},
			en: {
				app_title: "Forest Scenario Indicator",
				lang_switch: "Change language",
				feedback: "Feedback"
			}
		});

		strings.setLanguage(reactLocalStorage.get('lang', 'fi'));


		return (
			<div className="App">
				<div className="Lang-switcher">
					<a data-tip={strings.lang_switch}><LangSwitcher toggleLanguage={this.toggleLanguage} lang={this.state.lang} /></a>
					<ReactTooltip place="top" type="dark" effect="float" />
				</div>
				<div className="App-header"><h1 className="App-title">{strings.app_title}</h1>
				</div>
				<div className="App-content">
					<div className="pad"><Scenario data={ this.state.data }
					dataRegions={ this.state.dataRegions }
					dataScenarioCollection={ this.state.dataScenarioCollection }
					dataScenarios={ this.state.dataScenarios }
					dataTimePeriods={ this.state.dataTimePeriods }
					dataIDs={ this.state.dataIDs }
					getRegionData={ this.getRegionData }
					getScenarioCollectionData={ this.getScenarioCollectionData }
					getScenarioData={ this.getScenarioData }
					scenariosSelected={ this.scenariosSelected }
					timePeriodsSelected={ this.timePeriodsSelected }
					displayGraphs={ this.displayGraphs }/></div>
					<div className="main-scrollable">
						<div className="main"><DataView finalData={ this.state.finalData }
						dataScenarios={ this.state.dataScenarios }
						dataTimePeriods={ this.state.dataTimePeriods }
						dataIndicators={ this.state.dataIndicators }
						dataIDs={ this.state.dataIDs }/></div>
					</div>
					<div className="pad"><Indicator dataIndicatorCategories={ this.state.dataIndicatorCategories }
					dataIndicators={ this.state.dataIndicators }
					dataIDs={ this.state.dataIDs }
					indicatorsSelected={ this.indicatorsSelected }
					displayGraphs={ this.displayGraphs }/></div>
				</div>
				<div className="fdb">
					  <span>{strings.feedback}: <a href="mailto:metsamittari@luke.fi">metsamittari@luke.fi</a></span>
				</div>
			</div>
		);
	}
}

export default Main;
