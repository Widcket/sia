import * as actions from './definitions';

export function previous() {
    return {
        type: actions.PREVIOUS
    };
}

export function next() {
    return {
        type: actions.NEXT
    };
}