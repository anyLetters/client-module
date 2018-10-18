import { LoanAPI } from '../api/index';

export const FETCH_INVESTMENTS_BEGIN = 'FETCH_INVESTMENTS_BEGIN';
export const FETCH_INVESTMENTS_SUCCESS = 'FETCH_INVESTMENTS_SUCCESS';
export const FETCH_INVESTMENTS_FAILURE = 'FETCH_INVESTMENTS_FAILURE';
export const RESET_INVESTMENTS_STATE = 'RESET_INVESTMENTS_STATE';

export const fetchInvestmentsBegin = () => ({
    type: FETCH_INVESTMENTS_BEGIN
});

export const fetchInvestmentsSuccess = Investments => ({
    type: FETCH_INVESTMENTS_SUCCESS,
    payload: { Investments }
});

export const fetchInvestmentsFailure = error => ({
    type: FETCH_INVESTMENTS_FAILURE,
    payload: { error }
});

export const resetInvestmentsState = () => ({
    type: RESET_INVESTMENTS_STATE
});

export function fetchInvestments() {
    return dispatch => {
        dispatch(fetchInvestmentsBegin());

        return LoanAPI.getAllByPersonId()
                .then(json => {
                    dispatch(fetchInvestmentsSuccess(json))
                    return json;
                })
                .catch(error => dispatch(fetchInvestmentsFailure(error)));
        // return LoanAPI.getLoan('МК 1217/93')
        //             .then(json => {
        //                 dispatch(fetchInvestmentsSuccess([json]))
        //                 return json;
        //             })
        //             .catch(error => dispatch(fetchInvestmentsFailure(error)));
    };
}