import {Col, Collapse, Input, Row, Switch, Tabs} from 'antd';
import React, {Component} from 'react';

const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

export default class Tab2 extends Component {
    render() {
        const styles = require('./Tab2.scss');

        return (
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
        );
    }
}
