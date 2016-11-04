import {Col, Row} from 'antd';
import React, { Component } from 'react';

import ConnectForm from './ConnectForm/ConnectForm';
import DatasetPicker from './DatasetPicker/DatasetPicker';
import Spinner from './Spinner/Spinner';
import {autobind} from 'core-decorators';

// import { StepButton } from 'material-ui/Stepper';

class Step1 extends Component {
    constructor() {
        super();

        this.state = {
            stage: 2
        };
    }

    @autobind
    getStage(stage) {
        switch (stage) {
            case 0:
                return <ConnectForm />;
            case 1:
                return <Spinner active />;
            case 2:
                return <DatasetPicker />;
            default:
                return;
        }
    }

    render() {
        const styles = require('./Step1.scss');

        const colSizeXS = { span: 16, offset: 4 };
        const colSizeSM = { span: 12, offset: 6 };
        const colSizeMD = { span: 12, offset: 6 };
        const colSizeLG = { span: 12, offset: 6 };

        return (
            <Row
              className="step">
                <Col xs={colSizeXS} sm={colSizeSM} md={colSizeMD} lg={colSizeLG} className="col">
                    {this.getStage(this.state.stage)}
                </Col>
            </Row>
        );
    }
}

export default Step1;
