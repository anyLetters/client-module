import { PersonAPI } from '../api/index';

export const FETCH_USER_BEGIN = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const RESET_USER_STATE = 'RESET_USER_STATE';

export const fetchUserBegin = () => ({
    type: FETCH_USER_BEGIN
});

export const fetchUserSuccess = user => ({
    type: FETCH_USER_SUCCESS,
    payload: { user }
});

export const fetchUserFailure = error => ({
    type: FETCH_USER_FAILURE,
    payload: { error }
});

export const resetUserState = () => ({
    type: RESET_USER_STATE
});

export function fetchUser() {
    return dispatch => {
        dispatch(fetchUserBegin());

        return PersonAPI.getCurrentPerson()
                .then(json => {
                    dispatch(fetchUserSuccess(json))
                    return json;
                })
                .catch(error => dispatch(fetchUserFailure(error)));
    };
}