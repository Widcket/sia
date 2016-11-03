import {Col, Grid, Row} from 'react-flexbox-grid';
import React, { Component, PropTypes } from 'react';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';

import Helmet from 'react-helmet';
import { Steps } from '../../containers';
import { asyncConnect } from 'redux-async-connect';
import config from '../../config';
import {connect} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

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

    render() {
        const styles = require('./App.scss');

        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <div className={styles.app}>
                            <Helmet {...config.app.head} />
                            <Steps className={styles.appContent}>
                                {this.props.children}
                            </Steps>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
