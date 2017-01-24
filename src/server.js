import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';

import Express from 'express';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/server';
import compression from 'compression';
import config from './config';
import createHistory from 'react-router/lib/createMemoryHistory';
import createStore from './redux/create';
import favicon from 'serve-favicon';
import getRoutes from './routes';
import http from 'http';
import {match} from 'react-router';
import path from 'path';
import { syncHistoryWithStore } from 'react-router-redux';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

app.use(compression());
app.use(favicon(path.join('static', 'favicon.ico')));
app.use(Express.static(path.join('..', 'static')));

app.use((req, res) => {
    if (__DEVELOPMENT__) {
        // Do not cache webpack stats: the script file would change since hot module
        // replacement is enabled in the development env
        webpackIsomorphicTools.refresh();
    }

    const memoryHistory = createHistory(req.originalUrl);
    const store = createStore(memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);

    function hydrateOnClient() {
        res.send('<!doctype html>\n' + ReactDOM.renderToString(
            <Html assets={webpackIsomorphicTools.assets()} store={store} />
        ));
    }

    if (__DISABLE_SSR__) {
        hydrateOnClient();
        return;
    }

    match({
        history,
        routes: getRoutes(store),
        location: req.originalUrl
    }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            console.error('ROUTER ERROR:', pretty.render(error));

            res.status(500);
            hydrateOnClient();
        } else if (renderProps) {
            loadOnServer({
                ...renderProps,
                store
            }).then(() => {
                const component = (
                    <Provider store={store} key="provider">
                        <ReduxAsyncConnect {...renderProps} />
                    </Provider>
                );

                global.navigator = {
                    userAgent: req.headers['user-agent']
                };

                res.status(200);
                res.send('<!doctype html>\n' + ReactDOM.renderToString(
                    <Html
                      assets={webpackIsomorphicTools.assets()}
                      component={component}
                      store={store} />
                ));
            });
        } else {
            res.status(404).send('Not found');
        }
    });
});

if (config.port) {
    server.listen(config.port, (err) => {
        if (err) console.error(err);

        console.info('----\n==> ✅  %s is running.', config.app.title);
        console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
    });
} else {
    console.error('==>     ERROR: No PORT environment variable has been specified');
}
