import * as actions from '../actions/step3/definitions';

const chartTypes = {
    line: {
        name: 'Líneas',
        value: 'line',
        config: {},
        subtypes: {
            basic: {
                name: 'Básico',
                value: 'basic',
                config: {},
                seriesConfig: {
                    type: 'line'
                }
            },
            area: {
                name: 'Área',
                value: 'area',
                config: {},
                seriesConfig: {
                    type: 'line',
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' } } }
                }
            }
        }
    },
    bar: {
        name: 'Barras',
        value: 'bar',
        config: {},
        subtypes: {
            basic: {
                name: 'Básico',
                value: 'basic',
                config: {},
                seriesConfig: {
                    type: 'bar'
                }
            },
            waterfall: {
                name: 'Cascada',
                value: 'waterfall',
                config: {},
                seriesConfig: {
                    type: 'bar'
                }
            },
            stackedBars: {
                name: 'Barras apiladas',
                value: 'stackedBars',
                config: {},
                seriesConfig: {
                    type: 'bar'
                }
            },
            splitBars: {
                name: 'Barras divididas',
                value: 'splitBars',
                config: {},
                seriesConfig: {
                    type: 'bar'
                }
            },
            crossedBars: {
                name: 'Barras cruzadas',
                value: 'crossedBars',
                config: {},
                seriesConfig: {
                    type: 'bar'
                }
            }
        }
    },
    scatter: {
        name: 'Dispersión',
        value: 'scatter',
        config: {
            type: 'scatter'
        },
        subtypes: {
            basic: {
                name: 'Básico',
                value: 'basic',
                config: {},
                seriesConfig: {
                    type: 'scatter'
                }
            },
            bubbles: {
                name: 'Burbujas',
                value: 'bubbles',
                config: {},
                seriesConfig: {
                    type: 'scatter'
                }
            },
            largeScale: {
                name: 'Gran escala',
                value: 'largeScale',
                config: {},
                seriesConfig: {
                    type: 'scatter'
                }
            }
        }
    },
    pie: {
        name: 'Torta',
        value: 'pie',
        config: {
            type: 'pie'
        },
        subtypes: {
            basic: {
                name: 'Básico',
                value: 'basic',
                config: {},
                seriesConfig: {
                    type: 'pie'
                }
            },
            doughnut: {
                name: 'Dona',
                value: 'doughnut',
                config: {},
                seriesConfig: {
                    type: 'pie'
                }
            },
            compound: {
                name: 'Compuesto',
                value: 'compound',
                config: {},
                seriesConfig: {
                    type: 'pie'
                }
            }
        }
    },
    radar: {
        name: 'Radar',
        value: 'radar',
        config: {
            type: 'radar'
        },
        subtypes: {
            basic: {
                name: 'Básico',
                value: 'basic',
                config: {

                },
                seriesConfig: {
                    type: 'radar'
                }
            },
            filled: {
                name: 'Relleno',
                value: 'filled',
                config: {

                },
                seriesConfig: {
                    type: 'radar'
                }
            }
        }
    },
    chord: {
        name: 'Cuerdas',
        value: 'chord',
        config: {
            type: 'chord'
        },
        subtypes: {
            basic: {
                name: 'Básico',
                value: 'basic',
                config: {

                },
                seriesConfig: {
                    type: 'chord'
                }
            },
            alternative: {
                name: 'Alternativo',
                value: 'alternative',
                config: {

                },
                seriesConfig: {
                    type: 'chord'
                }
            }
        }
    },
    force: {
        name: 'Grafos',
        value: 'force',
        config: {
            type: 'force'
        },
        subtypes: {
            basic: {
                name: 'Básico',
                value: 'basic',
                config: {

                },
                seriesConfig: {
                    type: 'force'
                }
            },
            tree: {
                name: 'Árbol',
                value: 'tree',
                config: {

                },
                seriesConfig: {
                    type: 'force'
                }
            }
        }
    },
    mixed: {
        name: 'Combinados',
        value: 'combined',
        config: {
            type: 'line'
        },
        subtypes: {
            linePlusBars: {
                name: 'Líneas + barras',
                value: 'linePlusBars',
                config: {

                },
                seriesConfig: {
                    type: 'line'
                }
            },
            linePlusScatter: {
                name: 'Líneas + dispersión',
                value: 'linePlusScatter',
                config: {

                },
                seriesConfig: {
                    type: 'line'
                }
            }
        }
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
                interval: 0
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
        data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
        name: 'Serie 2',
        type: 'line',
        data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
        name: 'Serie 3',
        type: 'line',
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
    chartSubtype: chartTypes.line.subtypes.basic.value,
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
        case actions.SET_CHART_SUBTYPE:
            newState.chartConfig = { ...newState.chartConfig, ...action.newConfig };
            newState.chartType = action.chartType || newState.chartType;
            newState.chartSubtype = action.chartSubtype || newState.chartSubtype;
            newState.chartSeries = action.newSeries;
            newState.echarts.setOption({ ...newState.chartConfig, series: action.newSeries }, true);
            newState.error = action.error;

            return newState;
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

            newState.echarts.setOption({ ...newState.chartConfig, series: newState.chartSeries }, true);
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
            newState.echarts.setOption({ ...newState.chartConfig, series: newState.chartSeries }, false);
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