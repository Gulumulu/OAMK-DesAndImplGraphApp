import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const ReactHighcharts = require('react-highcharts');

class Graphs extends Component {

    render () {

        const singleGraph = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Indicator values based on selected scenarios and time periods'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: this.props.finalData
            }]
        };
        

        return (
            <div className="row">
                <ReactHighcharts config = { singleGraph }></ReactHighcharts>
            </div>
        )
    }
}

export default Graphs;