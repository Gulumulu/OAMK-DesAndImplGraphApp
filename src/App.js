import React, { Component } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import './styles/App.css';
import Indicator from './components/Indicators';
import Scenario from './components/Scenarios';
import Graphs from './components/Graphs';
import LangSwitcher from './components/LangSwitcher';
import forestData from './data/ForestData';
import { Switch, Route } from 'react-router-dom';
import Main from './views/Main';
import Feedback from './views/Feedback';
import Layout from './Layout';
import LocalizedStrings from 'react-localization';

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
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
			regID: "",
		}

		this.getRegionData = this.getRegionData.bind(this);
		this.getScenarioCollectionData = this.getScenarioCollectionData.bind(this);
		this.getScenarioData = this.getScenarioData.bind(this);
		this.getIndicators = this.getIndicators.bind(this);
		this.showIndicatorCategories = this.showIndicatorCategories.bind(this);
		this.toggleLanguage = this.toggleLanguage.bind(this);
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
	}

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

	getScenarioData(sceCol) {
		if (sceCol === undefined || this.state.regID === undefined) {
			return;
		}
		else {
			forestData.getScenarios(sceCol.value, this.state.regID).then(result => {
				for (var i = 0, iLen = result.length; i < iLen; i++) {
					this.setState({
						dataScenarios: result[i].scenarios,
						dataTimePeriods: result[i].timePeriods,
						dataIndicatorCategories: result[i].indicatorCategories
					});
					this.getIndicators();
					this.showIndicatorCategories();
				}
			});
		}
	}

	getIndicators() {
		for (var i = 0, iLen = this.state.dataIndicatorCategories.length; i < iLen; i++) {
			for (var j = 0, jLen = this.state.dataIndicatorCategories[i].indicators.length; j < jLen; j++) {
				this.state.dataIndicators.push(this.state.dataIndicatorCategories[i].indicators[j]);
			}
		};
	}

	showIndicatorCategories() {

	}

	componentDidMount() {
		forestData.getRegionLevels().then(result => {
			this.setState({ data: result });
		});
	}

	render() {

		let strings = new LocalizedStrings({
			fi:{
				app_title:"Metsämittari",
				feedback:"Palaute"
			},
			en:{
				app_title:"Forest Indicator Service",
				feedback:"Feedback"
			}
		});
		
		strings.setLanguage(reactLocalStorage.get('lang', 'fi'));

		return (
			<div className="App">
				<div className="App-header"><h1 className="App-title">{strings.app_title}</h1>
					<LangSwitcher toggleLanguage={this.toggleLanguage} lang={this.state.lang} />
				</div>
				<div className="App-content">
					<div className="pad"><Scenario data={this.state.data}
						dataRegions={this.state.dataRegions}
						dataScenarioCollection={this.state.dataScenarioCollection}
						dataScenarios={this.state.dataScenarios}
						dataTimePeriods={this.state.dataTimePeriods}
						getRegionData={this.getRegionData}
						getScenarioCollectionData={this.getScenarioCollectionData}
						getScenarioData={this.getScenarioData} /></div>
					<div className="main-scrollable">
						<div className="main-content"><Graphs /></div>
					</div>
					<div className="pad"><Indicator dataIndicatorCategories={this.state.dataIndicatorCategories}
						dataIndicators={this.state.dataIndicators} /></div>
					<div className="fdb"><span>{strings.feedback}</span></div>
				</div>
			</div>
		);

	}
}

export default App;
