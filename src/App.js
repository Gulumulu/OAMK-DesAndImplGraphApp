import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Indicator from './components/Indicators';
import Scenario from './components/Scenarios';
import Graphs from './components/Graphs';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  render() {
    return (
	<div className="App">
	  <div className="App-header"><h1 className="App-title">HELLO</h1></div>
	  <div className="App-content">
	    <div className="pad"><Scenario/></div>
	    <div className="main"><Graphs/></div>
	    <div className="pad"><Indicator/></div>
	  </div>
	</div>
    );
  }
}

export default App;
