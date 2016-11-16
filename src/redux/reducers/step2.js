import * as actions from '../actions/step2/definitions';

const initialState = {
    defaultTab: 'tab1'
};

export default function info(state = initialState, action = {}) {
    switch (action.type) {
        case actions.SET_DEFAULT_TAB:
            return {
                ...state,
                defaultTab: action.defaultTab,
                error: action.error
            };
        default:
            return state;
    }
}