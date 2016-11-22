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
        right: '1.5%',
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
            },
            axisTick: {
                interval: 'auto'
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
            },
            scale: false
        }
    ],
};

const chartSeries = [
    {
        name: 'Serie 1',
        type: 'line',
        // stack: '123',
        areaStyle: { normal: {} },
        data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
        name: 'Serie 2',
        type: 'line',
        // stack: '456',
        areaStyle: { normal: {} },
        data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
        name: 'Serie 3',
        type: 'line',
       // stack: '789',
        areaStyle: { normal: {} },
        data: [150, 232, 201, 154, 190, 330, 410]
    }
];

const valueAxisOptions = [
    {
        name: 'Cantidad',
        value: 'count'
    },
    {
        name: 'Porcentaje',
        value: 'percent'
    }
];

const initialState = {
    echarts: {},
    defaultTab: 'tab1',
    chartTypes,
    chartType: chartTypes.line,
    chartSubtype: 0,
    transposeData: false,
    valueAxisOptions: valueAxisOptions,
    valueAxis: valueAxisOptions[0],
    chartConfig,
    chartSeries
};

export default function step3(state = initialState, action = {}) {
    const newState = { ...state };

    switch (action.type) {
        case actions.SET_ECHARTS_INSTANCE:
            return {
                ...state,
                echarts: action.echarts,
                error: action.error
            };
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
        case actions.SET_VALUE_AXIS:
            return {
                ...state,
                valueAxis: action.valueAxis,

                error: action.error
            };
        case actions.SET_COLUMNS:
            // TODO: Memoize
            let largest = 0;

            if (action.columns.length > 0) {
                newState.chartConfig.xAxis[0].data = action.categoryAxis;
                newState.chartConfig.xAxis[0].axisTick.interval = 0;
                newState.chartSeries = action.columns;
            } else {
                newState.chartSeries = [];
            }

            // Fill with 0s

            for (const element of newState.chartSeries) {
                if (element.data.length > largest) largest = element.data.length;
            }

            for (const element of newState.chartSeries) {
                for (let i = element.data.length; i <= largest; i++) {
                    element.data.push(0);
                }
            }

            newState.echarts.setOption({ ...newState.chartConfig, series: action.columns }, true);
            newState.error = action.error;

            return newState;
        case actions.SET_DATA_RANGE:
            return {
                ...state,
                dataRange: action.dataRange,
                error: action.error
            };
        case actions.TOGGLE_INVERT_DATA:
            // TODO: Memoize
            for (const element of newState.chartSeries) {
                element.data.reverse();
            }

            newState.chartConfig.xAxis[0].data.reverse();
            newState.echarts.setOption({ ...newState.chartConfig }, true);
            newState.error = action.error;

            return newState;
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
            newState.chartConfig.xAxis[0].show = !newState.chartConfig.xAxis[0].show;
            newState.error = action.error;

            return newState;
        case actions.TOGGLE_X_AXIS_GRID:
            newState.chartConfig.xAxis[0].splitLine.show = !newState.chartConfig.xAxis[0].splitLine.show;
            newState.error = action.error;

            return newState;
        case actions.TOGGLE_X_AXIS_AREA:
            newState.chartConfig.xAxis[0].splitArea.show = !newState.chartConfig.xAxis[0].splitArea.show;
            newState.error = action.error;

            return newState;
        case actions.TOGGLE_Y_AXIS:
            newState.chartConfig.yAxis[0].show = !newState.chartConfig.yAxis[0].show;
            newState.error = action.error;

            return newState;
        case actions.TOGGLE_Y_AXIS_GRID:
            newState.chartConfig.yAxis[0].splitLine.show = !newState.chartConfig.yAxis[0].splitLine.show;
            newState.error = action.error;

            return newState;
        case actions.TOGGLE_Y_AXIS_AREA:
            newState.chartConfig.yAxis[0].splitArea.show = !newState.chartConfig.yAxis[0].splitArea.show;
            newState.error = action.error;

            return newState;
        default:
            return state;
    }
}