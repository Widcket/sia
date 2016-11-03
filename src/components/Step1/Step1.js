import {Col, Row} from 'antd';
import React, { Component } from 'react';

import ConnectForm from './ConnectForm/ConnectForm';
import Spinner from './Spinner/Spinner';

// import { StepButton } from 'material-ui/Stepper';

class Step1 extends Component {
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
                    <Spinner />
                    <ConnectForm />
                </Col>
            </Row>
        );
    }
}

export default Step1;
