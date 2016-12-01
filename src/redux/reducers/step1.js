import * as actions from '../actions/step1/definitions';

const reducers = {
    NEXT: (action, newState) => ({...newState, stage: ++newState.stage}),
    GET_DATASET_COUNT: (action, newState) => ({...newState}),
    GET_DATASET_COUNT_FAILED: (action, newState) => ({...newState, error: action.error}),
    GET_DATASET_LIST: (action, newState) => {
        const datasets = [];

        for (const dataset of action.data) {
            datasets.push({
                id: dataset.id,
                name: dataset.name,
                files: []
            });
        }

        return {...newState, datasets};
    },
    GET_DATASET_LIST_FAILED: (action, newState) => ({...newState, error: action.error}),
    GET_FILE_LIST: (action, newState) => {
        // TODO: Add file id to newState.datasets.files

        return {...newState};
    },
    GET_FILE_LIST_FAILED: (action, newState) => ({...newState, error: action.error }),
    GET_FILETYPE_COUNT: (action, newState) => ({...newState}),
    GET_FILETYPE_COUNT_FAILED: (action, newState) => ({...newState, error: action.error}),
    GET_FILETYPE_LIST: (action, newState) => {
        console.log(action.data);
        return {...newState};
    },
    GET_FILETYPE_LIST_FAILED: (action, newState) => ({...newState, error: action.error}),
    GET_FILE_FIELDS: (action, newState) => ({...newState}),
    GET_FILE_FIELDS_FAILED: (action, newState) => ({...newState, error: action.error}),
    GET_FILE_CONTENTS: (action, newState) => ({...newState}),
    GET_FILE_CONTENTS_FAILED: (action, newState) => ({...newState, error: action.error}),
};

const initialState = {
    stage: 0,
    datasets: [],
    error: null
};

export default function step1(state = initialState, action = {}) {
    const newState = { ...state };

    switch (action.type) {
        case actions.NEXT:
            return reducers.NEXT(action, newState);
        case actions.GET_DATASET_COUNT:
            return reducers.GET_DATASET_COUNT(action, newState);
        case actions.GET_DATASET_COUNT_FAILED:
            return reducers.GET_DATASET_COUNT_FAILED(action, newState);
        case actions.GET_DATASET_LIST:
            return reducers.GET_DATASET_LIST(action, newState);
        case actions.GET_DATASET_LIST_FAILED:
            return reducers.GET_DATASET_LIST_FAILED(action, newState);
        case actions.GET_FILE_LIST:
            return reducers.GET_FILE_LIST(action, newState);
        case actions.GET_FILE_LIST_FAILED:
            return reducers.GET_FILE_LIST_FAILED(action, newState);
        case actions.GET_FILETYPE_COUNT:
            return reducers.GET_FILETYPE_COUNT(action, newState);
        case actions.GET_FILETYPE_COUNT_FAILED:
            return reducers.GET_FILETYPE_COUNT_FAILED(action, newState);
        case actions.GET_FILETYPE_LIST:
            return reducers.GET_FILETYPE_LIST(action, newState);
        case actions.GET_FILETYPE_LIST_FAILED:
            return reducers.GET_FILETYPE_LIST_FAILED(action, newState);
        case actions.GET_FILE_FIELDS:
            return reducers.GET_FILE_FIELDS(action, newState);
        case actions.GET_FILE_FIELDS_FAILED:
            return reducers.GET_FILE_FIELDS_FAILED(action, newState);
        case actions.GET_FILE_CONTENTS:
            return reducers.GET_FILE_CONTENTS(action, newState);
        case actions.GET_FILE_CONTENTS_FAILED:
            return reducers.GET_FILE_CONTENTS_FAILED(action, newState);
        default:
            return state;
    }
}