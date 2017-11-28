import React, { Component } from 'react';
import './Indicators.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Indicators extends Component {

    render () {

        return (
            <div className="row">
                <h2>INDICATORS</h2>
                <div className="col-md-12 head1">Wood production</div>
                <div class="contents"> 
                    <button type="button" class="btn btn-sm">hey</button>
                    <button type="button" class="btn btn-sm">hey</button>
                    <button type="button" class="btn btn-sm">hey</button>
                    <button type="button" class="btn btn-sm">hey</button>
                </div>
                <div className="col-md-12 head">Harvest products</div>
                <div>
                    <button type="button" class="btn btn-sm">hey</button>
                    <button type="button" class="btn btn-sm">hey</button>
                </div>
                <div className="col-md-12 head">Biodiversity</div>
                <div>
                    <button type="button" class="btn btn-sm">hey</button>
                    <button type="button" class="btn btn-sm">hey</button>
                    <button type="button" class="btn btn-sm">hey</button>
                    <button type="button" class="btn btn-sm">hey</button>
                    <button type="button" class="btn btn-sm">hey</button>
                </div>
                <div className="col-md-12 head">Carbon</div>
                <div>
                    <button type="button" class="btn btn-sm">hey</button>
                </div>
                <div className="col-md-12 head">Miscellaneous</div>
                <div>
                    <button type="button" class="btn btn-sm">hey</button>
                </div>
            </div>
        )
    }
}

export default Indicators;