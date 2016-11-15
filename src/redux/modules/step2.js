const FILTER = 'sia/FILTER';
const TOGGLE_DIMENSION = 'sia/TOGGLE_DIMENSION';
const TOGGLE_TAB = 'sia/TOGGLE_TAB';
const ADD_COLUMN = 'sia/ADD_COLUMN';
const REMOVE_COLUMN = 'sia/REMOVE_COLUMN';
const EDIT_COLUMN = 'sia/EDIT_COLUMN';
const SAVE_COLUMN = 'sia/SAVE_COLUMN';
const TOGGLE_PAGE = 'sia/TOGGLE_PAGE'
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