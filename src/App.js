import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DataView from './components/DataView'
import forestData from './data/ForestData'

class App extends Component {

	constructor(props){
		super(props)

		this.state = {
			urls: [
				"http://melatupa.azurewebsites.net/regionLevels",
				"http://melatupa.azurewebsites.net/regionLevels/1/regions",
				"http://melatupa.azurewebsites.net/scenarioCollection/6/region/24"

			],
			inputValue: ""
		}

		this.getData = this.getData.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	getData(index){
		// forestData.getScenarioCollection(6, 24);
		forestData.getRegionLevels();
	}

	inputChange(event){
		console.log(event.target.value);
		this.setState({ [event.target.name]: event.target.value });
	}

	handleClick(){
		forestData.getRegions(this.state.inputValue);

	}

  render() {
    return (
	<div className="App">
	  <div className="App-header"><h1 className="App-title">HELLO</h1></div>
	  <div className="App-content">
	    <div className="pad">CONTAINER</div>
	    <div className="main">
        <DataView/>
				<input type="text" name="inputValue" value={this.inputValue} onChange={this.inputChange}></input>
				<button className="btn btn-default btn-block" onClick={ this.getData }>regionLevels</button>
				<button className="btn btn-default btn-block" onClick={ this.handleClick }>regionLevels/1/regions</button>
				{this.getData}
      </div>
	    <div className="pad">ANOTER</div>
	  </div>
	</div>
    );
  }
}

export default App;
