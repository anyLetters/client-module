import { FacilityAPI } from '../api/index';

export const ADD_FACILITIES = 'ADD_FACILITIES';

export const addFaclities = facilities => ({
    type: ADD_FACILITIES,
    payload: { facilities }
});

export function fetchFacilities(facilities) {
    return dispatch => {
        return Promise.all(facilities.map(facility => FacilityAPI.get(facility.id).catch(e => ({
            ...e,
            id: facility.id
        })))).then(json => {
            dispatch(addFaclities(json))
            return json;
        })
    };
}