import { DocumentAPI } from '../api/index';

export const FETCH_DOCUMENTS_BEGIN = 'FETCH_DOCUMENTS_BEGIN';
export const FETCH_DOCUMENTS_SUCCESS = 'FETCH_DOCUMENTS_SUCCESS';
export const FETCH_DOCUMENTS_FAILURE = 'FETCH_DOCUMENTS_FAILURE';
export const RESET_DOCUMENTS_STATE = 'RESET_DOCUMENTS_STATE';

export const fetchDocumentsBegin = () => ({
    type: FETCH_DOCUMENTS_BEGIN
});

export const fetchDocumentsSuccess = documents => ({
    type: FETCH_DOCUMENTS_SUCCESS,
    payload: { documents }
});

export const fetchDocumentsFailure = error => ({
    type: FETCH_DOCUMENTS_FAILURE,
    payload: { error }
});

export const resetDocumentsState = () => ({
    type: RESET_DOCUMENTS_STATE
});

export function fetchDocuments(id) {
    return dispatch => {
        dispatch(fetchDocumentsBegin());

        return DocumentAPI.getEntityDocuments(id).then(json => {
            dispatch(fetchDocumentsSuccess(json))
            return json;
        }).catch(error => dispatch(fetchDocumentsFailure(error)));
    };
}