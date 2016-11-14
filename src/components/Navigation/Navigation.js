import {Col, Row} from 'antd';
import React, {Component, PropTypes} from 'react';

import {autobind} from 'core-decorators';

export default class Navigation extends Component {
    static propTypes = {
        step: PropTypes.number.isRequired,
        updateStep: PropTypes.func.isRequired,
        finished: PropTypes.bool
    }

    @autobind
    handlePrev() {
        this.props.updateStep(this.props.step - 1);
    }

    @autobind
    handleNext() {
        this.props.updateStep(this.props.step + 1);
    }

    render() {
        const styles = require('./Navigation.scss');

        const colSizeXS = { span: 24 };
        const colSizeSM = { span: 24 };
        const colSizeMD = { span: 24 };
        const colSizeLG = { span: 24 };

        return (
            <Row className="navigation">
                <Col xs={colSizeXS} sm={colSizeSM} md={colSizeMD} lg={colSizeLG} className="col">
                    {
                        this.props.step === 0 ? '' :
                            <div className="previous">
                                <span onClick={this.handlePrev}>Atrás</span>
                            </div>
                    }

                    {
                        this.props.finished ? '' :
                            <div className="next">
                                <span onClick={this.handleNext}>Siguiente</span>
                            </div>
                    }
                </Col>
            </Row>
        );
    }
}
