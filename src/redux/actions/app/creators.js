import * as actions from './definitions';

export function setFiles(files) {
    return {
        type: actions.SET_FILES,
        files
    };
}

export function setData(data) {
    return {
        type: actions.SET_DATA,
        data
    };
}