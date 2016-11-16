import * as actions from './definitions';

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

export function toggleTab() {
    return {
        type: actions.TOGGLE_TAB
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