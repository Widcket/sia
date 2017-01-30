import 'whatwg-fetch';

import * as actions from './definitions';
import * as appActions from '../app/definitions';

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

let token;

export function next() {
    return {
        type: actions.NEXT
    };
}

export function getDatasetList(url, authToken) {
    generateEndpoints(url);
    token = authToken;

    return (dispatch, getState) => {
        dispatch({
            type: appActions.SET_INSTANCE,
            endpoints,
            token
        });

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
            if (value.data && value.data.count > 0) {
                const url = endpoints.datasets + `?limit=${value.data.count}&fields=id,name`;

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
                    if (value.data && value.data.length > 0) {
                        dispatch({
                            type: actions.GET_DATASET_LIST,
                            data: value.data
                        });
                        dispatch({
                            type: actions.NEXT
                        });
                    }
                    else if (!value.data) {
                        dispatch({
                            type: actions.GET_DATASET_LIST_FAILED,
                            error: 'Error del servidor'
                        });
                    }
                    else {
                        dispatch({
                            type: actions.GET_DATASET_LIST_FAILED,
                            error: 'No hay datasets'
                        });
                    }
                });
            }
            else if (!value.data) {
                dispatch({
                    type: actions.GET_DATASET_LIST_FAILED,
                    error: 'Error del servidor'
                });
            }
            else {
                dispatch({
                    type: actions.GET_DATASET_LIST_FAILED,
                    error: 'No hay datasets'
                });
            }
        });
    };
}

export function getFiletypeList() {
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
            if (value.data && value.data.count > 0) {
                const url = endpoints.filetypes + `?limit=${value.data.count}&fields=id,name,api`;

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
                    if (value.data && value.data.length > 0) {
                        dispatch({
                            type: actions.GET_FILETYPE_LIST,
                            data: value.data
                        });
                    }
                    else if (!value.data) {
                        dispatch({
                            type: actions.GET_FILETYPE_LIST_FAILED,
                            error: 'Error del servidor'
                        });
                    }
                    else {
                        dispatch({
                            type: actions.GET_FILETYPE_LIST_FAILED,
                            error: 'No hay datos suficientes en el servidor'
                        });
                    }
                });
            }
            else if (!value.data) {
                dispatch({
                    type: actions.GET_FILETYPE_COUNT_FAILED,
                    error: 'Error del servidor'
                });
            }
            else {
                dispatch({
                    type: actions.GET_FILETYPE_COUNT_FAILED,
                    error: 'No hay datos suficientes en el servidor'
                });
            }
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
                    Authorization: `Bearer ${token}`
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
                if (value.data && value.data.length > 0) {
                    dispatch({
                        type: actions.GET_FILE_LIST,
                        files: value.data
                    });
                    dispatch({
                        type: actions.DISABLE_FILE_SPINNER
                    });
                }
                else if (!value.data) {
                    dispatch({
                        type: actions.GET_FILE_FIELDS_FAILED,
                        error: 'Error del servidor'
                    });
                    dispatch({
                        type: actions.DISABLE_FILE_INFO_SPINNER
                    });
                }
                else {
                    dispatch({
                        type: actions.FILE_IS_EMPTY
                    });
                    dispatch({
                        type: actions.GET_FILE_FIELDS_FAILED,
                        error: 'El dataset no tiene archivos'
                    });
                    dispatch({
                        type: actions.DISABLE_FILE_INFO_SPINNER
                    });
                }
            });
        }
        else {
            dispatch({
                type: actions.GET_FILE_LIST
            });
        }
    };
}

export function getFileFields(id) {
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
                    Authorization: `Bearer ${token}`
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
                if (value.data && value.data.length > 0) {
                    const fields = value.data[0];
                    const rows = value.meta.count;
                    const columns = Object.getOwnPropertyNames(fields).length - 1;
                    const fileInfoUrl = `${endpoints.files}/${id}`;

                    fetch(fileInfoUrl, {
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
                        dispatch({
                            type: actions.DISABLE_FILE_INFO_SPINNER
                        });
                    })
                    .then((fileInfo) => {
                        if (fileInfo.data) {
                            const createdAt = new Date(fileInfo.data.createdAt).toLocaleString().split(',')[0];
                            const updatedAt = new Date(fileInfo.data.updatedAt).toLocaleString().split(',')[0];
                            const rowsToFetch = rows < 200 ? (rows || 0) : 200;
                            const rowsOffset = 0;

                            delete fields._id;

                            dispatch({
                                type: actions.GET_FILE_FIELDS,
                                id,
                                rows,
                                columns,
                                createdAt,
                                updatedAt,
                                rowsToFetch,
                                rowsOffset,
                                fields  // TODO: Identify field types
                            });
                            dispatch({
                                type: actions.DISABLE_FILE_INFO_SPINNER
                            });
                        }
                        else {
                            dispatch({
                                type: actions.GET_FILE_FIELDS_FAILED,
                                error: 'Error del servidor'
                            });
                            dispatch({
                                type: actions.DISABLE_FILE_INFO_SPINNER
                            });
                        }
                    });
                }
                else if (!value.data) {
                    dispatch({
                        type: actions.GET_FILE_FIELDS_FAILED,
                        error: 'Error del servidor'
                    });
                    dispatch({
                        type: actions.DISABLE_FILE_INFO_SPINNER
                    });
                }
                else {
                    dispatch({
                        type: actions.FILE_IS_EMPTY,
                        file: id
                    });
                    dispatch({
                        type: actions.GET_FILE_FIELDS_FAILED,
                        error: 'El archivo está vacío'
                    });
                    dispatch({
                        type: actions.DISABLE_FILE_INFO_SPINNER
                    });
                }
            });
        }
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

export function selectFiles(selectedItems, chosenItems, events) {
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

export function setRowsToFetch(file, rows) {
    return {
        type: actions.SET_ROWS_TO_FETCH,
        file,
        rows
    };
}

export function setRowsOffset(file, offset) {
    return {
        type: actions.SET_ROWS_OFFSET,
        file,
        offset
    };
}