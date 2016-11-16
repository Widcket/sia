import {Col, Row} from 'antd';
import React, {Component, PropTypes} from 'react';

import Chart from './Chart/Chart';
import LeftPane from './LeftPane/LeftPane';

export default class Step3 extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    }

    render() {
        const style = require('./Step3.scss');

        return (
            <div id="step3">
                <Row>
                    <Col span={8}>
                        <LeftPane />
                    </Col>
                    <Col span={16} ref="chartContainer">
                        <Chart />
                    </Col>
                </Row>
            </div>
        );
    }
}
