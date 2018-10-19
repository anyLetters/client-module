import { connect } from 'react-redux';
import { fetchLoans, resetLoansState, fetchInvestments } from '../actions';
import LoanPage from '../components/LoanPage/LoanPage.js';

function mapStateToProps(state, props) {
    let data = props.location.pathname.split('/')[1] === 'borrower' ? {...state.loans} : {...state.investments};
    return {
        ...data,
        user: state.user.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchLoans: () => dispatch(fetchLoans()),
        fetchInvestments: (id) => dispatch(fetchInvestments(id)),
        // resetLoansState: () => dispatch(resetLoansState())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanPage);