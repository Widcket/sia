import React, {Component, PropTypes} from 'react';

import ReactPivot from '../../Pivot';
import {Tabs} from 'antd';

const TabPane = Tabs.TabPane;

export default class Step2 extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    }

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
            },
            {
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
            },
            {
                firstName: 'Francisco',
                lastName: 'Brekke',
                state: 'NY',
                transaction: {
                    amount: '759.28',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Kozey-Moore',
                    name: 'Auto Loan Account 3984',
                    type: 'withdrawal',
                    account: '93218854'
                }
            },
            {
                firstName: 'Francisco',
                lastName: 'White',
                state: 'VA',
                transaction: {
                    amount: '362.88',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Rosenbaum-Nicolas',
                    name: 'Credit Card Account 3199',
                    type: 'withdrawal',
                    account: '63038962'
                }
            },
            {
                firstName: 'Francisco',
                lastName: 'White',
                state: 'VA',
                transaction: {
                    amount: '750.30',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Armstrong-Bode',
                    name: 'Checking Account 9926',
                    type: 'invoice',
                    account: '31968241'
                }
            },
            {
                firstName: 'Francisco',
                lastName: 'White',
                state: 'VA',
                transaction: {
                    amount: '905.14',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Armstrong-Bode',
                    name: 'Auto Loan Account 1715',
                    type: 'withdrawal',
                    account: '98467516'
                }
            },
            {
                firstName: 'Skylar',
                lastName: 'Prohaska',
                state: 'NY',
                transaction: {
                    amount: '164.94',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Kozey-Moore',
                    name: 'Home Loan Account 2759',
                    type: 'invoice',
                    account: '73958452'
                }
            },
            {
                firstName: 'Skylar',
                lastName: 'Prohaska',
                state: 'NY',
                transaction: {
                    amount: '929.74',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Herman-Langworth',
                    name: 'Auto Loan Account 8133',
                    type: 'deposit',
                    account: '47065994'
                }
            },
            {
                firstName: 'Skylar',
                lastName: 'Prohaska',
                state: 'NY',
                transaction: {
                    amount: '618.11',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Bartoletti, Powlowski and Halvorson',
                    name: 'Checking Account 1064',
                    type: 'payment',
                    account: '75087768'
                }
            },
            {
                firstName: 'Price',
                lastName: 'Runolfsdottir',
                state: 'VA',
                transaction: {
                    amount: '102.38',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Armstrong-Bode',
                    name: 'Auto Loan Account 8396',
                    type: 'deposit',
                    account: '75340917'
                }
            },
            {
                firstName: 'Price',
                lastName: 'Runolfsdottir',
                state: 'VA',
                transaction: {
                    amount: '139.52',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Bartoletti, Powlowski and Halvorson',
                    name: 'Savings Account 3361',
                    type: 'invoice',
                    account: '99593625'
                }
            },
            {
                firstName: 'Price',
                lastName: 'Runolfsdottir',
                state: 'VA',
                transaction: {
                    amount: '719.45',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Armstrong-Bode',
                    name: 'Auto Loan Account 5257',
                    type: 'withdrawal',
                    account: '94341473'
                }
            },
            {
                firstName: 'Jose',
                lastName: 'Romaguera',
                state: 'TX',
                transaction: {
                    amount: '242.98',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'McGlynn, Barton and Dare',
                    name: 'Investment Account 1905',
                    type: 'invoice',
                    account: '72825452'
                }
            },
            {
                firstName: 'Jose',
                lastName: 'Romaguera',
                state: 'TX',
                transaction: {
                    amount: '868.16',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Kozey-Moore',
                    name: 'Home Loan Account 1263',
                    type: 'payment',
                    account: '30317863'
                }
            },
            {
                firstName: 'Jose',
                lastName: 'Romaguera',
                state: 'TX',
                transaction: {
                    amount: '180.33',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Herman-Langworth',
                    name: 'Auto Loan Account 1699',
                    type: 'payment',
                    account: '56251788'
                }
            },
            {
                firstName: 'Juston',
                lastName: 'Carter',
                state: 'MT',
                transaction: {
                    amount: '373.05',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'McGlynn, Barton and Dare',
                    name: 'Checking Account 3019',
                    type: 'invoice',
                    account: '57605253'
                }
            },
            {
                firstName: 'Juston',
                lastName: 'Carter',
                state: 'MT',
                transaction: {
                    amount: '681.46',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Bartoletti, Powlowski and Halvorson',
                    name: 'Checking Account 7685',
                    type: 'invoice',
                    account: '57943300'
                }
            },
            {
                firstName: 'Juston',
                lastName: 'Carter',
                state: 'MT',
                transaction: {
                    amount: '248.33',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Rosenbaum-Nicolas',
                    name: 'Investment Account 8034',
                    type: 'withdrawal',
                    account: '90015610'
                }
            },
            {
                firstName: 'Peyton',
                lastName: 'Runolfsdottir',
                state: 'NY',
                transaction: {
                    amount: '976.49',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Rosenbaum-Nicolas',
                    name: 'Money Market Account 8876',
                    type: 'invoice',
                    account: '19873296'
                }
            },
            {
                firstName: 'Peyton',
                lastName: 'Runolfsdottir',
                state: 'NY',
                transaction: {
                    amount: '582.38',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'McGlynn, Barton and Dare',
                    name: 'Auto Loan Account 6488',
                    type: 'withdrawal',
                    account: '17785926'
                }
            },
            {
                firstName: 'Peyton',
                lastName: 'Runolfsdottir',
                state: 'NY',
                transaction: {
                    amount: '506.56',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Bartoletti, Powlowski and Halvorson',
                    name: 'Credit Card Account 2374',
                    type: 'payment',
                    account: '50008551'
                }
            },
            {
                firstName: 'Peyton',
                lastName: 'Kunze',
                state: 'OK',
                transaction: {
                    amount: '43.30',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Kozey-Moore',
                    name: 'Checking Account 4632',
                    type: 'invoice',
                    account: '34814359'
                }
            },
            {
                firstName: 'Peyton',
                lastName: 'Kunze',
                state: 'OK',
                transaction: {
                    amount: '991.06',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Herman-Langworth',
                    name: 'Auto Loan Account 0584',
                    type: 'deposit',
                    account: '11464099'
                }
            },
            {
                firstName: 'Peyton',
                lastName: 'Kunze',
                state: 'OK',
                transaction: {
                    amount: '577.61',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'McGlynn, Barton and Dare',
                    name: 'Home Loan Account 7241',
                    type: 'invoice',
                    account: '41676965'
                }
            },
            {
                firstName: 'Vaughn',
                lastName: 'Kunze',
                state: 'MT',
                transaction: {
                    amount: '743.57',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'McGlynn, Barton and Dare',
                    name: 'Home Loan Account 3574',
                    type: 'invoice',
                    account: '84819774'
                }
            },
            {
                firstName: 'Vaughn',
                lastName: 'Kunze',
                state: 'MT',
                transaction: {
                    amount: '90.66',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Armstrong-Bode',
                    name: 'Savings Account 7557',
                    type: 'invoice',
                    account: '52011601'
                }
            },
            {
                firstName: 'Vaughn',
                lastName: 'Kunze',
                state: 'MT',
                transaction: {
                    amount: '800.13',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Kozey-Moore',
                    name: 'Auto Loan Account 6065',
                    type: 'payment',
                    account: '58967211'
                }
            },
            {
                firstName: 'Peyton',
                lastName: 'Prohaska',
                state: 'TX',
                transaction: {
                    amount: '498.72',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Herman-Langworth',
                    name: 'Savings Account 1601',
                    type: 'payment',
                    account: '05026480'
                }
            },
            {
                firstName: 'Peyton',
                lastName: 'Prohaska',
                state: 'TX',
                transaction: {
                    amount: '454.30',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Rosenbaum-Nicolas',
                    name: 'Investment Account 1660',
                    type: 'payment',
                    account: '33595187'
                }
            },
            {
                firstName: 'Peyton',
                lastName: 'Prohaska',
                state: 'TX',
                transaction: {
                    amount: '444.65',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Bartoletti, Powlowski and Halvorson',
                    name: 'Credit Card Account 9966',
                    type: 'deposit',
                    account: '87852484'
                }
            },
            {
                firstName: 'Jose',
                lastName: 'Romaguera',
                state: 'NY',
                transaction: {
                    amount: '851.05',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Kozey-Moore',
                    name: 'Credit Card Account 1841',
                    type: 'withdrawal',
                    account: '52589223'
                }
            },
            {
                firstName: 'Jose',
                lastName: 'Romaguera',
                state: 'NY',
                transaction: {
                    amount: '89.95',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Armstrong-Bode',
                    name: 'Home Loan Account 3634',
                    type: 'payment',
                    account: '75612090'
                }
            },
            {
                firstName: 'Jose',
                lastName: 'Romaguera',
                state: 'NY',
                transaction: {
                    amount: '788.04',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Bartoletti, Powlowski and Halvorson',
                    name: 'Auto Loan Account 7948',
                    type: 'deposit',
                    account: '11625129'
                }
            },
            {
                firstName: 'Francisco',
                lastName: 'Runolfsdottir',
                state: 'OK',
                transaction: {
                    amount: '67.82',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'McGlynn, Barton and Dare',
                    name: 'Home Loan Account 4231',
                    type: 'withdrawal',
                    account: '05522618'
                }
            },
            {
                firstName: 'Francisco',
                lastName: 'Runolfsdottir',
                state: 'OK',
                transaction: {
                    amount: '294.90',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Armstrong-Bode',
                    name: 'Checking Account 7598',
                    type: 'payment',
                    account: '40056161'
                }
            },
            {
                firstName: 'Francisco',
                lastName: 'Runolfsdottir',
                state: 'OK',
                transaction: {
                    amount: '221.06',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Herman-Langworth',
                    name: 'Credit Card Account 1537',
                    type: 'deposit',
                    account: '81165023'
                }
            },
            {
                firstName: 'Juston',
                lastName: 'Prohaska',
                state: 'NY',
                transaction: {
                    amount: '995.99',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Rosenbaum-Nicolas',
                    name: 'Auto Loan Account 3150',
                    type: 'payment',
                    account: '75527684'
                }
            },
            {
                firstName: 'Juston',
                lastName: 'Prohaska',
                state: 'NY',
                transaction: {
                    amount: '453.74',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Rosenbaum-Nicolas',
                    name: 'Auto Loan Account 0759',
                    type: 'withdrawal',
                    account: '39822890'
                }
            },
            {
                firstName: 'Juston',
                lastName: 'Prohaska',
                state: 'NY',
                transaction: {
                    amount: '292.59',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Bartoletti, Powlowski and Halvorson',
                    name: 'Investment Account 9848',
                    type: 'deposit',
                    account: '33760924'
                }
            },
            {
                firstName: 'Annette',
                lastName: 'Carter',
                state: 'VA',
                transaction: {
                    amount: '696.28',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Rosenbaum-Nicolas',
                    name: 'Money Market Account 1304',
                    type: 'deposit',
                    account: '94830205'
                }
            },
            {
                firstName: 'Annette',
                lastName: 'Carter',
                state: 'VA',
                transaction: {
                    amount: '644.96',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Herman-Langworth',
                    name: 'Money Market Account 3918',
                    type: 'payment',
                    account: '36931091'
                }
            },
            {
                firstName: 'Annette',
                lastName: 'Carter',
                state: 'VA',
                transaction: {
                    amount: '562.51',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Bartoletti, Powlowski and Halvorson',
                    name: 'Investment Account 5118',
                    type: 'payment',
                    account: '68772278'
                }
            },
            {
                firstName: 'Price',
                lastName: 'Kunze',
                state: 'OK',
                transaction: {
                    amount: '236.33',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'McGlynn, Barton and Dare',
                    name: 'Home Loan Account 0168',
                    type: 'withdrawal',
                    account: '13816090'
                }
            },
            {
                firstName: 'Price',
                lastName: 'Kunze',
                state: 'OK',
                transaction: {
                    amount: '991.23',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Bartoletti, Powlowski and Halvorson',
                    name: 'Auto Loan Account 1395',
                    type: 'payment',
                    account: '91931621'
                }
            },
            {
                firstName: 'Price',
                lastName: 'Kunze',
                state: 'OK',
                transaction: {
                    amount: '886.46',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Rosenbaum-Nicolas',
                    name: 'Checking Account 8743',
                    type: 'withdrawal',
                    account: '22895005'
                }
            },
            {
                firstName: 'Jose',
                lastName: 'Labadie',
                state: 'VA',
                transaction: {
                    amount: '440.75',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Armstrong-Bode',
                    name: 'Home Loan Account 2377',
                    type: 'withdrawal',
                    account: '10776616'
                }
            },
            {
                firstName: 'Jose',
                lastName: 'Labadie',
                state: 'VA',
                transaction: {
                    amount: '916.20',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Kozey-Moore',
                    name: 'Savings Account 0498',
                    type: 'invoice',
                    account: '92178049'
                }
            },
            {
                firstName: 'Jose',
                lastName: 'Labadie',
                state: 'VA',
                transaction: {
                    amount: '874.69',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Rosenbaum-Nicolas',
                    name: 'Home Loan Account 6908',
                    type: 'invoice',
                    account: '69693172'
                }
            },
            {
                firstName: 'Skylar',
                lastName: 'Grant',
                state: 'NY',
                transaction: {
                    amount: '592.06',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Rosenbaum-Nicolas',
                    name: 'Auto Loan Account 9840',
                    type: 'invoice',
                    account: '06557055'
                }
            },
            {
                firstName: 'Skylar',
                lastName: 'Grant',
                state: 'NY',
                transaction: {
                    amount: '759.05',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Rosenbaum-Nicolas',
                    name: 'Auto Loan Account 2210',
                    type: 'withdrawal',
                    account: '77467052'
                }
            },
            {
                firstName: 'Skylar',
                lastName: 'Grant',
                state: 'NY',
                transaction: {
                    amount: '664.97',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'McGlynn, Barton and Dare',
                    name: 'Checking Account 4950',
                    type: 'withdrawal',
                    account: '09651671'
                }
            },
            {
                firstName: 'Francisco',
                lastName: 'Labadie',
                state: 'TX',
                transaction: {
                    amount: '213.09',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Herman-Langworth',
                    name: 'Auto Loan Account 1079',
                    type: 'deposit',
                    account: '03654755'
                }
            },
            {
                firstName: 'Francisco',
                lastName: 'Labadie',
                state: 'TX',
                transaction: {
                    amount: '938.41',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Rosenbaum-Nicolas',
                    name: 'Savings Account 2472',
                    type: 'invoice',
                    account: '31248060'
                }
            },
            {
                firstName: 'Francisco',
                lastName: 'Labadie',
                state: 'TX',
                transaction: {
                    amount: '251.49',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Rosenbaum-Nicolas',
                    name: 'Auto Loan Account 5555',
                    type: 'payment',
                    account: '09155549'
                }
            },
            {
                firstName: 'Jose',
                lastName: 'Runolfsdottir',
                state: 'MT',
                transaction: {
                    amount: '956.85',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Kozey-Moore',
                    name: 'Investment Account 6978',
                    type: 'invoice',
                    account: '68326263'
                }
            },
            {
                firstName: 'Jose',
                lastName: 'Runolfsdottir',
                state: 'MT',
                transaction: {
                    amount: '0.11',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'McGlynn, Barton and Dare',
                    name: 'Checking Account 5257',
                    type: 'deposit',
                    account: '36570422'
                }
            },
            {
                firstName: 'Jose',
                lastName: 'Runolfsdottir',
                state: 'MT',
                transaction: {
                    amount: '33.71',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Bartoletti, Powlowski and Halvorson',
                    name: 'Auto Loan Account 9083',
                    type: 'payment',
                    account: '52055690'
                }
            },
            {
                firstName: 'Jose',
                lastName: 'Wehner',
                state: 'VA',
                transaction: {
                    amount: '318.35',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Herman-Langworth',
                    name: 'Investment Account 3128',
                    type: 'deposit',
                    account: '82157760'
                }
            },
            {
                firstName: 'Jose',
                lastName: 'Wehner',
                state: 'VA',
                transaction: {
                    amount: '214.23',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Kozey-Moore',
                    name: 'Money Market Account 9764',
                    type: 'invoice',
                    account: '80675575'
                }
            },
            {
                firstName: 'Jose',
                lastName: 'Wehner',
                state: 'VA',
                transaction: {
                    amount: '883.50',
                    date: '2012-02-02T08:00:00.000Z',
                    business: 'Kozey-Moore',
                    name: 'Checking Account 2946',
                    type: 'deposit',
                    account: '68251601'
                }
            }
        ];
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
                <Tabs defaultActiveKey="tab1">
                    <TabPane tab="Dataset 1" key="tab1">
                        <ReactPivot rows={rows}
                          dimensions={dimensions}
                          reduce={reduce}
                          calculations={calculations}
                          activeDimensions={[dimensions[0].title]}
                          key="dataset1"
                          compact />
                    </TabPane>
                    <TabPane tab="Dataset 2" key="tab2">
                        <ReactPivot rows={rows}
                          dimensions={dimensions}
                          reduce={reduce}
                          calculations={calculations}
                          activeDimensions={[dimensions[0].title]}
                          key="dataset2"
                          compact />
                    </TabPane>
                    <TabPane tab="Dataset 3" key="tab3">
                        <ReactPivot rows={rows}
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
