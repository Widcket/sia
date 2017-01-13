import {Col, Row} from 'antd';
import React, {PropTypes, PureComponent} from 'react';

import Chart from './Chart/Chart';
import LeftPane from './LeftPane/LeftPane';

export default class Step3 extends PureComponent {
    static propTypes = {
        files: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    }

    render() {
        const style = require('./Step3.scss');

        return (
            <div id="step3">
                <Row>
                    <Col span={8}>
                        <LeftPane
                          files={this.props.files}
                          store={this.props.store}
                          actions={this.props.actions} />
                    </Col>
                    <Col span={16} ref="chartContainer">
                        <Chart
                          files={this.props.files}
                          instance={this.props.store.echarts}
                          setInstance={this.props.actions.setEchartsInstance}
                          chartConfig={this.props.store.chartConfig}
                          chartSeries={this.props.store.chartSeries}
                          chartType={this.props.store.chartType} />
                    </Col>
                </Row>
            </div>
        );
    }
}
