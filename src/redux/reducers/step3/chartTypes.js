const hideAxis = {
    xAxis: [
        {
            show: false,
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
            show: false,
            splitLine: {
                show: false
            },
            splitArea: {
                show: false
            }
        }
    ]
};

const showAxis = {
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
    ]
};

const chartTypes = {
    line: {
        name: 'Líneas',
        value: 'line',
        config: {
            ...showAxis
        },
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
        },
        controls: {
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
            ...showAxis
        },
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
        },
        controls: {
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
            ...hideAxis
        },
        subtypes: {
            basic: {
                name: 'Básico',
                value: 'basic',
                config: {},
                seriesConfig: {
                    type: 'pie',
                    legendHoverLink: false
                }
            },
            doughnut: {
                name: 'Dona',
                value: 'doughnut',
                config: {},
                seriesConfig: {
                    type: 'pie',
                    legendHoverLink: false,
                    radius: ['25%', '75%']
                }
            },
            compound: {
                name: 'Compuesto',
                value: 'compound',
                config: {},
                seriesConfig: {
                    type: 'pie',
                    legendHoverLink: false
                }
            }
        },
        controls: {
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
            ...showAxis
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
                    polarIndex: 1
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
            ...hideAxis
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
            ...hideAxis
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
            ...showAxis
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

export default chartTypes;