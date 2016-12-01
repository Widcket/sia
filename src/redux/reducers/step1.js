import * as actions from '../actions/step1/definitions';

const reducers = {
    NEXT: (action, newState) => ({...newState, stage: ++newState.stage}),
    GET_DATASET_COUNT: (action, newState) => ({...newState }),
    GET_DATASET_COUNT_FAILED: (action, newState) => ({...newState }),
    GET_DATASET_LIST: (action, newState) => ({...newState}),
    GET_DATASET_LIST_FAILED: (action, newState) => ({...newState }),
    GET_DATASET_FILES: (action, newState) => ({...newState}),
    GET_DATASET_FILES_FAILED: (action, newState) => ({...newState }),
    GET_DATASET_FILE_FIELDS: (action, newState) => ({...newState}),
    GET_DATASET_FILE_FIELDS_FAILED: (action, newState) => ({...newState }),
    GET_DATASET_FILE_CONTENTS: (action, newState) => ({...newState}),
    GET_DATASET_FILE_CONTENTS_FAILED: (action, newState) => ({...newState}),
};

const initialState = {
    stage: 0
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
            return reducers.GET_DATASET_COUNT(action, newState);
        case actions.GET_DATASET_LIST_FAILED:
            return reducers.GET_DATASET_COUNT_FAILED(action, newState);
        case actions.GET_DATASET_FILES:
            return reducers.GET_DATASET_COUNT(action, newState);
        case actions.GET_DATASET_FILES_FAILED:
            return reducers.GET_DATASET_COUNT_FAILED(action, newState);
        case actions.GET_DATASET_FILE_FIELDS:
            return reducers.GET_DATASET_COUNT(action, newState);
        case actions.GET_DATASET_FILE_FIELDS_FAILED:
            return reducers.GET_DATASET_COUNT_FAILED(action, newState);
        case actions.GET_DATASET_FILE_CONTENTS:
            return reducers.GET_DATASET_COUNT(action, newState);
        case actions.GET_DATASET_FILE_CONTENTS_FAILED:
            return reducers.GET_DATASET_COUNT_FAILED(action, newState);
        default:
            return state;
    }
}