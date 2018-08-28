import { connect } from 'react-redux';
import { fetchLoans, resetLoansState, fetchApplications, resetApplicationsState } from '../actions';
import MainPage from '../components/MainPage/MainPage.js';

function mapStateToProps(state) {
    return {
        loans: {...state.loans},
        applications: {...state.applications}
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchLoans: () => dispatch(fetchLoans()),
        resetLoansState: () => dispatch(resetLoansState()),
        fetchApplications: () => dispatch(fetchApplications()),
        resetApplicationsState: () => dispatch(resetApplicationsState()), 
    };
}

const Main = connect(mapStateToProps, mapDispatchToProps)(MainPage);

export default Main;