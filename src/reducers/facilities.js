import { ADD_FACILITIES } from '../actions/index';

const initialState = [];

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FACILITIES:
            return [...state, ...action.payload.facilities];

        default:
            return state;
    }
}