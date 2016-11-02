import injectTapEventPlugin from 'react-tap-event-plugin';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component, PropTypes } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import {isLoaded as isInfoLoaded, load as loadInfo} from 'redux/modules/info';

import config from '../../config';
import { NavigationTop, NavigationBottom } from '../../components';

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
            <MuiThemeProvider>
                <Grid>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <div className={styles.app}>
                                <Helmet {...config.app.head} />

                                <NavigationTop />
                                <div className={styles.appContent}>
                                    {this.props.children}
                                </div>
                                <NavigationBottom />
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </MuiThemeProvider>
        );
    }
}
