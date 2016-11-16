import * as actions from '../actions/step2/definitions';

const initialState = {
    loaded: false
};

export default function info(state = initialState, action = {}) {
    switch (action.type) {
        case actions.FILTER:
            return {
                ...state,
                loading: true
            };
        case actions.TOGGLE_DIMENSION:
            return {
                ...state,
            };
        case actions.TOGGLE_TAB:
            return {
                ...state,
                error: action.error
            };
        case actions.ADD_COLUMN:
            return {
                ...state,
                error: action.error
            };
        case actions.REMOVE_COLUMN:
            return {
                ...state,
                error: action.error
            };
        case actions.EDIT_COLUMN:
            return {
                ...state,
                error: action.error
            };
        case actions.SAVE_COLUMN:
            return {
                ...state,
                error: action.error
            };
        case actions.TOGGLE_PAGE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}