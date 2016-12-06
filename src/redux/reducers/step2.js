import * as actions from '../actions/step2/definitions';

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

const initialState = {
    stage: 0,
    currentFile: '',
    defaultTab: 'tab1',
    dimensions,
    calculations
};

export default function step2(state = initialState, action = {}) {
    switch (action.type) {
        case actions.SET_DEFAULT_TAB:
            return {
                ...state,
                defaultTab: action.defaultTab,
                error: action.error
            };
        default:
            return state;
    }
}