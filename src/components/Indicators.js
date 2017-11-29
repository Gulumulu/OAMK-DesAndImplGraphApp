import React, { Component } from 'react';
import './Indicators.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Indicators extends Component {

    render () {

        return (
            <div className="row">
                <h2 className="i">INDICATORS</h2>
                <div className="col-md-12 head1-i">Wood production</div>
                <div class="contents"> 
                    <button type="button" class="btn btn-sm">hey</button>
                    <button type="button" class="btn btn-sm">hey</button>
                    <button type="button" class="btn btn-sm">hey</button>
                    <button type="button" class="btn btn-sm">hey</button>
                </div>
                <div className="col-md-12 head-i">Harvest products</div>
                <div>
                    <button type="button" class="btn btn-sm">hey</button>
                    <button type="button" class="btn btn-sm">hey</button>
                </div>
                <div className="col-md-12 head-i">Biodiversity</div>
                <div>
                    <button type="button" class="btn btn-sm">hey</button>
                    <button type="button" class="btn btn-sm">hey</button>
                    <button type="button" class="btn btn-sm">hey</button>
                    <button type="button" class="btn btn-sm">hey</button>
                    <button type="button" class="btn btn-sm">hey</button>
                </div>
                <div className="col-md-12 head-i">Carbon</div>
                <div>
                    <button type="button" class="btn btn-sm">hey</button>
                </div>
                <div className="col-md-12 head-i">Miscellaneous</div>
                <div>
                    <button type="button" class="btn btn-sm">hey</button>
                </div>
            </div>
        )
    }
}

export default Indicators;