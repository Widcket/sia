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
                console.info('dispatching actions.ADD_DIMENSIONS');
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

export function filter() {
    return {
        type: actions.FILTER
    };
}

export function toggleDimension() {
    return {
        type: actions.TOGGLE_DIMENSION
    };
}

export function toggleTab(defaultTab) {
    return {
        type: actions.TOGGLE_TAB,
        defaultTab
    };
}

export function addColumn() {
    return {
        type: actions.ADD_COLUMN
    };
}

export function removeColumn() {
    return {
        type: actions.REMOVE_COLUMN
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

export function togglePage() {
    return {
        type: actions.TOGGLE_PAGE
    };
}