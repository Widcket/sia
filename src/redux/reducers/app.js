import * as actions from '../actions/app/definitions';

const initialState = {
    lastStep: 3,
    files: {},
    filesFetched: 0,
    endpoints: {},
    loadingFiles: true,
    token: null
};

export default function app(state = initialState, action = {}) {
    const newState = { ...state };

    switch (action.type) {
        case actions.SET_INSTANCE:
            newState.endpoints = action.endpoints;
            newState.token = action.token;

            return newState;
        case actions.SET_FILES:
            newState.files = action.files;

            return newState;
        case actions.ADD_DATA:
            console.info('INSIDE case actions.ADD_DATA');

            newState.files[action.file.id].data = action.data;
            newState.filesFetched++;

            console.info('Fetched file ' + newState.filesFetched);

            if (newState.files[action.file.id].data._id) delete newState.files[action.file.id].data._id;

            return newState;
        case actions.ADD_DIMENSIONS:
            const dimensions = [];

            console.info('INSIDE case actions.ADD_DIMENSIONS');

            for (const field in action.file.fields) {
                if (action.file.fields.hasOwnProperty(field) &&
                    field !== '_id' && field !== 'id' && field !== 'ID') {
                    dimensions.push(
                        {
                            title: field,
                            value: field
                        }
                    );
                }
            }

            console.log(action.file.name);
            console.log(dimensions);

            newState.files[action.file.id].dimensions = dimensions;

            if (newState.filesFetched === (Object.getOwnPropertyNames(newState.files).length)) {
                console.info('Finished fetching files! Total files: ' +
                    Object.getOwnPropertyNames(newState.files).length);

                newState.loadingFiles = false;
            }

            return newState;
        case actions.DISABLE_FILE_SPINNER:
            newState.loadingFiles = false;

            return newState;
        default:
            return state;
    }
}