import React, { Component } from 'react';
import Indicator from './Indicators';
import Scenario from './Scenarios';
import Graphs from './Graphs';
import 'bootstrap/dist/css/bootstrap.min.css';

class Menu extends Component {

    constructor(props) {
	super(props);
	
	this.state = {
	    urls: [
	    ]
	}
	this.openPrint = this.openPrint.bind(this);
	
    }
    openPrint() {
	
	window.open('print', 'popUpWindow', 'height=300,width=300');
    }

    render() {
        return (
	    <div className="App">
		
		<div className="App-header">
		    <h1 className="App-title">Forest Service</h1>
		</div>
		
		<div className="App-content">
		    
		    <div className="pad"><hr />
			<Scenario />
		    </div>
		    <div className="main">
			<button className="btn btn-default btn-block"
				onClick={ this.openPrint }>Paina</button>
		    </div>
		    <div className="pad"><hr />
			<Indicator />
		    </div>
		</div>
	    </div>
	);
    }
}

export default Menu;
