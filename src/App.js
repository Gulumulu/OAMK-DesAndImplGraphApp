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
			regID: "",
		}

		this.getRegionData = this.getRegionData.bind(this);
		this.getScenarioCollectionData = this.getScenarioCollectionData.bind(this);
		this.getScenarioData = this.getScenarioData.bind(this);
		this.getIndicators = this.getIndicators.bind(this);
		this.showIndicatorCategories = this.showIndicatorCategories.bind(this);
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
		if (sceCol === undefined || this.state.regID === undefined) {
			return;
		}
		else {
			forestData.getScenarios(sceCol.value, this.state.regID).then(result => {
				for (var i = 0, iLen = result.length; i < iLen; i++) {
					this.setState({ dataScenarios: result[i].scenarios,
									dataTimePeriods: result[i].timePeriods,
									dataIndicatorCategories: result[i].indicatorCategories });
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

    return (
		<div className="App">
			<div className="App-header"><h1 className="App-title">Forest Scenario Indicator</h1></div>
			<div className="App-content">
				<div className="pad"><Scenario data={ this.state.data }
												dataRegions={ this.state.dataRegions }
												dataScenarioCollection={ this.state.dataScenarioCollection }
												dataScenarios={ this.state.dataScenarios }
												dataTimePeriods={ this.state.dataTimePeriods }
												getRegionData={ this.getRegionData }
												getScenarioCollectionData={ this.getScenarioCollectionData }
												getScenarioData={ this.getScenarioData }/></div>
				<div className="main"><Graphs/></div>
				<div className="pad"><Indicator dataIndicatorCategories={ this.state.dataIndicatorCategories }
												dataIndicators={ this.state.dataIndicators }/></div>
				<div className="fdb"><span>Feedback</span></div>
			</div>
		</div>
		);
		
  }
}

export default App;
