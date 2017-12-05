import React, { Component } from 'react';
import './App.css';
import Indicator from './components/Indicators';
import Scenario from './components/Scenarios';
import Graphs from './components/Graphs';
import forestData from './data/ForestData';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

	constructor(props){
		super(props)

		this.state = {
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
	}

	getRegionData(regionLevelData) {
		if (regionLevelData === undefined ) {
			return;
		}
		else {
			forestData.getRegions(regionLevelData.value).then(result => {
				this.setState({ dataRegions: result });
			});
		}
	}

	getScenarioCollectionData(regionData) {
		if (regionData === undefined ) {
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
		var tmpArr= [];
		if (sceCol === undefined || this.state.regID === undefined) {
			return;
		}
		else {
			forestData.getScenarios(sceCol.value, this.state.regID).then(result => {
				for (var i = 0, iLen = result.length; i < iLen; i++) {
					for (var j = 0, jLen = result[i].indicatorCategories.length; j < jLen; j++) {
						tmpArr.push(result[i].indicatorCategories[j].indicators);
					}
					this.setState({ dataScenarios: result[i].scenarios,
									dataTimePeriods: result[i].timePeriods,
									dataIndicatorCategories: result[i].indicatorCategories,
									dataIndicators: tmpArr,
									dataValues: result[i].values });
					tmpArr = [];
				};
			})
		}
	}

	displayGraphs() {
		var filter = {scenarioId: this.state.dataIDs.scenarios, indicatorId: this.state.dataIDs.indicators, timePeriodId: this.state.dataIDs.time};
		this.state.finalData.push(this.state.dataValues.filter(function(item) {
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
				this.state.finalData.splice(0,1);
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

    return (
		<div className="App">
			<div className="App-header"><h1 className="App-title">Forest Scenario Indicator</h1></div>
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
												displayGraphs={ this.displayGraphs }/></div>
				<div className="main"><Graphs finalData={ this.state.finalData }/></div>
				<div className="pad"><Indicator dataIndicatorCategories={ this.state.dataIndicatorCategories }
												dataIndicators={ this.state.dataIndicators }
												dataIDs={ this.state.dataIDs }
												displayGraphs={ this.displayGraphs }/></div>
				<div className="fdb"><span>Feedback</span></div>
			</div>
		</div>
		);
		
  }
}

export default App;
