import * as NavigationActions from '../../redux/actions/navigation/creators';

import {Col, Grid, Row} from 'antd';
import {Navigation, Steps} from '../../components';
import React, {Component, PropTypes} from 'react';
import {isLoaded as isInfoLoaded, load as loadInfo} from 'redux/reducers/info';

import {asyncConnect} from 'redux-async-connect';
import {autobind} from 'core-decorators';
import {bindActionCreators} from 'redux';
import config from '../../config';
import {connect} from 'react-redux';

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            navigation: bindActionCreators(NavigationActions, dispatch)
        }
    };
}

function mapStateToProps(state) {
    return {
        stores: {
            app: state.app,
            step1: state.step1,
            step2: state.step2,
            step3: state.step3,
            step4: state.step4,
            navigation: state.navigation
        }
    };
}

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

@connect(mapStateToProps, mapDispatchToProps)

export default class App extends Component {
    static propTypes = {
        stores: PropTypes.shape({
            app: PropTypes.object.isRequired,
            step1: PropTypes.object.isRequired,
            step2: PropTypes.object.isRequired,
            step3: PropTypes.object,
            step4: PropTypes.object,
            navigation: PropTypes.object.isRequired
        }).isRequired,
        actions: PropTypes.shape({
            navigation: PropTypes.shape({
                previous: PropTypes.func.isRequired,
                next: PropTypes.func.isRequired
            }).isRequired
        }).isRequired,
    };

    render() {
        const styles = require('./App.scss');

        const colSizeXS = { span: 22, offset: 1 };
        const colSizeSM = { span: 20, offset: 2 };
        const colSizeMD = { span: 18, offset: 3 };
        const colSizeLG = { span: 16, offset: 4 };

        return (
            <Row id="app" type="flex" align="middle">
                <Col xs={colSizeXS} sm={colSizeSM} md={colSizeMD} lg={colSizeLG}>
                    <Steps stores={[
                        this.props.stores.step1,
                        this.props.stores.step2,
                        this.props.stores.step3,
                        this.props.stores.step4
                    ]}
                      step={this.props.stores.navigation.current} />
                    <Navigation
                      store={this.props.stores.navigation}
                      getPrevious={this.props.actions.navigation.previous}
                      getNext={this.props.actions.navigation.next}
                      finished={this.props.stores.navigation.current === this.props.stores.app.lastStep} />
                </Col>
            </Row>
        );
    }
}
