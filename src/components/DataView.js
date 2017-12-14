import React, { Component } from 'react'
import '../styles/DataView.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'bootstrap/dist/css/bootstrap.min.css';
const ReactHighcharts = require('react-highcharts');

class DataView extends Component {

    constructor(props) {
        super(props)

        this.state = {
              display: [],
              chart: [],
              table: [],
              tbl: false,
              chrt: true
        }

        this.showChart = this.showChart.bind(this);
        this.showTable = this.showTable.bind(this);
    }

    showChart() {
//        this.state.display = [];
//        this.state.display.push(<ReactHighcharts config = {this.state.chart}></ReactHighcharts>);
//       this.setState(this.state.display);
//        this.state.chrt = true;
//        this.state.tbl = false;
//        console.log("chart")
    }

    showTable() {
//        this.state.display = [];
//        this.state.display.push(this.state.table);
//        this.setState(this.state.display);
//        this.state.tbl = true;
//        this.state.chrt = false;
//        console.log("table")
    }

    render () {

//        var chart = [];
//        var table = [];
//        var display = [];
//        var dsp = "";
//        var dsp = document.querySelector('.tbl');

        var categories = [];
        var data = [];
        var values = [];
        var title = "";
        var tableHead = [];
        var tableBody = [];
        var tableData = [];
        var tableDataRow = [];
        var tableDataRowCol = [];

        if (this.props.dataIDs.boolI === true && this.props.dataIDs.boolS === true && this.props.dataIDs.boolT === true) {
            // set the scenarios names as categories
            const uniqueS = [...new Set(this.props.finalData.map(item => item.scenarioId))];

            for (var i = 0, iLen = this.props.dataScenarios.length; i < iLen; i++) {
                for (var j = 0, jLen = uniqueS.length; j < jLen; j++) {
                    if (this.props.dataScenarios[i].id === uniqueS[j]) {
                        categories.push(this.props.dataScenarios[i].description);
                    }
                }
            }
            // get the names of indicators into display data
            const uniqueI = [...new Set(this.props.finalData.map(item => item.indicatorId))];

            for (var i = 0, iLen = this.props.dataIndicators.length; i < iLen; i++) {
                for (var z = 0, zLen = this.props.dataIndicators[i].length; z < zLen; z++) {
                    for (var j = 0, jLen = uniqueI.length; j < jLen; j++) {
                        if (this.props.dataIndicators[i][z].id === uniqueI[j]) {
                            data.push({ name: this.props.dataIndicators[i][z].name, data: [] });
                        }
                    }
                    for (var j = 0, jLen = this.props.finalData.length; j < jLen; j++) {
                        if (this.props.dataIndicators[i][z].id === this.props.finalData[j].indicatorId) {
                            values.push(this.props.finalData[j].value)
                        }
                    }
                }
            }
            // get the values into display data
            for (var i = 0, iLen = data.length; i < iLen; i++) {
                data[i].data = values.slice(0, uniqueS.length);
                for (var j = 0, jLen = uniqueS.length; j < jLen; j++) {
                    values.shift();
                }
            }
            // get the time period into the title
            for (var i = 0, iLen = this.props.dataTimePeriods.length; i < iLen; i++) {
                if (this.props.dataTimePeriods[i].id === this.props.finalData[0].timePeriodId) {
                    title = "Indicator values in scenarios for period: " + this.props.dataTimePeriods[i].yearStart.toString() + " - " + this.props.dataTimePeriods[i].yearEnd.toString();
                }
            }

            // get the scenarios displayed in the table
            for (var i = 0, iLen = categories.length; i < iLen; i++) {
                tableHead.push(
                    <th className="scen">{ categories[i] }</th>
                )
            }
            // get the values displayed in the table
            for (var i = 0, iLen = data.length; i < iLen; i++) {
                for (var j = 0, jLen = data[i].data.length; j < jLen; j++) {
                    tableData.push(data[i].data[j])
                }
            }
            for (var i = 0, iLen = uniqueI.length; i < iLen; i++) {
                for (var j = 0, jLen = uniqueS.length; j < jLen; j++) {
                    tableDataRow.push(
                        <td className="cell" id={j}>{ tableData[j] }</td>
                    )                
                }              
                tableDataRowCol.push(tableDataRow)
                for (var j = 0, jLen = uniqueS.length; j < jLen; j++) {
                    tableData.shift()
                    tableDataRow = []
                }
            }
            // get the indicators displayed in the table with the values assigned to them
            for (var i = 0, iLen = data.length; i < iLen; i++) {
                tableBody.push(
                    <tr id="row">
                        <td id="cellI">{ data[i].name }</td>
                        { tableDataRowCol[i] }
                    </tr>
                );
            }
/*
            if (this.state.chrt === true) {
                this.showChart;
            } else if (this.state.tbl === true) {
                this.showTable;
            }
*/
/*
            if (dsp !== "") {
                dsp.style.display = "none";
                this.setState();
            }
*/
        }

        this.state.chart = {
            chart: {
                type: 'column',
                backgroundColor: null
            },
            title: {
                text: title
            },
            xAxis: {
                categories: categories,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                max: 1,
                labels: {
                    overflow: 'justify'
                },
                title: {
                    text: null
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: data
        };

        this.state.table = (
            <table className="table" id="table">
                <thead id="hd">
                    <tr>
                        <th>INDICATORS</th>
                        { tableHead }
                    </tr>
                </thead>
                <tbody className="ind" id="bd">
                    { tableBody }
                </tbody>
            </table>
        )

        return (
            <div className="chart">
                <div className="btns">
                    <button type="button" className="btn btn-default" aria-label="Left Align" onClick={ this.showChart }>
                        <span class="glyphicon glyphicon-stats" aria-hidden="true"></span>
                    </button>
                    <button type="button" className="btn btn-default" aria-label="Left Align" onClick={ this.showTable }>
                        <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
                    </button>
                </div>
                <div className="tbl">
                    {this.state.table}
                </div>
                <div className="chrt">
                    <ReactHighcharts config = {this.state.chart}></ReactHighcharts>
                </div>
            </div>
        )

    }
}

/*
                <div className="tbl">
                    {table}
                </div>
                <div className="chrt">
                    <ReactHighcharts config = {chart}></ReactHighcharts>
                </div>
OR
                <div className="display">
                    { this.state.display }
                </div>
OR
                <div className="display">
                    { display }
                </div>
*/

export default DataView