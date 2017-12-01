import React, { Component } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import logo from './logo.svg';
import './App.css';
import DataView from './components/DataView'
import LangSwitcher from './components/LangSwitcher'
import forestData from './data/ForestData'

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			lang: reactLocalStorage.get('lang', 'fi'),
			data:[]
		};


		this.getRegionLevels = this.getRegionLevels.bind(this);
		this.getRegions = this.getRegionLevels.bind(this);
		this.toggleLanguage = this.toggleLanguage.bind(this);
	}

	toggleLanguage() {
		if (this.state.lang === 'fi') {
			this.setState({ lang: 'en' })
			reactLocalStorage.set('lang', 'en');
			this.getRegionLevels();
		} else if (this.state.lang === 'en') {
			this.setState({ lang: 'fi' })
			reactLocalStorage.set('lang', 'fi');
			this.getRegionLevels();
		} else {
			this.setState({ lang: 'fi' })
			reactLocalStorage.set('lang', 'fi');
			this.getRegionLevels();
		}
	}



	getRegionLevels() {
		var a = forestData.getRegionLevels();
		this.setState({ data: a.map(element => {return element.name})}) 
	}

	getRegions(regionLevelId) {
		// forestData.getScenarioCollection(6, 24);
		forestData.getRegions();
	}
	render() {

		return (
			<div className="App">
				<div className="App-header"><h1 className="App-title">HELLO</h1><LangSwitcher toggleLanguage={this.toggleLanguage} lang={this.state.lang}/></div>
				<div className="App-content">
					<div className="pad">CONTAINER</div>
					<div className="main">
					{this.state.data}
					</div>
					<div className="pad">ANOTER</div>
				</div>
			</div>
		);
	}
}

export default App;
