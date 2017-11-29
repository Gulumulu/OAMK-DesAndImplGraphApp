import React, { Component } from 'react';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Menu extends Component {
    constructor(props) {
	       super(props);
	       }

    render() {
        return (
	           <div className="App">
		              
		              <div className="App-header">
		                  <h1 className="App-title">Forest Service</h1>
		              </div>
		              
		              <div className="App-content">
		                  
		                  <div className="pad"><hr />
		                  </div>
		                  <div className="main">
		                      <button className="btn btn-default btn-block">Pain</button>
		                  </div>
		                  <div className="pad"><hr />
		                  </div>
		              </div>
	           </div>
	       );
    }
}

export default Menu;
