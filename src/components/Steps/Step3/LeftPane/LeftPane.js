import {Col, Collapse, Input, Row, Select, Slider, Switch, Tabs, Tree} from 'antd';
import React, {Component, PropTypes} from 'react';

import ChartButton from '../ChartButton/ChartButton';
import {autobind} from 'core-decorators';

const Panel = Collapse.Panel;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;

export default class LeftPane extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        data: PropTypes.array.isRequired
    }

    @autobind
    getChartSubtypes() {
        return Object.values(this.props.store.chartType.subtypes).map((element, i) => {
            return (
                <Option
                  value={element.value}
                  key={`${this.props.store.chartType.name}-${element.name}`}>
                    {element.name}
                </Option>
            );
        });
    }

    @autobind
    getValueAxisOptions() {
        return this.props.store.valueAxisOptions.map((element, i) => {
            return (
                <Option value={element.value} key={`valueAxis-${element.value}`}>
                    {element.name}
                </Option>
            );
        });
    }

    @autobind
    getTreeNodes() {
        const nodes = [];
        let j = 0;

        this.props.data.forEach((element, i) => {
            const children = [];

            for (const prop in element) {
                if (element.hasOwnProperty(prop)) {
                    children.push(<TreeNode title={prop} key={`${i}-${j}`} />);
                    j++;
                }
            }

            nodes.push(
                <TreeNode title={`Dataset ${i}`} key={`D${i}`}>{children}</TreeNode>
            );
        }, this);

        return nodes;
    }

    @autobind
    setChartTitle(event) {
        this.props.actions.setChartTitle(event.target.value);
    }

    @autobind
    getCustomConfig(customType = null, customSubtype = null, series = false) {
        const type = customType || this.props.store.chartType;
        const subtype = customSubtype || this.props.store.chartSubtype;
        const subtypeObject = type.subtypes[subtype];
        let customConfig;

        if (series) {
            customConfig = { ...subtypeObject.seriesConfig };
        } else {
            customConfig = {
                ...type.config,
                ...subtypeObject.config
            };
        }

        return customConfig;
    }

    @autobind
    getCustomSeries(customType = null, customSubtype = null) {
        const result = [];

        for (const serie of this.props.store.chartSeries) {
            const newSerie = this.getCustomConfig(customType, customSubtype, true);

            newSerie.name = serie.name;
            newSerie.data = serie.data;

            result.push(newSerie);
        }

        return result;
    }

    @autobind
    setChartType(type, subtype) {
        const series = this.getCustomSeries(type, subtype);
        const config = this.getCustomConfig(type, subtype);

        this.props.actions.setChartType(type, subtype, series, config);
    }

    @autobind
    setColumns(columns) {
        const counts = {};
        const series = [];
        const set = [];
        const filteredColumns = columns
            .filter((element) => {
                return element.indexOf('-') >= 0;
            })
            .map((element) => {
                const column = element.split('-')[1];

                return column;
            });

        let categoryAxisData = [];

        for (const row of this.props.data) {
            for (const column of filteredColumns) {
                counts[column] = counts[column] || {};

                if (set.indexOf(row[column]) >= 0) {
                    counts[column][row[column]]++;
                } else {
                    counts[column][row[column]] = 1;
                    set.push(row[column]);
                }
            }
        }

        if (this.props.store.valueAxis.value === 'count') {
            for (const column of filteredColumns) {
                const values = Object.values(counts[column]);
                categoryAxisData = Object.keys(counts[column]);

                series.push({
                    name: column,
                    ...this.getCustomConfig(this.props.store.chartType, this.props.store.chartSubtype, true),
                    data: values
                });
            }
        } else if (this.props.store.valueAxis.value === 'percent') { // TODO: Implement
            const totals = {};

            for (const column of filteredColumns) {
                totals[column] = counts[column].reduce((a, b) => a + b, 0);

                const values = Object.values(counts[column]);
                categoryAxisData = Object.keys(counts[column]);

                series.push({
                    name: column,
                    ...this.getCustomConfig(this.props.store.chartType, this.props.store.chartSubtype, true),
                    data: values
                });
            }
        }

        this.props.actions.setColumns(series, categoryAxisData);
    }

    @autobind
    curry(firstArgument, fn) {
        return (secondArgument, ...moreArgs) => {
            return fn.apply(this, [firstArgument, secondArgument, ...moreArgs]);
        };
    }

    @autobind
    fillData() {
        let filled = false;

        for (const element of this.props.store.chartSeries) {
            if (element[element.length - 1] === 0) {
                filled = true;
                break;
            }
        }

        if (filled) {
            for (const element of this.props.store.chartSeries) {
                while (element[element.length - 1] === 0) {
                    element.pop();
                }
            }
        } else {
            this.props.actions.toggleFillData();
        }
    }

    render() {
        const style = require('./LeftPane.scss');

        return (
            <div id="left-pane">
                <Tabs defaultActiveKey={this.props.store.defaultTab}>
                    <TabPane tab="Gráfico" key="tab1" className="tab1">
                        <div id="chart-types">
                            <Row>
                                <Col span="6">
                                    <ChartButton
                                      label="Líneas"
                                      iconClass="fi flaticon-business-stats"
                                      chartType={this.props.store.chartTypes.line}
                                      activeType={this.props.store.chartType}
                                      setChartType={this.setChartType} />
                                </Col>
                                <Col span="6">
                                    <ChartButton
                                      label="Barras"
                                      iconClass="fi flaticon-business-bars-graphic"
                                      chartType={this.props.store.chartTypes.bar}
                                      activeType={this.props.store.chartType}
                                      setChartType={this.setChartType} />
                                </Col>
                                <Col span="6">
                                    <ChartButton
                                      label="Torta"
                                      iconClass="fi flaticon-pie-chart-stats"
                                      chartType={this.props.store.chartTypes.pie}
                                      activeType={this.props.store.chartType}
                                      setChartType={this.setChartType} />
                                </Col>
                                <Col span="6">
                                    <ChartButton
                                      label="Dispersión"
                                      iconClass="fi flaticon-dots-graphic"
                                      chartType={this.props.store.chartTypes.scatter}
                                      activeType={this.props.store.chartType}
                                      setChartType={this.setChartType} />
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <ChartButton
                                      label="Radar"
                                      iconClass="fi flaticon-radar-chart"
                                      chartType={this.props.store.chartTypes.radar}
                                      activeType={this.props.store.chartType}
                                      setChartType={this.setChartType} />
                                </Col>
                                <Col span="6">
                                    <ChartButton
                                      label="Cuerdas"
                                      iconClass="fi flaticon-circle-with-irregular-grid-lines"
                                      chartType={this.props.store.chartTypes.chord}
                                      activeType={this.props.store.chartType}
                                      setChartType={this.setChartType} />
                                </Col>
                                <Col span="6">
                                    <ChartButton
                                      label="Grafos"
                                      iconClass="fi flaticon-chemical-diagram"
                                      chartType={this.props.store.chartTypes.force}
                                      activeType={this.props.store.chartType}
                                      setChartType={this.setChartType} />
                                </Col>
                                <Col span="6">
                                    <ChartButton label="Mixto"
                                      iconClass="fi flaticon-bar-dotted-stats"
                                      chartType={this.props.store.chartTypes.mixed}
                                      activeType={this.props.store.chartType}
                                      setChartType={this.setChartType} />
                                </Col>
                            </Row>
                        </div>
                        <Row className="data-paneless-control">
                            <Col>
                                <span className="data-control-label" id="subtype">Tipo</span>
                                <Select
                                  className="data-control-select"
                                  defaultValue={this.props.store.chartType.subtypes.basic.name}
                                  onSelect={this.curry(this.props.store.chartType, this.setChartType)}>
                                    { this.getChartSubtypes() }
                                </Select>
                            </Col>
                        </Row>
                        <Collapse defaultActiveKey={['columnas', 'datos']}>
                            <Panel header="Columnas" key="columnas">
                                <div className="data-panel-control">
                                    <span className="data-control-label">Valor</span>
                                    <Select
                                      className="data-control-select"
                                      defaultValue={this.props.store.valueAxisOptions[0].name}
                                      onSelect={this.props.actions.setValueAxis}>
                                        { this.getValueAxisOptions() }
                                    </Select>
                                </div>
                                <div className="data-panel-control">
                                    <span className="data-control-label">Categoría</span>
                                    <Select
                                      className="data-control-select"
                                      defaultValue={this.props.store.valueAxisOptions[0].name}
                                      onSelect={this.props.actions.setValueAxis}>
                                        { console.log() }
                                    </Select>
                                </div>
                                <Tree
                                  className="dataset-tree"
                                  showLine
                                  checkable
                                  defaultExpandAll
                                  autoExpandParent
                                  onCheck={this.setColumns}
                                  defaultCheckedKeys={['0-firstName', '0-lastName', '0-state']} >
                                    <TreeNode title="Dataset 1" key="D0">
                                        <TreeNode title="firstName" key="0-firstName" />
                                        <TreeNode title="lastName" key="0-lastName" />
                                        <TreeNode title="state" key="0-state" />
                                    </TreeNode>
                                </Tree>
                            </Panel>
                            <Panel header="Datos" key="datos">
                                <div className="data-control-element">
                                    <Slider
                                      range
                                      defaultValue={[10, 70]}
                                      onChange={this.props.actions.setRange} />
                                </div>
                                <div className="data-panel-control">
                                    <span className="data-control-label">Invertir</span>
                                    <Switch
                                      defaultChecked={this.props.store.invertData}
                                      onChange={this.props.actions.toggleInvertData} />
                                </div>
                                <div className="data-panel-control">
                                    <span className="data-control-label">Transponer</span>
                                    <Switch
                                      defaultChecked={this.props.store.transposeData}
                                      onChange={this.props.actions.toggleTransposeData} />
                                </div>
                            </Panel>
                        </Collapse>
                    </TabPane>
                    <TabPane tab="Presentación" key="tab2" className="tab2">
                        <Row className="data-paneless-control">
                            <Col>
                                <span className="data-control-label">Título</span>
                                <Input
                                  className="data-control-input"
                                  value={this.props.store.chartConfig.title.text}
                                  onChange={this.setChartTitle} />
                            </Col>
                        </Row>
                        <Collapse defaultActiveKey={['xAxis', 'yAxis']}>
                            <Panel header="Eje X" key="xAxis">
                                <div className="data-panel-control">
                                    <span className="data-control-label">Eje</span>
                                    <Switch
                                      checked={this.props.store.chartConfig.xAxis[0].show}
                                      onChange={this.props.actions.toggleXAxis} />
                                </div>
                                <div className="data-panel-control">
                                    <span className="data-control-label">Grilla</span>
                                    <Switch
                                      checked={this.props.store.chartConfig.xAxis[0].splitLine.show}
                                      onChange={this.props.actions.toggleXAxisGrid} />
                                </div>
                                <div className="data-panel-control">
                                    <span className="data-control-label">Área</span>
                                    <Switch
                                      checked={this.props.store.chartConfig.xAxis[0].splitArea.show}
                                      onChange={this.props.actions.toggleXAxisArea} />
                                </div>
                            </Panel>
                            <Panel header="Eje Y" key="yAxis">
                                <div className="data-panel-control">
                                    <span className="data-control-label">Eje</span>
                                    <Switch
                                      checked={this.props.store.chartConfig.yAxis[0].show}
                                      onChange={this.props.actions.toggleYAxis} />
                                </div>
                                <div className="data-panel-control">
                                    <span className="data-control-label">Grilla</span>
                                    <Switch
                                      checked={this.props.store.chartConfig.yAxis[0].splitLine.show}
                                      onChange={this.props.actions.toggleYAxisGrid} />
                                </div>
                                <div className="data-panel-control">
                                    <span className="data-control-label">Área</span>
                                    <Switch
                                      checked={this.props.store.chartConfig.yAxis[0].splitArea.show}
                                      onChange={this.props.actions.toggleYAxisArea} />
                                </div>
                            </Panel>
                        </Collapse>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
