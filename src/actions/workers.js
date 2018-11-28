import { WorkerAPI } from '../api/index';

export const ADD_WORKERS = 'ADD_WORKERS';

export const addWorkers = workers => ({
    type: ADD_WORKERS,
    payload: { workers }
});

export function fetchWorkers(workers) {
    return dispatch => {
        return Promise.all(workers.map(worker => WorkerAPI.get(worker.id).catch(e => ({
            ...e,
            id: worker.id
        })))).then(json => {
            dispatch(addWorkers(json))
            return json;
        });
    };
}