import * as actions from '../actions/step3/definitions';

const chartTypes = {
    line: {
        name: 'Líneas',
        subtypes: [
            {
                name: 'Básico'
            },
            {
                name: 'Área'
            },
            {
                name: 'Área invertida'
            },
        ]
    },
    bar: {
        name: 'Barras',
        subtypes: [
            {
                name: 'Básico'
            },
            {
                name: 'Cascada'
            },
            {
                name: 'Barras apiladas'
            },
            {
                name: 'Barras divididas'
            },
            {
                name: 'Barras cruzadas'
            }
        ]
    },
    scatter: {
        name: 'Dispersión',
        subtypes: [
            {
                name: 'Básico'
            },
            {
                name: 'Burbujas'
            },
            {
                name: 'Gran escala'
            }
        ]
    },
    pie: {
        name: 'Torta',
        subtypes: [
            {
                name: 'Básico'
            },
            {
                name: 'Dona'
            },
            {
                name: 'Compuesto'
            }
        ]
    },
    radar: {
        name: 'Radar',
        subtypes: [
            {
                name: 'Básico'
            },
            {
                name: 'Relleno'
            }
        ]
    },
    chord: {
        name: 'Cuerdas',
        subtypes: [
            {
                name: 'Básico'
            },
            {
                name: 'Alternativo'
            }
        ]
    },
    force: {
        name: 'Grafos',
        subtypes: [
            {
                name: 'Básico'
            },
            {
                name: 'Árbol'
            }
        ]
    },
    mixed: {
        name: 'Combinados',
        subtypes: [
            {
                name: 'Líneas + barras'
            },
            {
                name: 'Líneas + dispersión'
            }
        ]
    }
};

const chartConfig = {
    title: {
        text: 'Gráfico 1'
    },
    tooltip: {
        trigger: 'axis'
    },
    toolbox: {
        feature: {
            saveAsImage: {
                title: 'PNG'
            }
        }
    },
    grid: {
        left: '1%',
        right: '1%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            show: true,
            boundaryGap: false,
            data: ['abc', 'def', 'ghi', 'jk', 'lm', 'no', 'pq'],
            splitLine: {
                show: false
            },
            splitArea: {
                show: false
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            show: true,
            splitLine: {
                show: true
            },
            splitArea: {
                show: true
            }
        }
    ],
};

const chartSeries = [
    {
        name: 'Serie 1',
        type: 'line',
        stack: '123',
        areaStyle: { normal: {} },
        data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
        name: 'Serie 2',
        type: 'line',
        stack: '456',
        areaStyle: { normal: {} },
        data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
        name: 'Serie 3',
        type: 'line',
        stack: '789',
        areaStyle: { normal: {} },
        data: [150, 232, 201, 154, 190, 330, 410]
    }
];

const initialState = {
    defaultTab: 'tab1',
    chartTypes,
    chartType: chartTypes.line,
    chartSubtype: 0,
    invertData: false,
    transposeData: false,
    chartConfig,
    chartSeries
};

export default function step3(state = initialState, action = {}) {
    const newState = { ...state };

    switch (action.type) {
        case actions.SET_DEFAULT_TAB:
            return {
                ...state,
                defaultTab: action.defaultTab,
                error: action.error
            };
        case actions.SET_CHART_TYPE:
            return {
                ...state,
                chartType: action.chartType,
                error: action.error
            };
        case actions.SET_CHART_SUBTYPE:
            return {
                ...state,
                chartSubtype: action.chartSubtype,
                error: action.error
            };
        case actions.SET_COLUMNS:
            return {
                ...state,
                columns: action.columns,
                error: action.error
            };
        case actions.SET_DATA_RANGE:
            return {
                ...state,
                dataRange: action.dataRange,
                error: action.error
            };
        case actions.TOGGLE_INVERT_DATA:
            return {
                ...state,
                invertData: !state.invertData,
                error: action.error
            };
        case actions.TOGGLE_TRANSPOSE_DATA:
            return {
                ...state,
                transposeData: !state.transposeData,
                error: action.error
            };
        case actions.SET_CHART_TITLE:
            newState.chartConfig.title.text = action.chartTitle;
            newState.error = action.error;

            return newState;
        case actions.TOGGLE_X_AXIS:
            newState.chartConfig.xAxis[0].show = !state.chartConfig.xAxis[0].show;
            newState.error = action.error;

            return newState;
        case actions.TOGGLE_X_AXIS_GRID:
            newState.chartConfig.xAxis[0].splitLine.show = !state.chartConfig.xAxis[0].splitLine.show;
            newState.error = action.error;

            return newState;
        case actions.TOGGLE_X_AXIS_AREA:
            newState.chartConfig.xAxis[0].splitArea.show = !state.chartConfig.xAxis[0].splitArea.show;
            newState.error = action.error;

            return newState;
        case actions.TOGGLE_Y_AXIS:
            newState.chartConfig.yAxis[0].show = !state.chartConfig.yAxis[0].show;
            newState.error = action.error;

            return newState;
        case actions.TOGGLE_Y_AXIS_GRID:
            newState.chartConfig.yAxis[0].splitLine.show = !state.chartConfig.yAxis[0].splitLine.show;
            newState.error = action.error;

            return newState;
        case actions.TOGGLE_Y_AXIS_AREA:
            newState.chartConfig.yAxis[0].splitArea.show = !state.chartConfig.yAxis[0].splitArea.show;
            newState.error = action.error;

            return newState;
        default:
            return state;
    }
}