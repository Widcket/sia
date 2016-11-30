import {Col, Row} from 'antd';
import React, {Component, PropTypes} from 'react';

import ReactEcharts from 'echarts-for-react';
import {autobind} from 'core-decorators';

const echarts = require('echarts');

export default class Chart extends Component {
    static propTypes = {
        setInstance: PropTypes.func.isRequired,
        chartConfig: PropTypes.object.isRequired,
        chartSeries: PropTypes.object.isRequired,
        chartType: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.setInstance(this.refs.echarts.getEchartsInstance());
    }

    @autobind
    onChartReady(chart) {
        chart.hideLoading();
    }

    render() {
        const style = require('./Chart.scss');
        const sia = require('./themes/sia');

        echarts.registerTheme(sia.name, sia.theme);

        return (
            <div id="chart">
                <ReactEcharts
                  ref="echarts"
                  option={{...this.props.chartConfig, series: this.props.chartSeries[this.props.chartType.value]}}
                  style={{
                      height: '40vh',
                      minHeight: '400px',
                      maxHeight: '600px',
                      width: '100%'
                  }}
                  theme="sia"
                  onChartReady={this.onChartReady} />
            </div>
        );
    }
}
