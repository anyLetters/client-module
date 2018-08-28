import { connect } from 'react-redux';
import { fetchLoans } from '../actions';
import PayPage from '../components/PayPage/PayPage.js';

function mapStateToProps(state) {
    return {
        ...state.loans
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchLoans: () => dispatch(fetchLoans())
    };
}

const Pay = connect(mapStateToProps, mapDispatchToProps)(PayPage);

export default Pay;