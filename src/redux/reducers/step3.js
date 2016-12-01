import * as actions from '../actions/step3/definitions';

import {chartConfig, chartSeries} from './step3/chartConfig.js';
import {chartSubtype, chartTypes} from './step3/chartTypes.js';

const reducers = {
    SET_ECHARTS_INSTANCE: (action, newState) => ({...newState, echarts: action.echarts }),
    SET_DEFAULT_TAB: (action, newState) => ({...newState, defaultTab: action.defaultTab}),
    SET_CHART_TYPE: (action, newState) => {
        newState.chartConfig = { ...newState.chartConfig, ...action.newConfig };

        if (!action.chartType) {
            newState.chartType = newState.chartType;
            newState.chartSubtype[newState.chartType.value] = action.chartSubtype;
        } else {
            newState.chartType = action.chartType;
        }

        newState.chartSeries[newState.chartType.value] = action.newSeries;
        newState.echarts.setOption({ ...newState.chartConfig, series: action.newSeries }, true);

        return newState;
    },
    // TODO: Set xAxis data in chartConfig
    SET_CATEGORY: (action, newState) => ({...newState, category: ++newState.stage}),
    SET_COLUMNS: (action, newState) => {
        // TODO: Memoize
        let largest = 0;

        if (action.columns.length > 0) {
            if (newState.chartConfig.xAxis[0].data) newState.chartConfig.xAxis[0].data = action.categoryAxis;

            newState.chartSeries[newState.chartType.value] = action.columns;
        } else {
            newState.chartSeries[newState.chartType.value] = [];
        }

        // Fill with 0s to even the length of the data arrays
        if (newState.chartConfig.xAxis[0].data) {
            for (const element of newState.chartSeries[newState.chartType.value]) {
                if (element.data.length > largest) largest = element.data.length;
            }

            for (const element of newState.chartSeries[newState.chartType.value]) {
                for (let i = element.data.length; i <= largest; i++) {
                    element.data.push(0);
                }
            }
        }

        newState.echarts.setOption({ ...newState.chartConfig, series: newState.chartSeries[newState.chartType.value]},
            true);

        return newState;
    },
    SET_RANGE_X: (action, newState) => {
        newState.rangeX = action.rangeX;
        newState.chartConfig.dataZoom[0].start = action.rangeX[0];
        newState.chartConfig.dataZoom[0].end = action.rangeX[1];
        newState.chartConfig.dataZoom[2].start = action.rangeX[0];
        newState.chartConfig.dataZoom[2].end = action.rangeX[1];

        return newState;
    },
    SET_RANGE_Y: (action, newState) => {
        newState.rangeY = action.rangeY;
        newState.chartConfig.dataZoom[1].start = action.rangeY[0];
        newState.chartConfig.dataZoom[1].end = action.rangeY[1];
        newState.chartConfig.dataZoom[3].start = action.rangeY[0];
        newState.chartConfig.dataZoom[3].end = action.rangeY[1];

        return newState;
    },
    TOGGLE_INVERT_DATA: (action, newState) => {
        // TODO: Memoize
        for (const element of newState.chartSeries[newState.chartType.value]) {
            element.data.reverse();
        }

        if (newState.chartConfig.xAxis[0].data) newState.chartConfig.xAxis[0].data.reverse();
        if (newState.chartConfig.yAxis[0].data) newState.chartConfig.yAxis[0].data.reverse();

        newState.invertData = !newState.invertData;
        newState.echarts.setOption({...newState.chartConfig, series: newState.chartSeries[newState.chartType.value]},
            false);

        return newState;
    },
    TOGGLE_TRANSPOSE_DATA: (action, newState) => {
        const xAxis = {...newState.chartConfig.yAxis[0]};
        const yAxis = {...newState.chartConfig.xAxis[0]};

        newState.chartConfig.yAxis[0] = yAxis;
        newState.chartConfig.xAxis[0] = xAxis;

        newState.transposeData = !newState.transposeData;
        newState.echarts.setOption({...newState.chartConfig, series: newState.chartSeries[newState.chartType.value]},
            true);

        return newState;
    },
    SET_CHART_TITLE: (action, newState) => {
        newState.chartConfig.title.text = action.chartTitle;

        return newState;
    },
    TOGGLE_AXIS: (action, newState, axis) => {
        newState.chartConfig[axis][0].show = !newState.chartConfig[axis][0].show;

        if (!newState.chartConfig[axis][0].show) {
            newState.chartConfig[axis][0].splitLine.show = false;
            newState.chartConfig[axis][0].splitArea.show = false;
        }

        return newState;
    },
    TOGGLE_AXIS_GRID: (action, newState, axis) => {
        if (!newState.chartConfig[axis][0].show) newState.chartConfig[axis][0].show = true;

        newState.chartConfig[axis][0].splitLine.show = newState.chartConfig[axis][0].splitLine.show ? false : true;

        return newState;
    },
    TOGGLE_AXIS_AREA: (action, newState, axis) => {
        if (!newState.chartConfig[axis][0].show) newState.chartConfig[axis][0].show = true;

        newState.chartConfig[axis][0].splitArea.show = newState.chartConfig[axis][0].splitArea.show ? false : true;

        return newState;
    }
};

const categories = [
    {
        value: 'dataset1',
        label: 'Dataset 1',
        children: [
            {
                value: 'firstName',
                label: 'First Name',
            },
            {
                value: 'lastName',
                label: 'Last Name',
            },
            {
                value: 'state',
                label: 'State',
            }
        ]
    }
];

const initialState = {
    echarts: {},
    defaultTab: 'tab1',
    chartTypes,
    chartType: chartTypes.line,
    chartSubtype: chartSubtype,
    invertData: false,
    transposeData: false,
    rangeX: [0, 100],
    rangeY: [0, 100],
    categories,
    category: [0, 0],
    chartConfig: {
        ...chartConfig,
        ...chartTypes.line.config
    },
    chartSeries
};

export default function step3(state = initialState, action = {}) {
    const newState = { ...state };

    switch (action.type) {
        case actions.SET_ECHARTS_INSTANCE:
            return reducers.SET_ECHARTS_INSTANCE(action, newState);
        case actions.SET_DEFAULT_TAB:
            return reducers.SET_DEFAULT_TAB(action, newState);
        case actions.SET_CHART_TYPE:
        case actions.SET_CHART_SUBTYPE:
            return reducers.SET_CHART_TYPE(action, newState);
        case actions.SET_CATEGORY:
            return reducers.SET_CATEGORY(action, newState);
        case actions.SET_COLUMNS:
            return reducers.SET_COLUMNS(action, newState);
        case actions.SET_RANGE_X:
            return reducers.SET_RANGE_X(action, newState);
        case actions.SET_RANGE_Y:
            return reducers.SET_RANGE_Y(action, newState);
        case actions.TOGGLE_INVERT_DATA:
            return reducers.TOGGLE_INVERT_DATA(action, newState);
        case actions.TOGGLE_TRANSPOSE_DATA:
            return reducers.TOGGLE_TRANSPOSE_DATA(action, newState);
        case actions.SET_CHART_TITLE:
            return reducers.SET_CHART_TITLE(action, newState);
        case actions.TOGGLE_X_AXIS:
            return reducers.TOGGLE_AXIS(action, newState, 'xAxis');
        case actions.TOGGLE_X_AXIS_GRID:
            return reducers.TOGGLE_AXIS_GRID(action, newState, 'xAxis');
        case actions.TOGGLE_X_AXIS_AREA:
            return reducers.TOGGLE_AXIS_AREA(action, newState, 'xAxis');
        case actions.TOGGLE_Y_AXIS:
            return reducers.TOGGLE_AXIS(action, newState, 'yAxis');
        case actions.TOGGLE_Y_AXIS_GRID:
            return reducers.TOGGLE_AXIS_GRID(action, newState, 'yAxis');
        case actions.TOGGLE_Y_AXIS_AREA:
            return reducers.TOGGLE_AXIS_AREA(action, newState, 'yAxis');
        default:
            return state;
    }
}