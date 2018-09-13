import { connect } from 'react-redux';
import { fetchLoans } from '../actions';
import PayPopup from '../components/PayPopup/PayPopup.js';

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

const Pay = connect(mapStateToProps, mapDispatchToProps)(PayPopup);

export default Pay;