import * as actions from '../actions/navigation/definitions';

const initialState = {
    current: 0
};

export default function navigation(state = initialState, action = {}) {
    switch (action.type) {
        case actions.PREVIOUS:
            return {
                current: --state.current
            };
        case actions.NEXT:
            return {
                current: ++state.current
            };
        default:
            return state;
    }
}