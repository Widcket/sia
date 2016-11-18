import * as actions from '../actions/step1/definitions';

const initialState = {
    stage: 0
};

export default function step1(state = initialState, action = {}) {
    switch (action.type) {
        case actions.NEXT:
            return {
                stage: ++state.stage
            };
        default:
            return state;
    }
}