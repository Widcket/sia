import React, {PropTypes, PureComponent} from 'react';

import ReactPivot from '../../Pivot';
import Spinner from '../../Spinner/Spinner';
import {Tabs} from 'antd';
import {autobind} from 'core-decorators';

const TabPane = Tabs.TabPane;

export default class Step2 extends PureComponent {
    static propTypes = {
        store: PropTypes.object.isRequired,
        data: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    }

    @autobind
    getStage(stage) {
        switch (stage) {
            case 0:
                return (<Spinner
                  store={this.props.store}
                  actions={this.props.actions}
                  legend="Cargando archivos..."
                  active />);
            case 1:
                return (
                    <Tabs defaultActiveKey={this.props.store.defaultTab}>
                        <TabPane tab="Dataset 1" key="tab1">
                            <ReactPivot
                              rows={this.props.data}
                              dimensions={this.props.store.dimensions}
                              reduce={this.reduce}
                              calculations={this.props.store.calculations}
                              activeDimensions={[this.props.store.dimensions[0].title]}
                              key="dataset1"
                              compact />
                        </TabPane>
                        <TabPane tab="Dataset 2" key="tab2">
                            <ReactPivot
                              rows={this.props.data}
                              dimensions={this.props.store.dimensions}
                              reduce={this.reduce}
                              calculations={this.props.store.calculations}
                              activeDimensions={[this.props.store.dimensions[0].title]}
                              key="dataset2"
                              compact />
                        </TabPane>
                        <TabPane tab="Dataset 3" key="tab3">
                            <ReactPivot
                              rows={this.props.data}
                              dimensions={this.props.store.dimensions}
                              reduce={this.reduce}
                              calculations={this.props.store.calculations}
                              activeDimensions={[this.props.store.dimensions[0].title]}
                              key="dataset3"
                              compact />
                        </TabPane>
                    </Tabs>
                );
            default:
                return;
        }
    }

    @autobind
    reduce(row, memo) {
        // the memo object starts as {} for each group, build it up
        memo.count = (memo.count || 0) + 1;
        memo.amountTotal = (memo.amountTotal || 0) + parseFloat(row.transaction.amount);
        // be sure to return it when you're done for the next pass
        return memo;
    }

    render() {
        const styles = require('./Step2.scss');

        return (
            <div id="step2">
                {this.getStage(this.props.store.stage)}
            </div>
        );
    }
}
