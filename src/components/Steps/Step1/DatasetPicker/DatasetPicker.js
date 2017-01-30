import {Card, Collapse, Slider, Spin, Table, Tabs, Transfer} from 'antd';
import React, {Component, PropTypes} from 'react';

import {autobind} from 'core-decorators';

const InputNumber = require('antd/lib/input-number');
const inputNumberStyle = require('antd/lib/input-number/style');

const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

export default class DatasetPicker extends Component {
    static propTypes = {
        files: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        events: PropTypes.object.isRequired
    };

    componentWillReceiveProps(newState) {
        if (newState.store.pickedFiles.length > this.props.store.pickedFiles.length) {
            this.props.actions.setFiles(newState.store.pickedFiles, newState.store.files);
        }
    }

    @autobind
    getTabs() {
        const tabs = [];
        const columns = [
            {
                title: 'Clave',
                dataIndex: 'clave'
            },
            {
                title: 'Valor',
                dataIndex: 'valor'
            }
        ];

        for (const file of this.props.store.pickedFiles) {
            if (this.props.store.files[file]) {
                const fileInfo = [
                    {
                        key: 'rows',
                        clave: 'Filas',
                        valor: this.props.store.files[file].rows
                    },
                    {
                        key: 'columns',
                        clave: 'Columnas',
                        valor: this.props.store.files[file].columns
                    },
                    {
                        key: 'createdAt',
                        clave: 'Creación',
                        valor: this.props.store.files[file].createdAt
                    },
                    {
                        key: 'modifiedAt',
                        clave: 'Última modificación',
                        valor: this.props.store.files[file].updatedAt
                    }
                ];
                const fields = [];
                const marks = {
                    0: '1',
                    100: this.props.store.files[file].rows
                };
                const rowsOffset = this.props.store.files[file].rowsOffset;
                const rowsToFetch = this.props.store.files[file].rowsToFetch;

                for (const field in this.props.store.files[file].fields) {
                    if (this.props.store.files[file].fields.hasOwnProperty(field)) {
                        fields.push({
                            key: field,
                            clave: field,
                            valor: this.props.store.files[file].fields[field]
                        });
                    }
                }

                tabs.push(
                    <TabPane tab={this.props.store.files[file].name} key={this.props.store.files[file].id}>
                        <div className="tab-content">
                            <div className="tab-content-panel">
                                <Card title="Archivo">
                                    <Table columns={columns} dataSource={fileInfo} size="small" pagination={false} />
                                </Card>
                            </div>
                            <Card className="tab-content-main" title="Registros">
                                <div className="control-wrapper">
                                    <div className="control-label">Cantidad</div>
                                    <InputNumber
                                      min={1}
                                      max={this.props.store.files[file].rows}
                                      defaultValue={rowsToFetch}
                                      onChange={this.handleRowsChange(file)} />
                                </div>
                                <div className="control-wrapper">
                                    <div className="control-label">Desde</div>
                                    <InputNumber
                                      min={1}
                                      max={this.props.store.files[file].rows - 1}
                                      defaultValue={1}
                                      onChange={this.handleOffsetChange(file)} />
                                </div>
                                <div className="slider-wrapper">
                                    <Slider
                                      marks={marks}
                                      range
                                      value={[
                                        ((rowsOffset / this.props.store.files[file].rows) * 100),
                                        ((rowsToFetch / this.props.store.files[file].rows) * 100)
                                      ]} />
                                </div>
                            </Card>
                        </div>
                        <Card className="tab-content-full" title="Estructura">
                            <Table columns={columns} dataSource={fields} size="small" pagination={false} />
                        </Card>
                    </TabPane>
                );
            }
        }

        return tabs;
    }

    @autobind
    getActiveTab() {
        return this.props.store.activeTab;
    }

    @autobind
    handleOffsetChange(file) {
        return (offset) => {
            this.props.actions.setRowsOffset(file, offset);
        };
    }

    @autobind
    handleRowsChange(file) {
        return (rows) => {
            this.props.actions.setRowsToFetch(file, rows);
        };
    }

    @autobind
    handlePanelChange(panel) {
        if (!panel) {
            if (this.props.store.activePanel === 'pickerPanel-1') {
                this.props.actions.setActivePanel('pickerPanel-2');
            }
            else if (this.props.store.activePanel === 'pickerPanel-2') {
                this.props.actions.setActivePanel('pickerPanel-3');
            }
            else this.props.actions.setActivePanel('pickerPanel-1');
        }
        else this.props.actions.setActivePanel(panel);
    }

    @autobind
    handleDatasetSelect(sourceSelectedKeys, targetSelectedKeys) {
        this.props.actions.selectDatasets(sourceSelectedKeys, targetSelectedKeys);
        this.props.actions.getDatasetFiles(sourceSelectedKeys.pop());
    }

    @autobind
    handleFileSelect(sourceSelectedKeys, targetSelectedKeys) {
        this.props.actions.selectFiles(sourceSelectedKeys, targetSelectedKeys, this.props.events);
        this.props.actions.getFileFields(sourceSelectedKeys.pop());
    }

    @autobind
    renderItem(item) {
        const customLabel = (
            <span className="custom-item">
                {item.title} - {item.description}
            </span>
        );

        return {
            label: customLabel  // for displayed item
        };
    }

    render() {
        const styles = require('./DatasetPicker.scss');

        return (
            <Collapse
              bordered={false}
              activeKey={[this.props.store.activePanel]}
              onChange={this.handlePanelChange}
              accordion>
                <Panel header="Datasets" key="pickerPanel-1">
                    <Spin
                      tip="Cargando lista de archivos..."
                      spinning={this.props.store.loadingFiles}
                      className="spinner">
                        <Transfer className="picker"
                          dataSource={this.props.store.datasetPickerItems}
                          selectedKeys={this.props.store.pickedDatasets}
                          targetKeys={[...this.props.store.pickedDatasets]}
                          titles={['', '']}
                          searchPlaceholder="Buscar..."
                          notFoundContent=" "
                          onSelectChange={this.handleDatasetSelect}
                          render={(item) => item.title}
                          showSearch />
                    </Spin>
                </Panel>
                <Panel header="Archivos" key="pickerPanel-2">
                    <Spin
                      tip="Cargando info del archivo..."
                      spinning={this.props.store.loadingFileInfo}
                      className="spinner">
                        <Transfer className="picker"
                          dataSource={this.props.store.filePickerItems}
                          selectedKeys={this.props.store.pickedFiles}
                          targetKeys={[...this.props.store.pickedFiles]}
                          titles={['', '']}
                          notFoundContent=" "
                          onSelectChange={this.handleFileSelect}
                          render={(item) => item.title} />
                    </Spin>
                </Panel>
                <Panel header="Registros" key="pickerPanel-3">
                    <Tabs
                      activeKey={this.getActiveTab()}
                      size="small"
                      onChange={this.props.actions.setActiveTab}>
                        {this.getTabs()}
                    </Tabs>
                </Panel>
            </Collapse>
        );
    }
}