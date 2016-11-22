import {Col, Collapse, Input, Row, Select, Slider, Switch, Tabs, Tree} from 'antd';
import React, {PropTypes, PureComponent} from 'react';

import ChartButton from '../ChartButton/ChartButton';
import {autobind} from 'core-decorators';

const Panel = Collapse.Panel;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;

export default class LeftPane extends PureComponent {
    static propTypes = {
        store: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        data: PropTypes.array.isRequired
    }

    @autobind
    getChartSubtypes() {
        return this.props.store.chartType.subtypes.map((element, i) => {
            return (
                <Option value={i.toString()} key={`${this.props.store.chartType.name}-${element.name}`}>
                    {element.name}
                </Option>
            );
        });
    }

    @autobind
    getValueAxisOptions() {
        return this.props.store.valueAxis.map((element, i) => {
            return (
                <Option value={element.key} key={`valueAxis-${element.key}`}>
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
    getTypeSpecificConfig(values) {
        return {
            type: 'line',
            // stack: '456',
            areaStyle: { normal: {} }
        };
    }

    @autobind
    setColumns(columns) {
        const series = [];

        for (const column of columns) {
            if (column.indexOf('-') >= 0) {
                const values = [];
                const columnName = column.split('-')[1];

                for (const row of this.props.data) {
                    if (row[columnName] && values.indexOf(row[columnName]) === -1) {
                        values.push(row[columnName]);
                    }
                }

                series.push({
                    name: columnName,
                    ...this.getTypeSpecificConfig(values),
                    data: values
                });
            }
        }

        console.dir(series);

        this.props.actions.setColumns(series);
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
                                      setChartType={this.props.actions.setChartType} />
                                </Col>
                                <Col span="6">
                                    <ChartButton
                                      label="Barras"
                                      iconClass="fi flaticon-business-bars-graphic"
                                      chartType={this.props.store.chartTypes.bar}
                                      activeType={this.props.store.chartType}
                                      setChartType={this.props.actions.setChartType} />
                                </Col>
                                <Col span="6">
                                    <ChartButton
                                      label="Torta"
                                      iconClass="fi flaticon-pie-chart-stats"
                                      chartType={this.props.store.chartTypes.pie}
                                      activeType={this.props.store.chartType}
                                      setChartType={this.props.actions.setChartType} />
                                </Col>
                                <Col span="6">
                                    <ChartButton
                                      label="Dispersión"
                                      iconClass="fi flaticon-dots-graphic"
                                      chartType={this.props.store.chartTypes.scatter}
                                      activeType={this.props.store.chartType}
                                      setChartType={this.props.actions.setChartType} />
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <ChartButton
                                      label="Radar"
                                      iconClass="fi flaticon-radar-chart"
                                      chartType={this.props.store.chartTypes.radar}
                                      activeType={this.props.store.chartType}
                                      setChartType={this.props.actions.setChartType} />
                                </Col>
                                <Col span="6">
                                    <ChartButton
                                      label="Cuerdas"
                                      iconClass="fi flaticon-circle-with-irregular-grid-lines"
                                      chartType={this.props.store.chartTypes.chord}
                                      activeType={this.props.store.chartType}
                                      setChartType={this.props.actions.setChartType} />
                                </Col>
                                <Col span="6">
                                    <ChartButton
                                      label="Grafos"
                                      iconClass="fi flaticon-chemical-diagram"
                                      chartType={this.props.store.chartTypes.force}
                                      activeType={this.props.store.chartType}
                                      setChartType={this.props.actions.setChartType} />
                                </Col>
                                <Col span="6">
                                    <ChartButton label="Mixto"
                                      iconClass="fi flaticon-bar-dotted-stats"
                                      chartType={this.props.store.chartTypes.mixed}
                                      activeType={this.props.store.chartType}
                                      setChartType={this.props.actions.setChartType} />
                                </Col>
                            </Row>
                        </div>
                        <Row className="data-paneless-control">
                            <Col>
                                <span className="data-control-label" id="subtype">Tipo</span>
                                <Select
                                  className="data-control-select"
                                  defaultValue={this.props.store.chartType.subtypes[0].name}
                                  onSelect={this.props.actions.setChartSubtype}>
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
                                      defaultValue={this.props.store.valueAxis[0].name}
                                      onSelect={this.props.actions.setValueAxis}>
                                        { this.getValueAxisOptions() }
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
                                      defaultChecked={this.props.store.chartConfig.xAxis[0].show}
                                      onChange={this.props.actions.toggleXAxis} />
                                </div>
                                <div className="data-panel-control">
                                    <span className="data-control-label">Grilla</span>
                                    <Switch
                                      defaultChecked={this.props.store.chartConfig.xAxis[0].splitLine.show}
                                      onChange={this.props.actions.toggleXAxisGrid} />
                                </div>
                                <div className="data-panel-control">
                                    <span className="data-control-label">Área</span>
                                    <Switch
                                      defaultChecked={this.props.store.chartConfig.xAxis[0].splitArea.show}
                                      onChange={this.props.actions.toggleXAxisArea} />
                                </div>
                            </Panel>
                            <Panel header="Eje Y" key="yAxis">
                                <div className="data-panel-control">
                                    <span className="data-control-label">Eje</span>
                                    <Switch
                                      defaultChecked={this.props.store.chartConfig.yAxis[0].show}
                                      onChange={this.props.actions.toggleYAxis} />
                                </div>
                                <div className="data-panel-control">
                                    <span className="data-control-label">Grilla</span>
                                    <Switch
                                      defaultChecked={this.props.store.chartConfig.yAxis[0].splitLine.show}
                                      onChange={this.props.actions.toggleYAxisGrid} />
                                </div>
                                <div className="data-panel-control">
                                    <span className="data-control-label">Área</span>
                                    <Switch
                                      defaultChecked={this.props.store.chartConfig.yAxis[0].splitArea.show}
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
