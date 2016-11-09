import {Col, Row} from 'antd';
import React, { Component } from 'react';

import Chart from './Chart/Chart';
import LeftPane from './LeftPane/LeftPane';
import {autobind} from 'core-decorators';

export default class Step3 extends Component {
    render() {
        const styles = require('./Step3.scss');

        return (
            <div id="step3">
                <Row>
                    <Col span={8}>
                        <LeftPane />
                    </Col>
                    <Col span={16}>
                        <Chart />
                    </Col>
                </Row>
            </div>
        );
    }
}
