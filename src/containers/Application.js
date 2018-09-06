import { connect } from 'react-redux';
import {
    fetchApplications,
    resetApplicationsState,
    loadWorkerToApplication,
    loadPersonsToApplication,
    loadFacilitiesToApplication
} from '../actions';
import ApplicationPage from '../components/ApplicationPage/ApplicationPage.js';

function mapStateToProps(state) {
    return {
        applications: state.applications,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchApplications: () => dispatch(fetchApplications()),
        // resetLoansState: () => dispatch(resetLoansState()),
        loadWorkerToApplication: (id, worker, post) => dispatch(loadWorkerToApplication(id, worker, post)),
        loadPersonsToApplication: (id, persons) => dispatch(loadPersonsToApplication(id, persons)),
        loadFacilitiesToApplication: (id, facilities) => dispatch(loadFacilitiesToApplication(id, facilities))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationPage);