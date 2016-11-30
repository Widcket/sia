import 'whatwg-fetch';

import * as actions from './definitions';

const endpoints = {
    base: null,
    datasets: null,
    datasetCount: null
};

export function next() {
    return {
        type: actions.NEXT
    };
}

export function getDatasetList(url, token) {
    if (url.endsWith('/')) {
        const urlArray = [...url];

        urlArray.pop();
        endpoints.base = urlArray.join();
    }
    else endpoints.base = url;

    endpoints.datasets = url + '/datasets';
    endpoints.datasetCount = endpoints.datasets + '/count';

    return (dispatch, getState) => {
        fetch(endpoints.datasetCount, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Accepts: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => response.json(), (error) => {
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
                    Accepts: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => response.json(), (error) => {
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

export function getDatasetFiles(id, token) {
    return (dispatch, getState) => {
        const url = `${endpoints.datasets}/${id}/files`;

        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Accepts: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => response.json(), (error) => {
            dispatch({
                type: actions.GET_DATASET_FILES_FAILED,
                error: error.message
            });
        })
        .then((value) => {
            dispatch({
                type: actions.GET_DATASET_FILES,
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
                Accepts: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => response.json(), (error) => {
            dispatch({
                type: actions.GET_DATASET_FILE_FIELDS_FAILED,
                error: error.message
            });
        })
        .then((value) => {
            dispatch({
                type: actions.GET_DATASET_FILE_FIELDS,
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
                Accepts: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => response.json(), (error) => {
            dispatch({
                type: actions.GET_DATASET_FILE_CONTENTS_FAILED,
                error: error.message
            });
        })
        .then((value) => {
            dispatch({
                type: actions.GET_DATASET_FILE_CONTENTS,
                data: value.data
            });
        });
    };
}