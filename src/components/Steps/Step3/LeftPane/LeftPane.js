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
    getControl(control, flag) {
        if (flag) return control;
    }

    @autobind
    getChartButton(type, label, className) {
        return (
            <Col span="6">
                <ChartButton
                  label={label}
                  iconClass={className}
                  chartType={this.props.store.chartTypes[type]}
                  activeType={this.props.store.chartType}
                  setChartType={this.setChartType} />
            </Col>
        );
    }

    @autobind
    getPanelessInput(label, value, onChange) {
        return (
            <Row className="data-paneless-control">
                <Col>
                    <span className="data-control-label">{label}</span>
                    <Input
                      className="data-control-input"
                      value={value}
                      onChange={onChange} />
                </Col>
            </Row>
        );
    }

    @autobind
    getPanelSwitch(label, checked, onChange) {
        return (
            <div className="data-panel-control">
                <span className="data-control-label">{label}</span>
                <Switch
                  checked={checked}
                  onChange={onChange} />
            </div>
        );
    }

    @autobind
    getSelectOptions(values, key) {
        return values.map((element, i) => {
            return (
                <Option value={element.value} key={`${key}-${element.value}`}>
                    {element.name}
                </Option>
            );
        });
    }

    @autobind
    getDataSelectOptions() {
        return this.props.data.map((element, i) => {
            return (
                <Option value={element.value} key={`valueAxis-${element.value}`}>
                    {element.name}
                </Option>
            );
        });
    }

    @autobind
    getTreeNodes() {
        let j = 0;

        this.props.data.map((element, i) => {
            const children = [];

            for (const prop in element) {
                if (element.hasOwnProperty(prop)) {
                    children.push(<TreeNode title={prop} key={`${i}-${j}`} />);
                    j++;
                }
            }

            return (
                <TreeNode title={`Dataset ${i}`} key={`D${i}`}>{children}</TreeNode>
            );
        }, this);
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

    render() {
        const style = require('./LeftPane.scss');
        const controls = {
            xAxis: (
                <div className="data-panel-control">
                    <span className="data-control-label">Etiquetas</span>
                    <Select
                      className="data-control-select"
                      defaultValue={this.props.store.valueAxisOptions[0].name}
                      onSelect={this.props.actions.setValueAxis}>
                        { console.log() }
                    </Select>
                </div>
            ),
            yAxis: (
                <div className="data-panel-control">
                    <span className="data-control-label">Valores</span>
                    <Select
                      className="data-control-select"
                      defaultValue={this.props.store.valueAxisOptions[0].name}
                      onSelect={this.props.actions.setValueAxis}>
                        { this.getSelectOptions(this.props.store.valueAxisOptions, 'valueAxis') }
                    </Select>
                </div>
            ),
            data: ( // TODO: Deselect all columns but one
                <div className="data-panel-control">
                    <span className="data-control-label">Datos</span>
                    <Select
                      className="data-control-select"
                      defaultValue={this.props.store.valueAxisOptions[0].name}
                      onSelect={this.props.actions.setValueAxis}>
                        { console.log() }
                    </Select>
                </div>
            ),
            tree: (
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
            ),
            range: (
                <div className="data-control-element">
                    <Slider
                      range
                      defaultValue={[10, 70]}
                      onChange={this.props.actions.setRange} />
                </div>
            ),
            invert: this.getPanelSwitch('Invertir', this.props.store.invertData, this.props.actions.toggleInvertData),
            transpose: this.getPanelSwitch('Transponer', this.props.store.transposeData,
                this.props.actions.toggleTransposeData)
        };

        return (
            <div id="left-pane">
                <Tabs defaultActiveKey={this.props.store.defaultTab}>
                    <TabPane tab="Gráfico" key="tab1" className="tab1">
                        <div id="chart-types">
                            <Row>
                                { this.getChartButton('line', 'Líneas', 'fi flaticon-business-stats') }
                                { this.getChartButton('bar', 'Barras', 'fi flaticon-business-bars-graphic') }
                                { this.getChartButton('pie', 'Torta', 'fi flaticon-pie-chart-stats') }
                                { this.getChartButton('scatter', 'Dispersión', 'fi flaticon-dots-graphic') }
                            </Row>
                            <Row>
                                { this.getChartButton('radar', 'Radar', 'fi flaticon-radar-chart') }
                                { this.getChartButton('chord', 'Cuerdas',
                                    'fi flaticon-circle-with-irregular-grid-lines') }
                                { this.getChartButton('force', 'Grafos', 'fi flaticon-chemical-diagram') }
                                { this.getChartButton('mixed', 'Mixto', 'fi flaticon-bar-dotted-stats') }
                            </Row>
                        </div>
                        <Row className="data-paneless-control">
                            <Col>
                                <span className="data-control-label" id="subtype">Tipo</span>
                                <Select
                                  className="data-control-select"
                                  defaultValue={this.props.store.chartType.subtypes.basic.name}
                                  onSelect={this.curry(this.props.store.chartType, this.setChartType)}>
                                    {this.getSelectOptions(Object.values(this.props.store.chartType.subtypes),
                                        this.props.store.chartType.name)}
                                </Select>
                            </Col>
                        </Row>
                        <Collapse defaultActiveKey={['columnPanel', 'dataPanel']}>
                            <Panel header="Columnas" key="columnPanel">
                                {this.getControl(controls.xAxis, this.props.store.chartType.controls.columnPanel.xAxis)}
                                {this.getControl(controls.yAxis, this.props.store.chartType.controls.columnPanel.yAxis)}
                                {this.getControl(controls.data, this.props.store.chartType.controls.columnPanel.data)}
                                {this.getControl(controls.tree, this.props.store.chartType.controls.columnPanel.tree)}
                            </Panel>
                            <Panel header="Datos" key="dataPanel">
                                {this.getControl(controls.range, this.props.store.chartType.controls.dataPanel.range)}
                                {this.getControl(controls.invert, this.props.store.chartType.controls.dataPanel.invert)}
                                {this.getControl(controls.transpose,
                                    this.props.store.chartType.controls.dataPanel.transpose)}
                            </Panel>
                        </Collapse>
                    </TabPane>
                    <TabPane tab="Presentación" key="tab2" className="tab2">
                        {this.getPanelessInput('Título', this.props.store.chartConfig.title.text, this.setChartTitle)}
                        <Collapse defaultActiveKey={['xAxis', 'yAxis']}>
                            <Panel header="Eje X" key="xAxis">
                                {this.getPanelSwitch('Eje', this.props.store.chartConfig.xAxis[0].show,
                                    this.props.actions.toggleXAxis)}
                                {this.getPanelSwitch('Grilla', this.props.store.chartConfig.xAxis[0].splitLine.show,
                                    this.props.actions.toggleXAxisGrid)}
                                {this.getPanelSwitch('Área', this.props.store.chartConfig.xAxis[0].splitArea.show,
                                    this.props.actions.toggleXAxisArea)}
                            </Panel>
                            <Panel header="Eje Y" key="yAxis">
                                {this.getPanelSwitch('Eje', this.props.store.chartConfig.yAxis[0].show,
                                    this.props.actions.toggleYAxis)}
                                {this.getPanelSwitch('Grilla', this.props.store.chartConfig.yAxis[0].splitLine.show,
                                    this.props.actions.toggleYAxisGrid)}
                                {this.getPanelSwitch('Área', this.props.store.chartConfig.yAxis[0].splitArea.show,
                                    this.props.actions.toggleYAxisArea)}
                            </Panel>
                        </Collapse>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
