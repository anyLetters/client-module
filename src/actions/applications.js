import { ApplicationAPI } from '../api/index';

export const FETCH_APPLICATIONS_BEGIN = 'FETCH_APPLICATIONS_BEGIN';
export const FETCH_APPLICATIONS_SUCCESS = 'FETCH_APPLICATIONS_SUCCESS';
export const FETCH_APPLICATIONS_FAILURE = 'FETCH_APPLICATIONS_FAILURE';
export const RESET_APPLICATIONS_STATE = 'RESET_APPLICATIONS_STATE';
// export const LOAD_WORKER_TO_APPLICATION = 'LOAD_WORKER_TO_APPLICATION';
// export const LOAD_PERSONS_TO_APPLICATION = 'LOAD_PERSONS_TO_APPLICATION';
// export const LOAD_FACILITIES_TO_APPLICATION = 'LOAD_FACILITIES_TO_APPLICATION';

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

// export const loadWorkerToApplication = (id, worker, post) => ({
//     type: LOAD_WORKER_TO_APPLICATION,
//     payload: { id, worker, post }
// });

// export const loadPersonsToApplication = (id, persons) => ({
//     type: LOAD_PERSONS_TO_APPLICATION,
//     payload: { id, persons }
// });

// export const loadFacilitiesToApplication = (id, facilities) => ({
//     type: LOAD_FACILITIES_TO_APPLICATION,
//     payload: { id, facilities }
// });

export function fetchApplications(id) {
    return dispatch => {
        dispatch(fetchApplicationsBegin());

        return ApplicationAPI.findAllByPersonId().then(json => {
            dispatch(fetchApplicationsSuccess(json))
            return json;
        }).catch(error => dispatch(fetchApplicationsFailure(error)));
    };
}