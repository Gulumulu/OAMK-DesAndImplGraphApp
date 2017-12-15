import React, { Component } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Link } from 'react-router-dom';
import Indicator from '../components/Indicators';
import Scenario from '../components/Scenarios';
import Graphs from '../components/Graphs';
import DataView from '../components/DataView';
import LangSwitcher from '../components/LangSwitcher';
import forestData from '../data/ForestData';
import LocalizedStrings from 'react-localization';

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
			}],
			finalData: [],
			regID: "",
		}

		this.getRegionData = this.getRegionData.bind(this);
		this.getScenarioCollectionData = this.getScenarioCollectionData.bind(this);
		this.getScenarioData = this.getScenarioData.bind(this);
		this.displayGraphs = this.displayGraphs.bind(this);
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
		window.location.reload(false);
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

	displayGraphs() {
		var filter = { scenarioId: this.state.dataIDs.scenarios, indicatorId: this.state.dataIDs.indicators, timePeriodId: this.state.dataIDs.time };
		this.state.finalData.push(this.state.dataValues.filter(function (item) {
			for (var key in filter) {
				if (item[key] === undefined || item[key] !== filter[key])
					return false;
			}
			return true;
		}));

		for (var i = 0, iLen = this.state.finalData.length; i < iLen; i++) {
			if (typeof this.state.finalData[i][0] !== 'undefined') {
				this.setState(this.state.finalData[i]);
			}
			else {
				this.state.finalData.splice(0, 1);
			}
		}
		console.log(this.state.finalData);
	}

	componentDidMount() {
		forestData.getRegionLevels().then(result => {
			this.setState({ data: result });
		});
	}

	render() {

		let strings = new LocalizedStrings({
			fi: {
				app_title: "Metsämittari",
				feedback: "Palaute"
			},
			en: {
				app_title: "Forest Scenario Indicator",
				feedback: "Feedback"
			}
		});

		strings.setLanguage(reactLocalStorage.get('lang', 'fi'));


		return (
			<div className="App">
				<div className="Lang-switcher">
					<LangSwitcher toggleLanguage={this.toggleLanguage} lang={this.state.lang} />
				</div>
				<div className="App-header"><h1 className="App-title">{strings.app_title}</h1>
				</div>
				<div className="App-content">
					<div className="pad"><Scenario data={this.state.data}
						dataRegions={this.state.dataRegions}
						dataScenarioCollection={this.state.dataScenarioCollection}
						dataScenarios={this.state.dataScenarios}
						dataTimePeriods={this.state.dataTimePeriods}
						dataIDs={this.state.dataIDs}
						getRegionData={this.getRegionData}
						getScenarioCollectionData={this.getScenarioCollectionData}
						getScenarioData={this.getScenarioData}
						displayGraphs={this.displayGraphs} /></div>
					<div className="main-scrollable">
						<div className="main"><DataView finalData={this.state.finalData} /></div>
					</div>
					<div className="pad"><Indicator dataIndicatorCategories={this.state.dataIndicatorCategories}
						dataIndicators={this.state.dataIndicators}
						dataIDs={this.state.dataIDs}
						displayGraphs={this.displayGraphs} /></div>
				</div>
				<div className="fdb">

					<Link to="/feedback">{strings.feedback}</Link>
				</div>
			</div>
		);
	}
}

export default Main;
