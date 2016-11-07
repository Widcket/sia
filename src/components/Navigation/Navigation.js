import {Col, Row} from 'antd';
import React, {Component, PropTypes} from 'react';

export default class Navigation extends Component {
    static propTypes = {

    }

    render() {
        const styles = require('./Navigation.scss');

        const colSizeXS = { span: 24 };
        const colSizeSM = { span: 24 };
        const colSizeMD = { span: 24 };
        const colSizeLG = { span: 24 };

        return (
            <Row
              className="navigation">
                <Col xs={colSizeXS} sm={colSizeSM} md={colSizeMD} lg={colSizeLG} className="col">
                    <a className="previous" href="#">
                        <span>Atrás</span>
                    </a>
                    <a className="next" href="#">
                        <span>Siguiente</span>
                    </a>
                </Col>
            </Row>
        );
    }
}
