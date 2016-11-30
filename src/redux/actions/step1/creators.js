import 'whatwg-fetch';

import * as actions from './definitions';

export function next() {
    return {
        type: actions.NEXT
    };
}

export function getDatasetList(url, token) {
    let countEndpoint = 'count';
    let datasetsEndpoint = 'datasets';

    if (url.endsWith('/')) datasetsEndpoint = url + datasetsEndpoint;
    else datasetsEndpoint = url + '/' + datasetsEndpoint;

    countEndpoint = datasetsEndpoint + '/' + countEndpoint;

    return (dispatch, getState) => {
        fetch(countEndpoint, {
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
            datasetsEndpoint += `?limit=${value.data.count}&fields=id,name`;

            dispatch({
                type: actions.GET_DATASET_COUNT,
                count: value.data.count
            });

            fetch(datasetsEndpoint, {
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