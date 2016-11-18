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
    node: {
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
const initialState = {
    defaultTab: 'tab1',
    chartTypes,
    chartType: chartTypes.line,
    chartSubtype: 0,
    invertData: false,
    transposeData: false,
    chartTitle: '',
    xAxis: true,
    xAxisLabels: true,
    xAxisGrid: true,
    yAxis: true,
    yAxisLabels: true,
    yAxisGrid: true
};

export default function step3(state = initialState, action = {}) {
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
            return {
                ...state,
                chartTitle: action.chartTitle,
                error: action.error
            };
        case actions.TOGGLE_X_AXIS:
            return {
                ...state,
                xAxis: !state.xAxis,
                error: action.error
            };
        case actions.TOGGLE_X_AXIS_LABELS:
            return {
                ...state,
                xAxisLabels: !state.xAxisLabels,
                error: action.error
            };
        case actions.TOGGLE_X_AXIS_GRID:
            return {
                ...state,
                xAxisGrid: !state.xAxisGrid,
                error: action.error
            };
        case actions.TOGGLE_Y_AXIS:
            return {
                ...state,
                yAxis: !state.yAxis,
                error: action.error
            };
        case actions.TOGGLE_Y_AXIS_LABELS:
            return {
                ...state,
                yAxisLabels: !state.yAxisLabels,
                error: action.error
            };
        case actions.TOGGLE_Y_AXIS_GRID:
            return {
                ...state,
                yAxisGrid: !state.yAxisGrid,
                error: action.error
            };
        default:
            return state;
    }
}