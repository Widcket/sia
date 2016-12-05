import * as actions from '../actions/step1/definitions';

const reducers = {
    NEXT: (action, newState) => ({...newState, stage: ++newState.stage}),
    GET_DATASET_COUNT_FAILED: (action, newState) => ({...newState, error: action.error}),
    GET_DATASET_LIST: (action, newState) => {
        const datasets = {};
        const datasetPickerItems = [];

        for (const dataset of action.data) {
            datasets[dataset.id] = {
                id: dataset.id,
                name: dataset.name,
                files: []
            };

            datasetPickerItems.push({
                key: dataset.id,
                title: dataset.name,
                chosen: false
            });
        }

        newState.datasets = datasets;
        newState.datasetPickerItems = datasetPickerItems;

        return newState;
    },
    GET_DATASET_LIST_FAILED: (action, newState) => {
        newState.error = action.error;

        return newState;
    },
    GET_FILE_LIST: (action, newState) => {
        const files = [];
        const filePickerItems = [];

        for (const dataset of newState.pickedDatasets) {
            for (const file of newState.datasets[dataset].files) {
                filePickerItems.push({
                    key: file.id,
                    title: file.name,
                    chosen: false
                });
            }
        }

        if (action.files) {
            for (const file of action.files) {
                const record = {
                    id: file.id,
                    name: file.name
                };

                if (typeof file.type === 'string' || file.type instanceof String) {
                    if (newState.filetypes.includes(file.type)) {
                        newState.datasets[file.dataset].files.push(record);
                        filePickerItems.push({
                            key: record.id,
                            title: record.name,
                            chosen: false
                        });
                    }
                }
                else if (typeof file.type === 'object' &&
                    file.type !== null &&
                    file.type.constructor === Object &&
                    file.type.hasOwnProperty('isPrototypeOf') === false &&
                    file.type.message.toString() === '[object Object]') {
                    if (newState.filetypes.includes(file.type.id)) {
                        newState.datasets[file.dataset.id].files.push(record);
                    }
                }
            }
        }

        newState.filePickerItems = filePickerItems;

        return newState;
    },
    GET_FILE_LIST_FAILED: (action, newState) => ({...newState, error: action.error }),
    GET_FILETYPE_COUNT_FAILED: (action, newState) => ({...newState, error: action.error}),
    GET_FILETYPE_LIST: (action, newState) => {
        const filetypes = [];

        for (const type of action.data) {
            if (type.api) filetypes.push(type.id);
        }

        newState.filetypes = filetypes;

        return newState;
    },
    GET_FILETYPE_LIST_FAILED: (action, newState) => {
        newState.error = action.error;

        return newState;
    },
    GET_FILE_FIELDS: (action, newState) => {
        return newState;
    },
    GET_FILE_FIELDS_FAILED: (action, newState) => {
        newState.error = action.error;

        return newState;
    },
    GET_FILE_CONTENTS: (action, newState) => {
        return newState;
    },
    GET_FILE_CONTENTS_FAILED: (action, newState) => {
        newState.error = action.error;

        return newState;
    },
    SET_PICKER_PANEL: (action, newState) => {
        newState.pickerPanel = action.pickerPanel;

        return newState;
    },
    SELECT_DATASETS: (action, newState) => {
        newState.pickedDatasets = action.chosenItems;

        if (action.selectedItems[0]) newState.pickedDatasets.push(action.selectedItems[0]);

        return newState;
    },
    SELECT_FILES: (action, newState) => {
        newState.pickedFiles = action.chosenItems;

        if (action.selectedItems[0]) newState.pickedFiles.push(action.selectedItems[0]);

        return newState;
    }
};

const initialState = {
    stage: 0,
    datasets: {},
    filetypes: [],
    files: {},
    pickerPanel: 'pickerPanel-1',
    datasetPickerItems: [],
    filePickerItems: [],
    pickedDatasets: [],
    pickedFiles: [],
    error: null
};

export default function step1(state = initialState, action = {}) {
    const newState = { ...state };

    switch (action.type) {
        case actions.NEXT:
            return reducers.NEXT(action, newState);
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
        case actions.SET_PICKER_PANEL:
            return reducers.SET_PICKER_PANEL(action, newState);
        case actions.SELECT_DATASETS:
            return reducers.SELECT_DATASETS(action, newState);
        case actions.SELECT_FILES:
            return reducers.SELECT_FILES(action, newState);
        default:
            return state;
    }
}