import { ApplicationAPI } from '../api/index';

export const FETCH_APPLICATIONS_BEGIN = 'FETCH_APPLICATIONS_BEGIN';
export const FETCH_APPLICATIONS_SUCCESS = 'FETCH_APPLICATIONS_SUCCESS';
export const FETCH_APPLICATIONS_FAILURE = 'FETCH_APPLICATIONS_FAILURE';
export const RESET_APPLICATIONS_STATE = 'RESET_APPLICATIONS_STATE';

export const fetchApplicationsBegin = () => ({
    type: FETCH_APPLICATIONS_BEGIN
});

export const fetchApplicationsSuccess = applications => ({
    type: FETCH_APPLICATIONS_SUCCESS,
    payload: { applications }
});

export const fetchApplicationsFailure = error => ({
    type: FETCH_APPLICATIONS_FAILURE,
    payload: { error }
});

export const resetApplicationsState = () => ({
    type: RESET_APPLICATIONS_STATE
});

export function fetchApplications(id) {
    return dispatch => {
        dispatch(fetchApplicationsBegin());

        return ApplicationAPI.findAllByPersonId()
                .then(json => {
                    dispatch(fetchApplicationsSuccess([json]))
                    return json;
                })
                .catch(error => dispatch(fetchApplicationsFailure(error)));
    };
}