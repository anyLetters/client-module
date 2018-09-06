import { FETCH_USER_BEGIN, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, RESET_USER_STATE } from '../actions/index';

const initialState = {
    data: {},
    fetching: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_BEGIN:
            return {
                ...state,
                fetching: true,
                error: null
            };

        case FETCH_USER_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload.user
            };

        case FETCH_USER_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload.error,
                data: []
            };

        case RESET_USER_STATE:
            return initialState;

        default:
            return state;
    }
}