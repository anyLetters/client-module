import { connect } from 'react-redux';
import {
    fetchLoans,
    resetLoansState,
    fetchApplications,
    resetApplicationsState,
    fetchInvestments,
    resetInvestmentsState
} from '../actions';
import MainPage from '../components/MainPage/MainPage.js';

function mapStateToProps(state) {
    return {
        loans: {...state.loans},
        applications: {...state.applications},
        investments: {...state.investments},
        user: state.user.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchLoans: () => dispatch(fetchLoans()),
        resetLoansState: () => dispatch(resetLoansState()),
        fetchApplications: () => dispatch(fetchApplications()),
        resetApplicationsState: () => dispatch(resetApplicationsState()),
        fetchInvestments: (id) => dispatch(fetchInvestments(id)),
        resetInvestmentsState: () => dispatch(resetInvestmentsState()), 
    };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(MainPage);

export default Main;