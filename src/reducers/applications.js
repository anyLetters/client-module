import {
    FETCH_APPLICATIONS_BEGIN,
    FETCH_APPLICATIONS_SUCCESS,
    FETCH_APPLICATIONS_FAILURE,
    RESET_APPLICATIONS_STATE,
    LOAD_WORKER_TO_APPLICATION,
    LOAD_PERSONS_TO_APPLICATION,
    LOAD_FACILITIES_TO_APPLICATION
} from '../actions/index';

const initialState = {
    data: [],
    fetching: false,
    error: null
}

function workerReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_WORKER_TO_APPLICATION:
            if (state.id !== action.payload.id) {
                return state;
            }

            return {
                ...state,
                workers: {
                    ...state.workers,
                    [action.payload.post]: action.payload.worker
                }
            };

        default:
            return state;
    }
}

function personReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_PERSONS_TO_APPLICATION:
            if (state.id !== action.payload.id) {
                return state;
            }

            return {
                ...state,
                persons: state.persons.map((person, i) => ({ id: person.id, roles: person.roles, ...action.payload.persons[i]}))
            };

        default:
            return state;
    }
}

function facilityReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_FACILITIES_TO_APPLICATION:
            if (state.id !== action.payload.id) {
                return state;
            }

            return {
                ...state,
                facilities: [...action.payload.facilities]
            };

        default:
            return state;
    }
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

        case LOAD_WORKER_TO_APPLICATION:
            return {
                ...state,
                data: state.data.map(application => workerReducer(application, action))
            };

        case LOAD_PERSONS_TO_APPLICATION:
            return {
                ...state,
                data: state.data.map(application => personReducer(application, action))
            };

        case LOAD_FACILITIES_TO_APPLICATION:
            return {
                ...state,
                data: state.data.map(application => facilityReducer(application, action))
            };

        default:
            return state;
    }
}