import { PersonAPI } from '../api/index';

export const ADD_PERSONS = 'ADD_PERSONS';

export const addPersons = persons => ({
    type: ADD_PERSONS,
    payload: { persons }
});

export function fetchPersons(persons) {
    return dispatch => {
        return Promise.all(persons.map(person => PersonAPI.get(person.id).catch(e => ({
                ...e,
                id: person.id
            }))))
            .then(json => {
                dispatch(addPersons(json))
                return json;
            })
    };
}