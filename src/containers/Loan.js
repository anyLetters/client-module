import { connect } from 'react-redux';
import { fetchLoans, resetLoansState } from '../actions';
import LoanPage from '../components/LoanPage/LoanPage.js';

function mapStateToProps(state) {
    return {
        ...state.loans,
        user: state.user.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchLoans: () => dispatch(fetchLoans()),
        // resetLoansState: () => dispatch(resetLoansState())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanPage);