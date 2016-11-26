export const chartConfig = {
    title: {
        text: 'Gráfico 1'
    },
    tooltip: {
        trigger: 'axis',
        showDelay: 0
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
        bottom: '0.5%',
        containLabel: true
    }
};

export const chartSeries = {
    line: [
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
    ],
    bar: [
        {
            name: 'Serie 1',
            type: 'bar',
            stack: 'a',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: 'Serie 2',
            type: 'bar',
            stack: 'a',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: 'Serie 3',
            type: 'bar',
            stack: 'b',
            data: [150, 232, 201, 154, 190, 330, 410]
        }
    ],
    pie: [
        {
            name: 'Serie 1',
            type: 'pie',
            data: [
                {
                    value: 123,
                    name: 'abc'
                },
                {
                    value: 456,
                    name: 'dfg'
                },
                {
                    value: 789,
                    name: 'hij'
                },
                {
                    value: 321,
                    name: 'klm'
                },
                {
                    value: 654,
                    name: 'nop'
                }
            ]
        }
    ],
    scatter: [
        {
            name: 'Serie 1',
            type: 'scatter',
            symbolSize: (value) => {
                Math.round(value[2] / 5);
            },
            data: [
                {
                    value: [12, 34, 56]
                },
                {
                    value: [78, 91, 23]
                },
                {
                    value: [45, 67, 89]
                },
                {
                    value: [21, 43, 65]
                },
                {
                    value: [87, 19, 32]
                },
                {
                    value: [54, 76, 98]
                }
            ]
        }
    ]
};