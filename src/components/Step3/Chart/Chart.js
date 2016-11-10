import {Col, Row} from 'antd';
import React, { Component } from 'react';

import ReactEcharts from 'echarts-for-react';
import { autobind } from 'core-decorators';

const echarts = require('echarts');

export default class Chart extends Component {
    @autobind
    onChartReady(chart) {
        chart.hideLoading();
    }

    @autobind
    getOption() {
        const option = {
            title: {
                text: 'Gráfico 1'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Serie 1', 'Serie 2', 'Serie 3']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['abc', 'def', 'ghi', 'jk', 'lm', 'no', 'pq']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Serie 1',
                    type: 'line',
                    stack: '123',
                    areaStyle: {normal: {}},
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Serie 2',
                    type: 'line',
                    stack: '456',
                    areaStyle: {normal: {}},
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: 'Serie 3',
                    type: 'line',
                    stack: '789',
                    areaStyle: {normal: {}},
                    data: [150, 232, 201, 154, 190, 330, 410]
                }
            ]
        };

        return option;
    }

    render() {
        const styles = require('./Chart.scss');
        const sia = require('./themes/sia');

        echarts.registerTheme(sia.name, sia.theme);

        return (
            <div id="chart">
                <ReactEcharts
                  option={this.getOption()}
                  style={{height: '350px', width: '100%'}}
                  className="react_for_echarts"
                  theme="sia"
                  onChartReady={this.onChartReady} />
            </div>
        );
    }
}
