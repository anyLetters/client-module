import { connect } from 'react-redux';
import { fetchLoans, resetLoansState } from '../actions';
import LoanPage from '../components/LoanPage/LoanPage.js';

function mapStateToProps(state) {
    return {
        ...state.loans
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchLoans: () => dispatch(fetchLoans()),
        // resetLoansState: () => dispatch(resetLoansState())
    };
}

const Loan = connect(mapStateToProps, mapDispatchToProps)(LoanPage);

export default Loan;