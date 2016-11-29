const hideAxis = {
    xAxis: [
        {
            type: 'value',
            show: false,
            boundaryGap: false,
            splitNumber: 4,
            scale: true,
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
            show: false,
            boundaryGap: false,
            splitNumber: 4,
            scale: true,
            splitLine: {
                show: false
            },
            splitArea: {
                show: false
            }
        }
    ]
};

const baseCartesian = {
    calculable: true,
    dataZoom: [
        {
            show: false,
            type: 'slider',
            xAxisIndex: [0]
        },
        {
            show: false,
            type: 'slider',
            yAxisIndex: [0]
        },
        {
            type: 'inside',
            xAxisIndex: [0]
        },
        {
            type: 'inside',
            yAxisIndex: [0]
        }
    ],
    xAxis: [
        {
            show: true,
            scale: true,
            // triggerEvent: false,
            // silent: true,
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
            show: true,
            scale: true,
            // triggerEvent: false,
            // silent: true,
            splitLine: {
                show: true
            },
            splitArea: {
                show: true
            }
        }
    ]
};

const axis = {
    line: {
        dataZoom: baseCartesian.dataZoom,
        calculable: baseCartesian.calculable,
        xAxis: [
            {
                ...baseCartesian.xAxis[0],
                type: 'category',
                boundaryGap: false,
                data: ['abc', 'def', 'ghi', 'jk', 'lm', 'no', 'pq']
            }
        ],
        yAxis: [
            {
                ...baseCartesian.yAxis[0],
                boundaryGap: false,
                type: 'value'
            }
        ]
    },
    bar: {
        dataZoom: baseCartesian.dataZoom,
        calculable: baseCartesian.calculable,
        xAxis: [
            {
                ...baseCartesian.xAxis[0],
                type: 'category',
                data: ['abc', 'def', 'ghi', 'jk', 'lm', 'no', 'pq']
            }
        ],
        yAxis: [
            {
                ...baseCartesian.yAxis[0],
                type: 'value'
            }
        ]
    },
    pie: {
        xAxis: [
            {
                type: 'category',
                show: false,
                boundaryGap: false,
                scale: true,
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                data: ['abc', 'def', 'ghi', 'jk', 'lm', 'no', 'pq']
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false,
                boundaryGap: false,
                scale: true,
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: false
                }
            }
        ]
    },
    scatter: {
        dataZoom: baseCartesian.dataZoom,
        calculable: baseCartesian.calculable,
        xAxis: [
            {
                ...baseCartesian.xAxis[0],
                boundaryGap: false,
                type: 'value'
            }
        ],
        yAxis: [
            {
                ...baseCartesian.yAxis[0],
                boundaryGap: false,
                type: 'value'
            }
        ]
    }
};

export const chartTypes = {
    line: {
        name: 'Líneas',
        value: 'line',
        config: {
            ...axis.line
        },
        subtypes: {
            basic: {
                name: 'Básico',
                value: 'basic',
                config: {},
                seriesConfig: {
                    type: 'line',
                    clickable: false
                }
            },
            area: {
                name: 'Área',
                value: 'area',
                config: {},
                seriesConfig: {
                    type: 'line',
                    clickable: false,
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' } } }
                }
            }
        },
        controls: {
            subtype: true,
            columnPanel: {
                xAxis: true,
                yAxis: true,
                data: false,
                tree: true
            },
            dataPanel: {
                range: true,
                invert: true,
                transpose: true
            }
        }
    },
    bar: {
        name: 'Barras',
        value: 'bar',
        config: {
            ...axis.bar
        },
        subtypes: {
            basic: {
                name: 'Básico',
                value: 'basic',
                config: {},
                seriesConfig: {
                    type: 'bar',
                    clickable: false
                }
            },
            waterfall: {
                name: 'Cascada',
                value: 'waterfall',
                config: {},
                seriesConfig: {
                    type: 'bar',
                    clickable: false
                }
            },
            stackedBars: {
                name: 'Barras apiladas',
                value: 'stackedBars',
                config: {},
                seriesConfig: {
                    type: 'bar',
                    clickable: false
                }
            },
            splitBars: {
                name: 'Barras divididas',
                value: 'splitBars',
                config: {},
                seriesConfig: {
                    type: 'bar',
                    clickable: false
                }
            },
            crossedBars: {
                name: 'Barras cruzadas',
                value: 'crossedBars',
                config: {},
                seriesConfig: {
                    type: 'bar',
                    clickable: false
                }
            }
        },
        controls: {
            subtype: true,
            columnPanel: {
                xAxis: true,
                yAxis: true,
                data: false,
                tree: true
            },
            dataPanel: {
                range: true,
                invert: true,
                transpose: true
            }
        }
    },
    pie: {
        name: 'Torta',
        value: 'pie',
        config: {
            ...axis.pie
        },
        subtypes: {
            basic: {
                name: 'Básico',
                value: 'basic',
                config: {},
                seriesConfig: {
                    type: 'pie',
                    clickable: false,
                    legendHoverLink: false
                }
            },
            doughnut: {
                name: 'Dona',
                value: 'doughnut',
                config: {},
                seriesConfig: {
                    type: 'pie',
                    clickable: false,
                    legendHoverLink: false,
                    radius: ['40%', '75%']
                }
            }
        },
        controls: {
            subtype: true,
            columnPanel: {
                xAxis: false,
                yAxis: true,
                data: true,
                tree: false
            },
            dataPanel: {
                range: false,
                invert: true,
                transpose: false
            }
        }
    },
    scatter: {
        name: 'Dispersión',
        value: 'scatter',
        config: {
            ...axis.scatter
        },
        subtypes: {
            basic: {
                name: 'Básico',
                value: 'basic',
                config: {},
                seriesConfig: {
                    type: 'scatter',
                    clickable: false
                }
            },
            bubbles: {
                name: 'Burbujas',
                value: 'bubbles',
                config: {},
                seriesConfig: {
                    type: 'scatter',
                    clickable: false
                }
            },
            largeScale: {
                name: 'Gran escala',
                value: 'largeScale',
                config: {},
                seriesConfig: {
                    type: 'scatter',
                    clickable: false
                }
            }
        },
        controls: {
            subtype: true,
            columnPanel: {
                xAxis: true,
                yAxis: true,
                data: false,
                tree: true
            },
            dataPanel: {
                range: true,
                invert: true,
                transpose: true
            }
        }
    },
    radar: {
        name: 'Radar',
        value: 'radar',
        config: {
            ...hideAxis
        },
        subtypes: {
            basic: {
                name: 'Básico',
                value: 'basic',
                config: {

                },
                seriesConfig: {
                    type: 'radar',
                    clickable: false,
                    polarIndex: 1
                }
            },
            filled: {
                name: 'Relleno',
                value: 'filled',
                config: {

                },
                seriesConfig: {
                    type: 'radar',
                    clickable: false
                }
            }
        },
        controls: {
            subtype: true,
            columnPanel: {
                xAxis: false,
                yAxis: true,
                data: true,
                tree: false
            },
            dataPanel: {
                range: false,
                invert: true,
                transpose: false
            }
        }
    },
    chord: {
        name: 'Cuerdas',
        value: 'chord',
        config: {
            ...hideAxis
        },
        subtypes: {
            basic: {
                name: 'Básico',
                value: 'basic',
                config: {

                },
                seriesConfig: {
                    type: 'chord',
                    clickable: false
                }
            },
            alternative: {
                name: 'Alternativo',
                value: 'alternative',
                config: {

                },
                seriesConfig: {
                    type: 'chord',
                    clickable: false
                }
            }
        },
        controls: {
            subtype: true,
            columnPanel: {
                xAxis: false,
                yAxis: true,
                data: true,
                tree: false
            },
            dataPanel: {
                range: false,
                invert: true,
                transpose: false
            }
        }
    },
    force: {
        name: 'Grafos',
        value: 'force',
        config: {
            ...hideAxis
        },
        subtypes: {
            basic: {
                name: 'Básico',
                value: 'basic',
                config: {

                },
                seriesConfig: {
                    type: 'force',
                    clickable: false
                }
            },
            tree: {
                name: 'Árbol',
                value: 'tree',
                config: {

                },
                seriesConfig: {
                    type: 'force',
                    clickable: false
                }
            }
        },
        controls: {
            subtype: true,
            columnPanel: {
                xAxis: false,
                yAxis: true,
                data: true,
                tree: false
            },
            dataPanel: {
                range: false,
                invert: true,
                transpose: false
            }
        }
    },
    mixed: {
        name: 'Combinados',
        value: 'combined',
        config: {
            ...axis.line
        },
        subtypes: {
            linePlusBars: {
                name: 'Líneas + barras',
                value: 'linePlusBars',
                config: {

                },
                seriesConfig: {
                    type: 'line',
                    clickable: false
                }
            },
            linePlusScatter: {
                name: 'Líneas + dispersión',
                value: 'linePlusScatter',
                config: {

                },
                seriesConfig: {
                    type: 'line',
                    clickable: false
                }
            }
        },
        controls: {
            subtype: true,
            columnPanel: {
                xAxis: true,
                yAxis: true,
                data: false,
                tree: true
            },
            dataPanel: {
                range: true,
                invert: true,
                transpose: true
            }
        }
    }
};

export const chartSubtype = {
    line: 'basic',
    bar: 'basic',
    pie: 'basic',
    scatter: 'basic',
    radar: 'basic',
    chord: 'basic',
    force: 'basic',
    mixed: 'basic'
};