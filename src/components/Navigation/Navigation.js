import {Col, Row} from 'antd';
import React, {PropTypes, PureComponent} from 'react';

import {autobind} from 'core-decorators';

export default class Navigation extends PureComponent {
    static propTypes = {
        store: PropTypes.object.isRequired,
        getPrevious: PropTypes.func.isRequired,
        getNext: PropTypes.func.isRequired,
        finished: PropTypes.bool
    };

    static defaultProps = {
        finished: false
    };

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
                        this.props.store.current === 0 ? '' :
                            <div className="previous">
                                <span onClick={this.props.getPrevious}>Atrás</span>
                            </div>
                    }

                    {
                        this.props.finished ? '' :
                            <div className="next">
                                <span onClick={this.props.getNext}>Siguiente</span>
                            </div>
                    }
                </Col>
            </Row>
        );
    }
}
