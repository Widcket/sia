import React, {Component, PropTypes} from 'react';

import {Transfer} from 'antd';
import {autobind} from 'core-decorators';

export default class DatasetPicker extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    }

    @autobind
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
        this.props.actions.selectDatasets(sourceSelectedKeys, targetSelectedKeys);
        this.setState({});
    }

    render() {
        const styles = require('./DatasetPicker.scss');

        return (
            <Transfer className="picker"
              dataSource={this.props.store.datasetPickerItems}
              selectedKeys={this.props.store.pickedDatasets}
              targetKeys={[...this.props.store.pickedDatasets]}
              titles={['', '']}
              searchPlaceholder="Buscar..."
              notFoundContent=" "
              onSelectChange={this.handleSelectChange}
              render={(item) => item.title}
              showSearch
            />
        );
    }
}