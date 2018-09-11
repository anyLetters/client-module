import { connect } from 'react-redux';
import {
    fetchApplications,
    fetchWorkers,
    fetchPersons,
    fetchFacilities
    // resetApplicationsState,
    // loadWorkerToApplication,
    // loadPersonsToApplication,
    // loadFacilitiesToApplication
} from '../actions';
import ApplicationPage from '../components/ApplicationPage/ApplicationPage.js';

function mapStateToProps(state) {
    return {
        applications: state.applications,
        user: state.user,
        persons: state.persons,
        workers: state.workers,
        facilities: state.facilities
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchApplications: () => dispatch(fetchApplications()),
        fetchFacilities: facilities => dispatch(fetchFacilities(facilities)),
        fetchWorkers: workers => dispatch(fetchWorkers(workers)),
        fetchPersons: persons => dispatch(fetchPersons(persons))
        // resetLoansState: () => dispatch(resetLoansState()),
        // loadWorkerToApplication: (id, worker, post) => dispatch(loadWorkerToApplication(id, worker, post)),
        // loadPersonsToApplication: (id, persons) => dispatch(loadPersonsToApplication(id, persons)),
        // loadFacilitiesToApplication: (id, facilities) => dispatch(loadFacilitiesToApplication(id, facilities))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationPage);