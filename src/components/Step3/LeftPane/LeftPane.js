import {Col, Collapse, Input, Row, Select, Slider, Switch, Tabs, Tree} from 'antd';
import React, { Component } from 'react';

import FatButton from '../FatButton/FatButton';
import { autobind } from 'core-decorators';

const Panel = Collapse.Panel;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;

export default class LeftPane extends Component {
    @autobind
    onSelect(info) {
        console.log('selected', info);
    }

    @autobind
    onCheck(info) {
        console.log('onCheck', info);
    }

    render() {
        const styles = require('./LeftPane.scss');

        return (
            <div id="left-pane">
                <Tabs defaultActiveKey="tab1">
                    <TabPane tab="Gráfico" key="tab1" className="tab1">
                        <div id="chart-types">
                            <Row>
                                <Col span="6">
                                    <FatButton label="Líneas" iconClass="fi flaticon-business-stats" />
                                </Col>
                                <Col span="6">
                                    <FatButton label="Barras" iconClass="fi flaticon-business-bars-graphic" />
                                </Col>
                                <Col span="6">
                                    <FatButton label="Torta" iconClass="fi flaticon-pie-chart-stats" />
                                </Col>
                                <Col span="6">
                                    <FatButton label="Puntos" iconClass="fi flaticon-dots-graphic" />
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <FatButton label="Radar" iconClass="fi flaticon-radar-chart" />
                                </Col>
                                <Col span="6">
                                    <FatButton
                                      label="Cuerdas"
                                      iconClass="fi flaticon-circle-with-irregular-grid-lines" />
                                </Col>
                                <Col span="6">
                                    <FatButton label="Grafos" iconClass="fi flaticon-chemical-diagram" />
                                </Col>
                                <Col span="6">
                                    <FatButton label="Mixto" iconClass="fi flaticon-bar-dotted-stats" />
                                </Col>
                            </Row>
                        </div>
                        <Row className="data-paneless-control">
                            <Col>
                                <span className="data-control-label" id="subtype">Subtipo</span>
                                <Select
                                  className="data-control-select"
                                  defaultValue="subtipo1"
                                  placeholder="Subtipo">
                                    <Option value="subtipo1" key="subtipo1">Subtipo 1</Option>
                                    <Option value="subtipo2" key="subtipo2">Subtipo 2</Option>
                                    <Option value="subtipo3" key="subtipo3">Subtipo 3</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Collapse defaultActiveKey={['columnas', 'datos']}>
                            <Panel header="Columnas" key="columnas">
                                <Tree
                                  className="dataset-tree"
                                  showLine
                                  checkable
                                  defaultExpandAll
                                  autoExpandParent
                                  defaultCheckedKeys={['0-0-0', '0-0-1']}
                                  onSelect={this.onSelect} onCheck={this.onCheck}>
                                    <TreeNode title="Dataset 1" key="0-0">
                                        <TreeNode title="Columna 1" key="0-0-0" />
                                        <TreeNode title="Columna 2" key="0-0-1" />
                                        <TreeNode title="Columna 3" key="0-0-2" />
                                    </TreeNode>
                                    <TreeNode title="Dataset 2" key="1-0">
                                        <TreeNode title="Columna 1" key="1-0-0" />
                                        <TreeNode title="Columna 2" key="1-0-1" />
                                    </TreeNode>
                                    <TreeNode title="Dataset 3" key="2-0">
                                        <TreeNode title="Columna 1" key="2-0-0" />
                                    </TreeNode>
                                </Tree>
                            </Panel>
                            <Panel header="Datos" key="datos">
                                <div className="data-control-element">
                                    <Slider range defaultValue={[10, 70]} />
                                </div>
                                <div className="data-panel-control">
                                    <span className="data-control-label">Invertir</span>
                                    <Switch defaultChecked={false} />
                                </div>
                                <div className="data-panel-control">
                                    <span className="data-control-label">Transponer</span>
                                    <Switch defaultChecked={false} />
                                </div>
                            </Panel>
                        </Collapse>
                    </TabPane>
                    <TabPane tab="Presentación" key="tab2" className="tab2">
                        <Row className="data-paneless-control">
                            <Col>
                                <span className="data-control-label">Título</span>
                                <Input className="data-control-input" />
                            </Col>
                        </Row>
                        <Collapse defaultActiveKey={['ejeX', 'ejeY']}>
                            <Panel header="Eje X" key="ejeX">
                                <div className="data-panel-control">
                                    <span className="data-control-label">Eje</span>
                                    <Switch defaultChecked />
                                </div>
                                <div className="data-panel-control">
                                    <span className="data-control-label">Etiquetas</span>
                                    <Switch defaultChecked />
                                </div>
                                <div className="data-panel-control">
                                    <span className="data-control-label">Grilla</span>
                                    <Switch defaultChecked={false} />
                                </div>
                            </Panel>
                            <Panel header="Eje Y" key="ejeY">
                                <div className="data-panel-control">
                                    <span className="data-control-label">Eje</span>
                                    <Switch defaultChecked />
                                </div>
                                <div className="data-panel-control">
                                    <span className="data-control-label">Etiquetas</span>
                                    <Switch defaultChecked />
                                </div>
                                <div className="data-panel-control">
                                    <span className="data-control-label">Grilla</span>
                                    <Switch defaultChecked />
                                </div>
                            </Panel>
                        </Collapse>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
