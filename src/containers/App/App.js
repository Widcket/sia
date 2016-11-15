import {Col, Grid, Row} from 'antd';
import React, {Component, PropTypes} from 'react';
import {isLoaded as isInfoLoaded, load as loadInfo} from 'redux/modules/info';

import {Navigation} from '../../components';
import {Steps} from '..';
import {asyncConnect} from 'redux-async-connect';
import {autobind} from 'core-decorators';
import config from '../../config';
import {connect} from 'react-redux';

@asyncConnect([
    {
        promise: ({
            store: {
                dispatch,
                getState
            }
        }) => {
            const promises = [];

            if (!isInfoLoaded(getState())) {
                promises.push(dispatch(loadInfo()));
            }

            return Promise.all(promises);
        }
    }
])

export default class App extends Component {
    static propTypes = {
        children: PropTypes.object.isRequired
    };

    static contextTypes = {
        store: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            last: 3
        };
    }

    @autobind
    setStep(step) {
        this.setState({ step });
    }

    render() {
        const styles = require('./App.scss');

        const colSizeXS = { span: 22, offset: 1 };
        const colSizeSM = { span: 20, offset: 2 };
        const colSizeMD = { span: 18, offset: 3 };
        const colSizeLG = { span: 16, offset: 4 };

        return (
            <Row id="app" type="flex" align="middle">
                <Col xs={colSizeXS} sm={colSizeSM} md={colSizeMD} lg={colSizeLG}>
                    <Steps step={this.state.step}>
                        {this.props.children}
                    </Steps>
                    <Navigation
                      step={this.state.step}
                      updateStep={this.setStep}
                      finished={this.state.step === this.state.last} />
                </Col>
            </Row>
        );
    }
}
