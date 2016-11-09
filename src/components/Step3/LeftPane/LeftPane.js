import {Col, Collapse, Row, Tabs, Tree} from 'antd';
import React, { Component } from 'react';

import {autobind} from 'core-decorators';

const Panel = Collapse.Panel;
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
            <Tabs defaultActiveKey="tab1">
                <TabPane tab="Gráfico" key="tab1">
                    <div id="chart-types">
                        <Row>
                            <Col span="6">
                                <div className="chart-type">
                                    <i className="fi flaticon-business-stats" />
                                    <span>Líneas</span>
                                </div>
                            </Col>
                            <Col span="6">
                                <div className="chart-type">
                                    <i className="fi flaticon-business-bars-graphic" />
                                    <span>Barras</span>
                                </div>
                            </Col>
                            <Col span="6">
                                <div className="chart-type">
                                    <i className="fi flaticon-pie-chart-stats" />
                                    <span>Torta</span>
                                </div>
                            </Col>
                            <Col span="6">
                                <div className="chart-type">
                                    <i className="fi flaticon-dots-graphic" />
                                    <span>Puntos</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="6">
                                <div className="chart-type">
                                    <i className="fi flaticon-radar-chart" />
                                    <span>Radar</span>
                                </div>
                            </Col>
                            <Col span="6">
                                <div className="chart-type">
                                    <i className="fi flaticon-circle-with-irregular-grid-lines" />
                                    <span>Cuerdas</span>
                                </div>
                            </Col>
                            <Col span="6">
                                <div className="chart-type">
                                    <i className="fi flaticon-centralized-structure" />
                                    <span>Nodos</span>
                                </div>
                            </Col>
                            <Col span="6">
                                <div className="chart-type">
                                    <i className="fi flaticon-big-and-small-dots" />
                                    <span>Mapa de calor</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Collapse defaultActiveKey={['columnas']}>
                        <Panel header="Columnas" key="columnas">
                            <Tree
                              className="dataset-tree"
                              showLine
                              checkable
                              defaultExpandAll
                              autoExpandParent
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
                                    <TreeNode title="Columna 2" key="2-0-1" />
                                    <TreeNode title="Columna 3" key="2-0-2" />
                                    <TreeNode title="Columna 4" key="2-0-3" />
                                    <TreeNode title="Columna 5" key="2-0-4" />
                                </TreeNode>
                            </Tree>
                        </Panel>
                    </Collapse>
                </TabPane>
                <TabPane tab="Presentación" key="tab2">
                    <Collapse defaultActiveKey={['datos']}>
                        <Panel header="Datos" key="datos">
                            <p>Panel content</p>
                        </Panel>
                        <Panel header="Componentes" key="componentes">
                            <p>Panel content</p>
                        </Panel>
                    </Collapse>
                </TabPane>
            </Tabs>
        );
    }
}
