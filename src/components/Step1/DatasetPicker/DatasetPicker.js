import {Col, Row} from 'antd';
import React, { Component, PropTypes } from 'react';

export default class DatasetPicker extends Component {
    static propTypes = {

    }

    render() {
        const styles = require('./DatasetPicker.scss');

        const colSizeXS = { span: 24 };
        const colSizeSM = { span: 24 };
        const colSizeMD = { span: 24 };
        const colSizeLG = { span: 24 };

        return (
            <Row className="picker">
                <Col xs={colSizeXS} sm={colSizeSM} md={colSizeMD} lg={colSizeLG} className="col">
                    <p>Stage 3</p>
                </Col>
            </Row>
        );
    }
}