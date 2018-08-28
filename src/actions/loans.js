import { LoanAPI } from '../api/index';

export const FETCH_LOANS_BEGIN = 'FETCH_LOANS_BEGIN';
export const FETCH_LOANS_SUCCESS = 'FETCH_LOANS_SUCCESS';
export const FETCH_LOANS_FAILURE = 'FETCH_LOANS_FAILURE';
export const RESET_LOANS_STATE = 'RESET_LOANS_STATE';

export const fetchLoansBegin = () => ({
    type: FETCH_LOANS_BEGIN
});

export const fetchLoansSuccess = loans => ({
    type: FETCH_LOANS_SUCCESS,
    payload: { loans }
});

export const fetchLoansFailure = error => ({
    type: FETCH_LOANS_FAILURE,
    payload: { error }
});

export const resetLoansState = () => ({
    type: RESET_LOANS_STATE
});

export function fetchLoans() {
    return dispatch => {
        dispatch(fetchLoansBegin());

        return LoanAPI.getAllByPersonId()
                .then(json => {
                    dispatch(fetchLoansSuccess(json))
                    return json;
                })
                .catch(error => dispatch(fetchLoansFailure(error)));
        // return LoanAPI.getLoan('МК 0518/20')
        //             .then(json => {
        //                 dispatch(fetchLoansSuccess([json]))
        //                 return json;
        //             })
        //             .catch(error => dispatch(fetchLoansFailure(error)));
    };
}