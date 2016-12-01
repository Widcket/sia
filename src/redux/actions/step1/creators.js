import 'whatwg-fetch';

import * as actions from './definitions';

const endpoints = {
    base: null,
    datasets: null,
    datasetCount: null,
    filetypes: null,
    filetypesCount: null
};

const generateEndpoints = (url) => {
    if (url.endsWith('/')) {
        const urlArray = [...url];

        urlArray.pop();
        endpoints.base = urlArray.join();
    }
    else endpoints.base = url;

    endpoints.datasets = endpoints.base + '/datasets';
    endpoints.datasetCount = endpoints.datasets + '/count';
    endpoints.filetypes = endpoints.base + '/filetypes';
    endpoints.filetypesCount = endpoints.base + '/filetypes/count';
};


export function next() {
    return {
        type: actions.NEXT
    };
}

export function getDatasetList(url, token) {
    generateEndpoints(url);

    return (dispatch, getState) => {
        fetch(endpoints.datasetCount, {
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
                type: actions.GET_DATASET_COUNT_FAILED,
                error: error.message
            });
        })
        .then((value) => {
            const url = endpoints.datasets + `?limit=${value.data.count}&fields=id,name`;

            dispatch({
                type: actions.GET_DATASET_COUNT,
                count: value.data.count
            });

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
                    type: actions.GET_DATASET_LIST_FAILED,
                    error: error.message
                });
            })
            .then((value) => {
                dispatch({
                    type: actions.GET_DATASET_LIST,
                    data: value.data
                });
            });
        });
    };
}

export function getFiletypeList(token) {
    return (dispatch, getState) => {
        fetch(endpoints.filetypesCount, {
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
                type: actions.GET_FILETYPE_COUNT_FAILED,
                error: error.message
            });
        })
        .then((value) => {
            const url = endpoints.filetypes + `?limit=${value.data.count}&fields=id,name,api`;

            dispatch({
                type: actions.GET_FILETYPE_COUNT,
                count: value.data.count
            });

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
                    type: actions.GET_FILETYPE_LIST_FAILED,
                    error: error.message
                });
            })
            .then((value) => {
                dispatch({
                    type: actions.GET_FILETYPE_LIST,
                    data: value.data
                });
            });
        });
    };
}

export function getDatasetFiles(id, token) {
    return (dispatch, getState) => {
        const url = `${endpoints.datasets}/${id}/files`;

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
                type: actions.GET_FILE_LIST_FAILED,
                error: error.message
            });
        })
        .then((value) => {
            dispatch({
                type: actions.GET_FILE_LIST,
                files: value.data
            });
        });
    };
}

export function getFileFields(id, token) {
    return (dispatch, getState) => {
        const url = `${endpoints.base}/${id}/contents?limit=1`;

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
                type: actions.GET_FILE_FIELDS_FAILED,
                error: error.message
            });
        })
        .then((value) => {
            dispatch({
                type: actions.GET_FILE_FIELDS,
                fields: value.data[0] // TODO: Identify field types
            });
        });
    };
}

export function getFileContents(id, limit, token) {
    return (dispatch, getState) => {
        const url = `${endpoints.base}/${id}/contents?limit=${limit}`;

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
            dispatch({
                type: actions.GET_FILE_CONTENTS,
                data: value.data
            });
        });
    };
}