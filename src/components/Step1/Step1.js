import {Col, Row} from 'react-flexbox-grid';
import React, { Component } from 'react';

import ConnectForm from './ConnectForm/ConnectForm';

// import { StepButton } from 'material-ui/Stepper';

class Step1 extends Component {
    render() {
        const styles = require('./Step1.scss');

        return (
            <Row
              className={styles.step}>
                <Col xs={3} sm={3} md={3} lg={3} />
                <Col xs={6} sm={6} md={6} lg={6}>
                    <h1>Conecta a una instancia de ODIN</h1>
                    <ConnectForm />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3} />
            </Row>
        );
    }
}

export default Step1;
