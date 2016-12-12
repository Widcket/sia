import 'whatwg-fetch';

import * as actions from './definitions';

const endpoints = {
    base: null,
    datasets: null,
    datasetCount: null,
    files: null,
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
    endpoints.files = endpoints.base + '/files';
    endpoints.filetypes = endpoints.base + '/filetypes';
    endpoints.filetypesCount = endpoints.base + '/filetypes/count';
};

let authToken;

export function next() {
    return {
        type: actions.NEXT
    };
}

export function getDatasetList(url, token) {
    generateEndpoints(url);
    authToken = token;

    return (dispatch, getState) => {
        fetch(endpoints.datasetCount, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authToken}`
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

            fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authToken}`
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
                dispatch({
                    type: actions.NEXT
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
                Authorization: `Bearer ${authToken}`
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

            fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authToken}`
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

export function getDatasetFiles(id) {
    return (dispatch, getState) => {
        if (id) {
            const url = `${endpoints.datasets}/${id}/files`;

            dispatch({
                type: actions.ENABLE_FILE_SPINNER
            });

            fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authToken}`
                }
            })
            .then((response) => response.json(), (error) => {
                console.error(error.message);

                dispatch({
                    type: actions.GET_FILE_LIST_FAILED,
                    error: error.message
                });
                dispatch({
                    type: actions.DISABLE_FILE_SPINNER
                });
            })
            .then((value) => {
                dispatch({
                    type: actions.GET_FILE_LIST,
                    files: value.data
                });
                dispatch({
                    type: actions.DISABLE_FILE_SPINNER
                });
            });
        }
        else {
            dispatch({
                type: actions.GET_FILE_LIST
            });
        }
    };
}

export function getFileFields(id, token) {
    return (dispatch, getState) => {
        if (id) {
            const url = `${endpoints.files}/${id}/contents?limit=1`;

            dispatch({
                type: actions.ENABLE_FILE_INFO_SPINNER
            });

            fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authToken}`
                }
            })
            .then((response) => response.json(), (error) => {
                console.error(error.message);

                dispatch({
                    type: actions.GET_FILE_FIELDS_FAILED,
                    error: error.message
                });
                dispatch({
                    type: actions.DISABLE_FILE_INFO_SPINNER
                });
            })
            .then((value) => {
                const fields = value.data[0];
                const rows = value.meta.count;
                const columns = Object.keys(fields).length;

                delete fields._id;

                dispatch({
                    type: actions.GET_FILE_FIELDS,
                    id,
                    rows,
                    columns,
                    fields  // TODO: Identify field types
                });
                dispatch({
                    type: actions.DISABLE_FILE_INFO_SPINNER
                });
            });
        }
    };
}

export function getFileContents(id, limit, token) {
    return (dispatch, getState) => {
        const url = `${endpoints.files}/${id}/contents?limit=${limit}`;

        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authToken}`
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

export function setActivePanel(activePanel) {
    return {
        type: actions.SET_ACTIVE_PANEL,
        activePanel
    };
}

export function selectDatasets(selectedItems, chosenItems) {
    return {
        type: actions.SELECT_DATASETS,
        selectedItems,
        chosenItems
    };
}

export function selectFiles(selectedItems, chosenItems) {
    return {
        type: actions.SELECT_FILES,
        selectedItems,
        chosenItems
    };
}

export function setActiveTab(activeTab) {
    return {
        type: actions.SET_ACTIVE_TAB,
        activeTab
    };
}
