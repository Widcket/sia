import React, {PropTypes, PureComponent} from 'react';

import ReactPivot from '../../Pivot';
import Spinner from '../../Spinner/Spinner';
import {Tabs} from 'antd';
import {autobind} from 'core-decorators';

const TabPane = Tabs.TabPane;

export default class Step2 extends PureComponent {
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
    getTabs() {
        const tabs = [];

        for (const file in this.props.files) {
            if (this.props.files.hasOwnProperty(file)) {
                tabs.push(
                    <TabPane tab={this.props.files[file].name} key={this.props.files[file].id}>
                        <ReactPivot
                          rows={this.props.files[file].data}
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
                <div id="step2">
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
                    <div id="step2">
                        <Tabs defaultActiveKey={this.props.store.defaultTab}>
                            {this.getTabs()}
                        </Tabs>
                    </div>
                </div>
            );
        }

        return null;
    }
}
