import {
    FETCH_APPLICATIONS_BEGIN,
    FETCH_APPLICATIONS_SUCCESS,
    FETCH_APPLICATIONS_FAILURE,
    RESET_APPLICATIONS_STATE
} from '../actions/index';

const initialState = {
    data: [],
    fetching: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_APPLICATIONS_BEGIN:
            return {
                ...state,
                fetching: true,
                error: null
            };

        case FETCH_APPLICATIONS_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload.applications.reverse()
            };

        case FETCH_APPLICATIONS_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload.error,
                data: []
            };

        case RESET_APPLICATIONS_STATE:
            return initialState;

        default:
            return state;
    }
}