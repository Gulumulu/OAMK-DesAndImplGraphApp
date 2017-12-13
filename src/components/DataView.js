import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const ReactHighcharts = require('react-highcharts');

const config = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Browser<br>shares<br>2015',
        align: 'center',
        verticalAlign: 'middle',
        y: 40
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: 0,
            endAngle: 360,
            center: ['50%', '75%']
        }
    },
    series: [{
        type: 'pie',
        name: 'Browser share',
        innerSize: '50%',
        data: [
            ['Firefox',   10.38],
            ['IE',       56.33],
            ['Chrome', 24.03],
            ['Safari',    4.77],
            ['Opera',     0.91],
            {
                name: 'Proprietary or Undetectable',
                y: 0.2,
                dataLabels: {
                    enabled: false
                }
            }
        ]
    }]
  };

class DataView extends Component {
    render () {
        return (
            <div className="chart">
                <ReactHighcharts config = {config}></ReactHighcharts>
            </div>
        )
    }
}

export default DataView