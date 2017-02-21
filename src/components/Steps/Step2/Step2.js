import React, {Component, PropTypes} from 'react';

import Filter from './Filter/Filter';
import ReactPivot from '../../Pivot';
import Spinner from '../../Spinner/Spinner';
import {Tabs} from 'antd';
import {autobind} from 'core-decorators';

const TabPane = Tabs.TabPane;

export default class Step2 extends Component {
    static propTypes = {
        instance: PropTypes.object.isRequired,
        files: PropTypes.object.isRequired,
        loadingFiles: PropTypes.bool.isRequired,
        store: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.getFiles();
    }

    componentWillReceiveProps(newProps) {
        if (this.props.loadingFiles && !newProps.loadingFiles) {
            const keys = Object.getOwnPropertyNames(newProps.files);

            this.props.actions.setDefaultTab(newProps.files[keys[0]].id);
        }
    }

    @autobind
    getDimensions(dimensions) {
        const titles = [];

        for (const item of dimensions) titles.push(item.title);

        return titles;
    }

    @autobind
    getRows(key) {
        return this.props.store.filters[key] && this.props.store.filters[key].isFiltering ?
            this.props.files[key].filteredData :
            this.props.files[key].data;
    }

    @autobind
    getTabs() {
        const tabs = [];

        for (const file in this.props.files) {
            if (this.props.files.hasOwnProperty(file)) {
                tabs.push(
                    <TabPane tab={this.props.files[file].name} key={this.props.files[file].id}>
                        <Filter
                          file={this.props.files[file]}
                          store={{
                              files: this.props.store.filters,
                              filterConditions: this.props.store.filterConditions,
                              validTypes: this.props.store.validTypes
                          }}
                          actions={{
                              addFilter: this.props.actions.addFilter,
                              removeFilter: this.props.actions.removeFilter,
                              setFilters: this.props.actions.setFilters,
                              setFile: this.props.actions.setFile,
                              setFilteredFiles: this.props.actions.setFilteredFiles,
                              setFilterField: this.props.actions.setFilterField,
                              setFilterCondition: this.props.actions.setFilterCondition,
                              setFilterValue: this.props.actions.setFilterValue,
                              isFiltering: this.props.actions.isFiltering
                          }} />
                        <ReactPivot
                          rows={this.getRows(file)}
                          columns={this.props.files[file].fields}
                          dimensions={this.props.files[file].dimensions}
                          activeDimensions={this.getDimensions(this.props.files[file].dimensions)}
                          reduce={this.reduce}
                          key={this.props.files[file].id}
                          compact />
                    </TabPane>
                );
            }
        }

        return tabs;
    }

    @autobind
    getFiles() {
        for (const file in this.props.files) {
            if (this.props.files.hasOwnProperty(file)) {
                this.props.actions.getFileContents(
                    this.props.files[file],
                    this.props.instance.endpoints,
                    this.props.instance.token
                );
            }
        }
    }

    @autobind
    reduce(row, memo) {
        memo.count = (memo.count || 0) + 1;
        memo.amountTotal = memo.count;

        return memo;
    }

    render() {
        const styles = require('./Step2.scss');

        if (this.props.loadingFiles) {
            return (
                <div className="spinner">
                    <Spinner
                      store={this.props.store}
                      actions={this.props.actions}
                      active={this.props.loadingFiles}
                      legend="Cargando datos..." />
                </div>
            );
        }

        if (this.props.store.defaultTab) {
            return (
                <div id="step2">
                    <Tabs defaultActiveKey={this.props.store.defaultTab}>
                        {this.getTabs()}
                    </Tabs>
                </div>
            );
        }

        return null;
    }
}
