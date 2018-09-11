import { ADD_WORKERS } from '../actions/index';

const initialState = [];

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_WORKERS:
            return [...state, ...action.payload.workers];

        default:
            return state;
    }
}