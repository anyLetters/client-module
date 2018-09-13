import { connect } from 'react-redux';
import {
    fetchApplications,
    fetchWorkers,
    fetchPersons,
    fetchFacilities
} from '../actions';
import ApplicationPage from '../components/ApplicationPage/ApplicationPage.js';
import { isEmpty } from 'ramda';

function findPersonsFromApplication(persons, application) {

    if (isEmpty(application)) return [];

    return persons.map(person => {
        const index = application.persons.findIndex(e => e.id === person.id);
        return index >= 0 ? {...person, roles: application.persons[index].roles} : null;
    }).filter(e => e);
}

function findFacilitiesFromApplication(facilities, application) {

    if (isEmpty(application)) return [];

    return facilities.map(facility => {
        const index = application.facilities.findIndex(e => e === facility.id);
        return index >= 0 ? facility : null;
    }).filter(e => e);
}

function findWorkersFromApplication(workers, application) {

    if (isEmpty(application)) return {};

    return {
        manager: workers.find(worker => worker.id === application.workers.manager) ||
            application.workers.manager,
        supervisor: workers.find(worker => worker.id === application.workers.supervisor) ||
            application.workers.supervisor,
        lawyer: workers.find(worker => worker.id === application.workers.lawyer) ||
            application.workers.lawyer
    };
}

function mapStateToProps(state, props) {
    const application = {
        ...state.applications,
        data: state.applications.data.find(application => application.id === props.match.params.id) || {},
    };

    return {
        application,
        user: state.user,
        persons: findPersonsFromApplication(state.persons, application.data),
        workers: findWorkersFromApplication(state.workers, application.data),
        facilities: findFacilitiesFromApplication(state.facilities, application.data)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchApplications: () => dispatch(fetchApplications()),
        fetchFacilities: facilities => dispatch(fetchFacilities(facilities)),
        fetchWorkers: workers => dispatch(fetchWorkers(workers)),
        fetchPersons: persons => dispatch(fetchPersons(persons))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationPage);