import React, {PropTypes, PureComponent} from 'react';

import Spinner from '../../Spinner/Spinner';
// import ReactPivot from '../../Pivot';
import Table from './Table/Table';
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

    @autobind
    getTabs() {
        const tabs = [];

        for (const file in this.props.files) {
            if (this.props.files.hasOwnProperty(file)) {
                tabs.push(
                    <TabPane tab={this.props.files[file].name} key={this.props.files[file].id}>
                        <p />
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
        // the memo object starts as {} for each group, build it up
        memo.count = (memo.count || 0) + 1;
        // memo.amountTotal = (memo.amountTotal || 0) + parseFloat(row.transaction.amount);
        // be sure to return it when you're done for the next pass
        return memo;
    }

    render() {
        const styles = require('./Step2.scss');

        return (
            <div id="step2">
                {
                    this.props.loadingFiles ?
                    (
                        <Spinner
                          store={this.props.store}
                          actions={this.props.actions}
                          active={this.props.loadingFiles}
                          legend="Cargando datos..." />
                    ) :
                    (
                        <Tabs defaultActiveKey={this.props.store.defaultTab}>
                            {this.getTabs()}
                        </Tabs>
                    )
                }
            </div>
        );
    }
}
