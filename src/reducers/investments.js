import {
    FETCH_INVESTMENTS_BEGIN,
    FETCH_INVESTMENTS_SUCCESS,
    FETCH_INVESTMENTS_FAILURE,
    RESET_INVESTMENTS_STATE
} from '../actions/index';

const initialState = {
    data: [],
    fetching: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_INVESTMENTS_BEGIN:
            return {
                ...state,
                fetching: true,
                error: null
            };

        case FETCH_INVESTMENTS_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload.investments
            };

        case FETCH_INVESTMENTS_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload.error,
                data: []
            };

        case RESET_INVESTMENTS_STATE:
            return initialState;

        default:
            return state;
    }
}