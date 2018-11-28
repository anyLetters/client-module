import {
    FETCH_DOCUMENTS_BEGIN,
    FETCH_DOCUMENTS_SUCCESS,
    FETCH_DOCUMENTS_FAILURE,
    RESET_DOCUMENTS_STATE
} from '../actions/index';

const initialState = {
    data: [],
    fetching: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DOCUMENTS_BEGIN:
            return {
                ...state,
                fetching: true,
                error: null
            };

        case FETCH_DOCUMENTS_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload.documents
            };

        case FETCH_DOCUMENTS_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload.error,
                data: []
            };

        case RESET_DOCUMENTS_STATE:
            return initialState;

        default:
            return state;
    }
}