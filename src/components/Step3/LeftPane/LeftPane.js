import {Col, Collapse, Input, Row, Select, Slider, Switch, Tabs, Tree} from 'antd';
import React, { Component } from 'react';

import {autobind} from 'core-decorators';

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
                                    <div className="type">
                                        <i className="fi flaticon-business-stats" />
                                        <span>Líneas</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                    <div className="type">
                                        <i className="fi flaticon-business-bars-graphic" />
                                        <span>Barras</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                    <div className="type">
                                        <i className="fi flaticon-pie-chart-stats" />
                                        <span>Torta</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                    <div className="type">
                                        <i className="fi flaticon-dots-graphic" />
                                        <span>Puntos</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <div className="type">
                                        <i className="fi flaticon-radar-chart" />
                                        <span>Radar</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                    <div className="type">
                                        <i className="fi flaticon-circle-with-irregular-grid-lines" />
                                        <span>Cuerdas</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                    <div className="type">
                                        <i className="fi flaticon-chemical-diagram" />
                                        <span>Nodos</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                    <div className="type">
                                        <i className="fi flaticon-bar-dotted-stats" />
                                        <span>Mixto</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Row className="data-paneless-control">
                            <Col>
                                <span className="data-control-label">Subtipo</span>
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
                        <Collapse defaultActiveKey={['datos']}>
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
