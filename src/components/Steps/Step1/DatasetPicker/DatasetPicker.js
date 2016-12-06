import {Collapse, Spin, Tabs, Transfer} from 'antd';
import React, {PropTypes, PureComponent} from 'react';

import {autobind} from 'core-decorators';

const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

export default class DatasetPicker extends PureComponent {
    static propTypes = {
        store: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    }

    @autobind
    getTabs() {
        const tabs = [];
        let i = 1;

        for (const file of this.props.store.pickedFiles) {
            tabs.push(
                <TabPane tab={this.props.store.files[file].name} key={'fileTab-' + i}>
                    Content of Tab Pane 1
                </TabPane>
            );
            i++;
        }

        return tabs;
    }

    @autobind
    handlePanelChange(panel) {
        if (!panel) {
            if (this.props.store.pickerPanel === 'pickerPanel-1') {
                this.props.actions.setPickerPanel('pickerPanel-2');
            }
            else if (this.props.store.pickerPanel === 'pickerPanel-2') {
                this.props.actions.setPickerPanel('pickerPanel-3');
            }
            else this.props.actions.setPickerPanel('pickerPanel-1');
        }
        else this.props.actions.setPickerPanel(panel);
    }

    @autobind
    handleDatasetSelect(sourceSelectedKeys, targetSelectedKeys) {
        this.props.actions.selectDatasets(sourceSelectedKeys, targetSelectedKeys);
        this.props.actions.getDatasetFiles(sourceSelectedKeys.pop());
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
              activeKey={[this.props.store.pickerPanel]}
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
                    <Transfer className="picker"
                      dataSource={this.props.store.filePickerItems}
                      selectedKeys={this.props.store.pickedFiles}
                      targetKeys={[...this.props.store.pickedFiles]}
                      titles={['', '']}
                      notFoundContent=" "
                      onSelectChange={this.props.actions.selectFiles}
                      render={(item) => item.title} />
                </Panel>
                <Panel header="Registros" key="pickerPanel-3">
                    <Tabs defaultActiveKey="fileTab-1" size="small" onChange={console.log}>
                        {this.getTabs()}
                    </Tabs>
                </Panel>
            </Collapse>
        );
    }
}