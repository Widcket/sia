import * as actions from './definitions';

export function setInstance(endpoints, token) {
    return {
        type: actions.SET_INSTANCE,
        endpoints,
        token
    };
}

export function setFiles(pickedFiles, allFiles) {
    const files = {};

    for (const id of pickedFiles) {
        files[id] = allFiles[id];
        files[id].dimensions = [];
    }

    return {
        type: actions.SET_FILES,
        files
    };
}

export function setFilters(file, filters) {
    return {
        type: actions.SET_FILTERS,
        file,
        filters
    };
}

export function setFilteredFiles(file, data) {
    return {
        type: actions.SET_FILTERED_FILES,
        file,
        data
    };
}

export function addData(data) {
    return {
        type: actions.ADD_DATA,
        data
    };
}

export function addDimensions(file) {
    return {
        type: actions.ADD_DIMENSIONS,
        file
    };
}