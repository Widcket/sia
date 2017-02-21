import * as actions from '../actions/step2/definitions';

const initialState = {
    stage: 0,
    loadingData: true,
    defaultTab: null,
    filters: {},
    filterConditions: {
        number: {
            equals: 'igual a',
            greaterThan: 'mayor a',
            lessThan: 'menor a'
        },
        string: {
            equals: 'igual a',
            beginsWith: 'empieza con',
            endsWith: 'termina con',
            contains: 'contiene'
        }
    },
    validTypes: ['number', 'string']
};

export default function step2(state = initialState, action = {}) {
    const newState = { ...state };

    switch (action.type) {
        case actions.SET_DEFAULT_TAB:
            newState.defaultTab = action.defaultTab;

            return newState;
        case actions.SET_FILE:
            const columns = action.file.fields ? Object.getOwnPropertyNames(action.file.fields) : [];
            const field = Object.getOwnPropertyNames(action.file.fields)[0];
            const condition = 'equals'; // TODO: Use proper type

            newState.filters[action.file.id] = {
                filters: [],
                columns,
                field,
                condition,
                isFiltering: false
            };

            return newState;
        case actions.ADD_FILTER:
            newState.filters[action.file.id].filters.push(action.filter);

            return newState;
        case actions.REMOVE_FILTER:
            const index = newState.filters[action.file.id].filters.indexOf(action.filter);

            if (index > -1) newState.filters[action.file.id].filters.splice(index, 1);

            return newState;
        case actions.SET_FILTERS:
            newState.filters[action.file.id].filters = action.filters;

            return newState;
        case actions.SET_FILTER_FIELD:
            newState.filters[action.file.id].field = action.field;

            return newState;
        case actions.SET_FILTER_CONDITION:
            newState.filters[action.file.id].condition = action.condition;

            return newState;
        case actions.SET_FILTER_VALUE:
            newState.filters[action.file.id].value = action.value;

            return newState;
        case actions.IS_FILTERING:
            newState.filters[action.file.id].isFiltering = action.value;

            return newState;
        default:
            return state;
    }
}