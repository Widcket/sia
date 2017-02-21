import * as actions from './definitions';
import * as appActions from '../app/definitions';

export function next() {
    return {
        type: actions.NEXT
    };
}

export function getFileContents(file, endpoints, token) {
    return (dispatch, getState) => {
        const url = `${endpoints.files}/${file.id}/contents?limit=${file.limit}&offset=${file.offset}`;

        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => response.json(), (error) => {
            console.error(error.message);

            dispatch({
                type: actions.GET_FILE_CONTENTS_FAILED,
                error: error.message
            });
        })
        .then((value) => {
            if (value.data) {
                dispatch({
                    type: appActions.ADD_DATA,
                    data: value.data,
                    file
                });
                dispatch({
                    type: appActions.ADD_DIMENSIONS,
                    file
                });
            }
            else {
                dispatch({
                    type: actions.GET_FILE_CONTENTS_FAILED,
                    error: 'Error del servidor'
                });
            }
        });
    };
}

export function setDefaultTab(defaultTab) {
    return {
        type: actions.SET_DEFAULT_TAB,
        defaultTab
    };
}

export function addFilter(file, filter) {
    return {
        type: actions.ADD_FILTER,
        file,
        filter
    };
}

export function removeFilter(file, filter) {
    return {
        type: actions.REMOVE_FILTER,
        file,
        filter
    };
}

export function setFilters(file, filters) {
    return {
        type: actions.SET_FILTERS,
        file,
        filters
    };
}

export function setFile(file) {
    return {
        type: actions.SET_FILE,
        file
    };
}

export function setFilterField(file, field) {
    return {
        type: actions.SET_FILTER_FIELD,
        file,
        field
    };
}

export function setFilterCondition(file, condition) {
    return {
        type: actions.SET_FILTER_CONDITION,
        file,
        condition
    };
}

export function setFilterValue(file, value) {
    return {
        type: actions.SET_FILTER_VALUE,
        file,
        value
    };
}

export function isFiltering(file, value) {
    return {
        type: actions.IS_FILTERING,
        file,
        value
    };
}

export function editColumn() {
    return {
        type: actions.EDIT_COLUMN
    };
}

export function saveColumn() {
    return {
        type: actions.SAVE_COLUMN
    };
}
