import {Col, Row} from 'antd';
import React, { Component } from 'react';

import Chart from './Chart/Chart';
import LeftPane from './LeftPane/LeftPane';
import ReactDOM from 'react-dom';
import {autobind} from 'core-decorators';

export default class Step3 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initialWidth: true
        };
    }

    componentDidMount() {
        this.updateChartWidth();
    }

    @autobind
    updateChartWidth() {
        this.setState({ initialWidth: false });
    }

    render() {
        const styles = require('./Step3.scss');

        return (
            <div id="step3">
                <Row>
                    <Col span={8}>
                        <LeftPane />
                    </Col>
                    <Col span={16} ref="chartContainer">
                        <Chart initialWidth={this.state.initialWidth} />
                    </Col>
                </Row>
            </div>
        );
    }
}
