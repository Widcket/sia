import * as actions from './definitions';

export function setEchartsInstance(echarts, series) {
    return {
        type: actions.SET_ECHARTS_INSTANCE,
        echarts
    };
}

export function setChartType(chartType, chartSubtype, newSeries, newConfig) {
    return {
        type: actions.SET_CHART_TYPE,
        chartType,
        chartSubtype,
        newSeries,
        newConfig
    };
}

export function setValueAxis(valueAxis) {
    return {
        type: actions.SET_CHART_SUBTYPE,
        valueAxis
    };
}

export function setColumns(columns, categoryAxis) {
    return {
        type: actions.SET_COLUMNS,
        columns,
        categoryAxis
    };
}

export function setDataRange(dataRange) {
    return {
        type: actions.SET_DATA_RANGE,
        dataRange
    };
}

export function toggleInvertData() {
    return {
        type: actions.TOGGLE_INVERT_DATA
    };
}

export function toggleTransposeData() {
    return {
        type: actions.TOGGLE_TRANSPOSE_DATA
    };
}

export function setChartTitle(chartTitle) {
    return {
        type: actions.SET_CHART_TITLE,
        chartTitle
    };
}

export function toggleXAxis() {
    return {
        type: actions.TOGGLE_X_AXIS
    };
}

export function toggleXAxisGrid() {
    return {
        type: actions.TOGGLE_X_AXIS_GRID
    };
}

export function toggleXAxisArea() {
    return {
        type: actions.TOGGLE_X_AXIS_AREA
    };
}

export function toggleYAxis() {
    return {
        type: actions.TOGGLE_Y_AXIS
    };
}

export function toggleYAxisGrid() {
    return {
        type: actions.TOGGLE_Y_AXIS_GRID
    };
}

export function toggleYAxisArea() {
    return {
        type: actions.TOGGLE_Y_AXIS_AREA
    };
}