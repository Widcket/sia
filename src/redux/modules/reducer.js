import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
// import multireducer from 'multireducer';
import navigation from './navigation';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {routerReducer} from 'react-router-redux';
import step1 from './step1';
import step2 from './step2';
import step3 from './step3';
import step4 from './step4';

export default combineReducers({
    routing: routerReducer,
    reduxAsyncConnect,
    form,
    step1,
    step2,
    step3,
    step4,
    navigation
});