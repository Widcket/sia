import {createStore as _createStore, applyMiddleware, compose} from 'redux';

import createMiddleware from './middleware/clientMiddleware';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';

export default function createStore(history, client, data) {
    // Sync dispatched route actions to the history
    const reduxRouterMiddleware = routerMiddleware(history);

    const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk];

    let finalCreateStore;

    if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
        const {persistState} = require('redux-devtools');
        const DevTools = require('../containers/DevTools/DevTools');
        const match = window.location.href.match(/[?&]debug_session=([^&]+)\b/);

        finalCreateStore = compose(applyMiddleware(...middleware), window.devToolsExtension
            ? window.devToolsExtension()
            : DevTools.instrument(), persistState(match))(_createStore);
    } else {
        finalCreateStore = applyMiddleware(...middleware)(_createStore);
    }

    const reducer = require('./reducer');
    const store = finalCreateStore(reducer, data);

    if (__DEVELOPMENT__ && module.hot) {
        module.hot.accept('./reducer', () => {
            store.replaceReducer(require('./reducer'));
        });
    }

    return store;
}