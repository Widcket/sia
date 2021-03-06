/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */

import 'babel-polyfill';

import {Router, browserHistory} from 'react-router';

import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import {ReduxAsyncConnect} from 'redux-async-connect';
import createStore from './redux/create';
import getRoutes from './routes';
import io from 'socket.io-client';
import {syncHistoryWithStore} from 'react-router-redux';

const dest = document.getElementById('content');
const store = createStore(browserHistory, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

const component = (
    <Router render={(props) =>
              <ReduxAsyncConnect {...props} filter={item => !item.deferred} />
    } history={history}>
        {getRoutes(store)}
    </Router>
);

ReactDOM.render(
    <Provider store={store} key="provider">
        {component}
    </Provider>,
    dest
);

if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger

    if (!dest
        || !dest.firstChild
        || !dest.firstChild.attributes
        || !dest.firstChild.attributes['data-react-checksum']) {
        console.error('Server-side React render was discarded. ' +
            'Make sure that your initial render does not contain any client-side code.');
    }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
    const DevTools = require('./containers/DevTools/DevTools');

    ReactDOM.render(
        <Provider store={store} key="provider">
        <div>
            {component}
            <DevTools />
        </div>
        </Provider>,
        dest
    );
}
