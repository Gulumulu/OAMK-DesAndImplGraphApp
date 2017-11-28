import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DataView from './components/DataView'
import forestData from './data/ForestData'

class App extends Component {

	getData(){
		forestData.getItems();
	}

  render() {
    return (
	<div className="App">
	  <div className="App-header"><h1 className="App-title">HELLO</h1></div>
	  <div className="App-content">
	    <div className="pad">CONTAINER</div>
	    <div className="main">
        <DataView/>
				<button className="btn btn-default btn-block" onClick={ this.getData }>click</button>
      </div>
	    <div className="pad">ANOTER</div>
	  </div>
	</div>
    );
  }
}

export default App;
