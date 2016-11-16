const FILTER = 'step2/FILTER';
const TOGGLE_DIMENSION = 'step2/TOGGLE_DIMENSION';
const TOGGLE_TAB = 'step2/TOGGLE_TAB';
const ADD_COLUMN = 'step2/ADD_COLUMN';
const REMOVE_COLUMN = 'step2/REMOVE_COLUMN';
const EDIT_COLUMN = 'step2/EDIT_COLUMN';
const SAVE_COLUMN = 'step2/SAVE_COLUMN';
const TOGGLE_PAGE = 'step2/TOGGLE_PAGE';
const initialState = {
    loaded: false
};

export default function info(state = initialState, action = {}) {
    switch (action.type) {
        case FILTER:
            return {
                ...state,
                loading: true
            };
        case TOGGLE_DIMENSION:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: action.result
            };
        case TOGGLE_TAB:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            };
        case ADD_COLUMN:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            };
        case REMOVE_COLUMN:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            };
        case EDIT_COLUMN:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            };
        case SAVE_COLUMN:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            };
        case TOGGLE_PAGE:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            };
        default:
            return state;
    }
}