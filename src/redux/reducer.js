import app from './reducers/app';
import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
// import multireducer from 'multireducer';
import navigation from './reducers/navigation';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import { routerReducer } from 'react-router-redux';
import step1 from './reducers/step1';
import step2 from './reducers/step2';
import step3 from './reducers/step3';
import step4 from './reducers/step4';

export default combineReducers({
    routing: routerReducer,
    reduxAsyncConnect,
    form,
    app,
    step1,
    step2,
    step3,
    step4,
    navigation
});