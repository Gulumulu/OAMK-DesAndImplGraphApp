import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DataView from './components/DataView'
import forestData from './data/ForestData'

class App extends Component {

	constructor(props){
		super(props)

		this.getRegionLevels = this.getRegionLevels.bind(this);
		this.getRegions = this.getRegionLevels.bind(this);
	}

	getRegionLevels(){
		// forestData.getScenarioCollection(6, 24);
		forestData.getRegionLevels();
	}
	
	getRegions(regionLevelId){
		// forestData.getScenarioCollection(6, 24);
		forestData.getRegions();
	}
  render() {
    return (
	<div className="App">
	  <div className="App-header"><h1 className="App-title">HELLO</h1></div>
	  <div className="App-content">
	    <div className="pad">CONTAINER</div>
	    <div className="main">
				<button className="btn btn-default btn-block" onClick={ this.getRegionLevels }>regionLevels</button>
      </div>
	    <div className="pad">ANOTER</div>
	  </div>
	</div>
    );
  }
}

export default App;
