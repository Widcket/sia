import * as actions from './definitions';

export function setTitle(chartTitle) {
    return {
        type: actions.SET_TITLE,
        chartTitle
    };
}

export function setDescription(chartDescription) {
    return {
        type: actions.SET_DESCRIPTION,
        chartDescription
    };
}

export function setNotes(chartNotes) {
    return {
        type: actions.SET_NOTES,
        chartNotes
    };
}

export function includeDataTable() {
    return {
        type: actions.INCLUDE_DATA_TABLE
    };
}

export function exportApk() {
    return {
        type: actions.EXPORT_APK
    };
}

export function exportNode() {
    return {
        type: actions.EXPORT_NODE
    };
}