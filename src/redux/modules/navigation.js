const PREVIOUS = 'PREVIOUS';
const NEXT = 'NEXT';

const initialState = {
    current: 0
};

export default function info(state = initialState, action = {}) {
    switch (action.type) {
        case PREVIOUS:
            return {
                ...state,
                current: state.current--
            };
        case NEXT:
            return {
                ...state,
                current: state.current++
            };
        default:
            return state;
    }
}