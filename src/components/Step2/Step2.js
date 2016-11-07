import React, {Component} from 'react';

import ReactPivot from '../Pivot';

export default class Step2 extends Component {
    render() {
        const styles = require('./Step2.scss');

        const rows = [
            {
                firstName: 'Francisco',
                lastName: 'Brekke',
                state: 'NY',
                transaction: {
                    amount: '399.73',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Kozey-Moore',
                    name: 'Checking Account 2297',
                    type: 'deposit',
                    account: '82741327'
                }
            }, {
                firstName: 'Francisco',
                lastName: 'Brekke',
                state: 'NY',
                transaction: {
                    amount: '768.84',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Herman-Langworth',
                    name: 'Money Market Account 9344',
                    type: 'deposit',
                    account: '95753704'
                }
            }
        ];
        const dimensions = [
            {
                value: 'firstName',
                title: 'First Name'
            }
        ];
        const reduce = function (row, memo) {
            memo.amountTotal = (memo.amountTotal || 0) + parseFloat(row.transaction.amount);
            return memo;
        };
        const calculations = [
            {
                title: 'Amount',
                value: 'amountTotal',
                template: function (val, row) {
                    return '$' + val.toFixed(2);
                }
            }
        ];

        return (
            <div className="step">
                <ReactPivot
                  rows={rows}
                  dimensions={dimensions}
                  reduce={reduce}
                  calculations={calculations}
                  activeDimensions={['First Name']} />
            </div>
        );
    }
}
