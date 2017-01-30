import * as actions from '../actions/step2/definitions';

/*
//
// There won't be custom transactions (functions)
//
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
*/

//
// No calculations either, unless there's time to do that modal
//

/*
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
*/

// const calculations = [];

const initialState = {
    stage: 0,
    loadingData: true,
    currentFile: '',
    defaultTab: null,
    filter: ''
};

export default function step2(state = initialState, action = {}) {
    const newState = { ...state };

    switch (action.type) {
        case actions.SET_DEFAULT_TAB:
            newState.defaultTab = action.defaultTab;

            return newState;
        default:
            return state;
    }
}