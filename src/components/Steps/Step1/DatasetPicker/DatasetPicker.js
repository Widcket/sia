import {Collapse, Transfer} from 'antd';
import React, {Component, PropTypes} from 'react';

import { autobind } from 'core-decorators';

const Panel = Collapse.Panel;

export default class DatasetPicker extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    }

    @autobind
    handlePanelChange(panel) {
        console.log(panel);

        if (!panel) {
            if (this.props.store.pickerPanel === 'pickerPanel-1') this.props.actions.setPickerPanel('pickerPanel-2');
            else this.props.actions.setPickerPanel('pickerPanel-1');
        }
        else this.props.actions.setPickerPanel(panel);
    }

    @autobind
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
        this.props.actions.selectDatasets(sourceSelectedKeys, targetSelectedKeys);
        this.setState({});
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
                    <Transfer className="picker"
                      dataSource={this.props.store.datasetPickerItems}
                      selectedKeys={this.props.store.pickedDatasets}
                      targetKeys={[...this.props.store.pickedDatasets]}
                      titles={['', '']}
                      searchPlaceholder="Buscar..."
                      notFoundContent=" "
                      onSelectChange={this.handleSelectChange}
                      render={(item) => item.title}
                      showSearch />
                </Panel>
                <Panel header="Archivos" key="pickerPanel-2">
                    <Transfer className="picker"
                      dataSource={this.props.store.datasetPickerItems}
                      selectedKeys={this.props.store.pickedDatasets}
                      targetKeys={[...this.props.store.pickedDatasets]}
                      titles={['', '']}
                      searchPlaceholder="Buscar..."
                      notFoundContent=" "
                      onSelectChange={this.handleSelectChange}
                      render={(item) => item.title}
                      showSearch />
                </Panel>
            </Collapse>
        );
    }
}