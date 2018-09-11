import { ADD_PERSONS } from '../actions/index';

const initialState = [];

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PERSONS:
            return [...state, ...action.payload.persons];

        default:
            return state;
    }
}