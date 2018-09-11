import { FETCH_LOANS_BEGIN, FETCH_LOANS_SUCCESS, FETCH_LOANS_FAILURE, RESET_LOANS_STATE } from '../actions/index';

const initialState = {
    data: [],
    fetching: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LOANS_BEGIN:
            return {
                ...state,
                fetching: true,
                error: null
            };

        case FETCH_LOANS_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload.loans
            };

        case FETCH_LOANS_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload.error,
                data: []
            };

        case RESET_LOANS_STATE:
            return initialState;

        default:
            return state;
    }
}