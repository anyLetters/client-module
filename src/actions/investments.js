import { LoanAPI } from '../api/index';

export const FETCH_INVESTMENTS_BEGIN = 'FETCH_INVESTMENTS_BEGIN';
export const FETCH_INVESTMENTS_SUCCESS = 'FETCH_INVESTMENTS_SUCCESS';
export const FETCH_INVESTMENTS_FAILURE = 'FETCH_INVESTMENTS_FAILURE';
export const RESET_INVESTMENTS_STATE = 'RESET_INVESTMENTS_STATE';

export const fetchInvestmentsBegin = () => ({
    type: FETCH_INVESTMENTS_BEGIN
});

export const fetchInvestmentsSuccess = investments => ({
    type: FETCH_INVESTMENTS_SUCCESS,
    payload: { investments }
});

export const fetchInvestmentsFailure = error => ({
    type: FETCH_INVESTMENTS_FAILURE,
    payload: { error }
});

export const resetInvestmentsState = () => ({
    type: RESET_INVESTMENTS_STATE
});

export function fetchInvestments(id) {
    return dispatch => {
        dispatch(fetchInvestmentsBegin());

        return LoanAPI.getLoans({
            page: 0,
            direction: 'desc',
            size: 1000,
            property: 'number',
            body: {
                collection: false,
                statuses: ['Ожидает инвестирование'],
                participant: null
            }
        }).then(json => {
            dispatch(fetchInvestmentsSuccess(json.content))
            return json;
        }).catch(error => dispatch(fetchInvestmentsFailure(error)));
    };
}