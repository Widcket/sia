import {Col, Row} from 'antd';
import React, {PropTypes, PureComponent} from 'react';

import Chart from './Chart/Chart';
import LeftPane from './LeftPane/LeftPane';

export default class Step3 extends PureComponent {
    static propTypes = {
        store: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        data: PropTypes.array.isRequired
    }

    render() {
        const style = require('./Step3.scss');

        return (
            <div id="step3">
                <Row>
                    <Col span={8}>
                        <LeftPane
                          data={this.props.data}
                          store={this.props.store}
                          actions={this.props.actions} />
                    </Col>
                    <Col span={16} ref="chartContainer">
                        <Chart
                          chartConfig={this.props.store.chartConfig}
                          chartSeries={this.props.store.chartSeries}
                          data={this.props.data} />
                    </Col>
                </Row>
            </div>
        );
    }
}
