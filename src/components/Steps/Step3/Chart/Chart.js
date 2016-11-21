import {Col, Row} from 'antd';
import React, {Component, PropTypes} from 'react';

import ReactEcharts from 'echarts-for-react';
import {autobind} from 'core-decorators';

const echarts = require('echarts');

export default class Chart extends Component {
    static propTypes = {
        chartConfig: PropTypes.object.isRequired,
        chartSeries: PropTypes.array.isRequired
    }

    @autobind
    onChartReady(chart) {
        chart.hideLoading();
    }

    @autobind
    getOptions() {
        return {
            ...this.props.chartConfig,
            series: this.props.chartSeries
        };
    }

    render() {
        const style = require('./Chart.scss');
        const sia = require('./themes/sia');

        echarts.registerTheme(sia.name, sia.theme);

        return (
            <div id="chart">
                <ReactEcharts
                  option={this.getOptions()}
                  style={{
                      height: '40vh',
                      width: '100%'
                  }}
                  theme="sia"
                  onChartReady={this.onChartReady} />
            </div>
        );
    }
}
