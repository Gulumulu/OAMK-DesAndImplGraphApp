import React, { Component } from 'react';
import logo from './logo.svg';
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
			data: []
		}
	}

	getData() {
		// forestData.getScenarioCollection(6, 24);
		forestData.getRegionLevels();
	}

	componentDidMount() {
		forestData.getRegionLevels().then(result => {
			this.setState({ data: result});
			console.log(this.state.data);
    });
	}

  render() {

    return (
		<div className="App">
			<div className="App-header"><h1 className="App-title">Forest Scenario Indicator</h1></div>
			<div className="App-content">
				<div className="pad"><Scenario data={ this.state.data }/></div>
				<div className="main"><Graphs/></div>
				<div className="pad"><Indicator/></div>
				<div className="fdb"><span>Feedback</span></div>
			</div>
		</div>
		);
		
  }
}

export default App;
