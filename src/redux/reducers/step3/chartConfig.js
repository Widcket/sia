export const chartConfig = {
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
            stack: 'Serie 1',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: 'Serie 2',
            type: 'bar',
            stack: 'Serie 1',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: 'Serie 3',
            type: 'bar',
            stack: 'Serie 1',
            data: [150, 232, 201, 154, 190, 330, 410]
        }
    ],
    pie: [
        {
            name: 'Serie 1',
            type: 'pie',
            stack: 'a',
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
    ]
};