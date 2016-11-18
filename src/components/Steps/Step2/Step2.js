import React, {PropTypes, PureComponent} from 'react';

import ReactPivot from '../../Pivot';
import {Tabs} from 'antd';

const TabPane = Tabs.TabPane;

export default class Step2 extends PureComponent {
    static propTypes = {
        store: PropTypes.object.isRequired,
        data: PropTypes.array.isRequired
        // actions: PropTypes.object.isRequired
    }

    render() {
        const styles = require('./Step2.scss');

        const dimensions = [
            // "value" can be the key of what you want to group on
            {
                title: 'Last Name',
                value: 'lastName'
            },
            // "value" can also be function that returns what you want to group on
            {
                title: 'Transaction Type',
                value: (row) => row.transaction.type,
                template: (value) => value
            },
            {
                title: 'State',
                value: 'state'
            }
        ];
        const reduce = (row, memo) => {
            // the memo object starts as {} for each group, build it up
            memo.count = (memo.count || 0) + 1;
            memo.amountTotal = (memo.amountTotal || 0) + parseFloat(row.transaction.amount);
            // be sure to return it when you're done for the next pass
            return memo;
        };
        const calculations = [
        // "value" can be the key of the "memo" object from reduce
        // "template" changes the display of the value, but not sorting behavior
            {
                title: 'Amount',
                value: 'amountTotal',
                template: function (val, row) { return '$' + val.toFixed(2); }
            },
            {
                title: 'Avg Amount',
                // "value" can also be a function
                value: function (memo) { return memo.amountTotal / memo.count; },
                template: function (val, row) { return '$' + val.toFixed(2); },
                // you can also give a column a custom class (e.g. right align for numbers)
                className: 'alignRight'
            }
        ];

        return (
            <div id="step2">
                <Tabs defaultActiveKey={this.props.store.defaultTab}>
                    <TabPane tab="Dataset 1" key="tab1">
                        <ReactPivot
                          rows={this.props.data}
                          dimensions={dimensions}
                          reduce={reduce}
                          calculations={calculations}
                          activeDimensions={[dimensions[0].title]}
                          key="dataset1"
                          compact />
                    </TabPane>
                    <TabPane tab="Dataset 2" key="tab2">
                        <ReactPivot
                          rows={this.props.data}
                          dimensions={dimensions}
                          reduce={reduce}
                          calculations={calculations}
                          activeDimensions={[dimensions[0].title]}
                          key="dataset2"
                          compact />
                    </TabPane>
                    <TabPane tab="Dataset 3" key="tab3">
                        <ReactPivot
                          rows={this.props.data}
                          dimensions={dimensions}
                          reduce={reduce}
                          calculations={calculations}
                          activeDimensions={[dimensions[0].title]}
                          key="dataset3"
                          compact />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
