import * as actions from '../actions/step4/definitions';

const initialState = {
    chartTitle: '',
    chartDescription: '',
    chartNotes: '',
    includeDataTable: false
};

export default function info(state = initialState, action = {}) {
    switch (action.type) {
        case actions.SET_TITLE:
            return {
                ...state,
                chartTitle: action.chartTitle,
                error: action.error
            };
        case actions.SET_DESCRIPTION:
            return {
                ...state,
                chartDescription: action.chartDescription,
                error: action.error
            };
        case actions.SET_NOTES:
            return {
                ...state,
                chartNotes: action.chartNotes,
                error: action.error
            };
        case actions.INCLUDE_DATA_TABLE:
            return {
                ...state,
                includeDataTable: !state.includeDataTable,
                error: action.error
            };
        case actions.EXPORT_APK:
            return {
                ...state,
                error: action.error
            };
        case actions.EXPORT_NODE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}