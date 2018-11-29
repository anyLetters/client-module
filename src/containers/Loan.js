import { connect } from 'react-redux';
import {
    fetchLoans,
    resetLoansState,
    fetchInvestments,
    fetchWorkers,
    fetchPersons,
    fetchFacilities,
    fetchDocuments,
    resetDocumentsState
} from '../actions';
import LoanPage from '../components/LoanPage/LoanPage.js';
import { isEmpty } from 'ramda';

function findPersonsFromLoan(persons, loan) {

    if (isEmpty(loan)) return [];

    return persons.map(person => {
        const index = loan.persons.findIndex(e => e.id === person.id);
        return index >= 0 ? {...person, roles: loan.persons[index].roles} : null;
    }).filter(e => e);
}

function findFacilitiesFromLoan(facilities, loan) {

    if (isEmpty(loan)) return [];

    return facilities.map(facility => {
        const index = loan.facilities.findIndex(e => e === facility.id);
        return index >= 0 ? facility : null;
    }).filter(e => e);
}

// function findWorkersFromLoan(workers, loan) {

//     if (isEmpty(loan)) return {};

//     return {
//         manager: workers.find(worker => worker.id === loan.workers.manager) ||
//             loan.workers.manager,
//         supervisor: workers.find(worker => worker.id === loan.workers.supervisor) ||
//             loan.workers.supervisor,
//         lawyer: workers.find(worker => worker.id === loan.workers.lawyer) ||
//             loan.workers.lawyer
//     };
// }

function mapStateToProps(state, props) {
    // let data = props.location.pathname.split('/')[1] === 'borrower' ? {...state.loans} : {...state.investments};
    const loan = {
        ...state.loans,
        data: state.loans.data.find(loan => loan.id === props.match.params.id) || {},
    };

    return {
        loan,
        user: state.user.data,
        persons: findPersonsFromLoan(state.persons, loan.data),
        // workers: findWorkersFromLoan(state.workers, loan.data),
        facilities: findFacilitiesFromLoan(state.facilities, loan.data),
        documents: state.documents
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchLoans: () => dispatch(fetchLoans()),
        fetchInvestments: (id) => dispatch(fetchInvestments(id)),
        fetchFacilities: facilities => dispatch(fetchFacilities(facilities)),
        fetchWorkers: workers => dispatch(fetchWorkers(workers)),
        fetchPersons: persons => dispatch(fetchPersons(persons)),
        fetchDocuments: id => dispatch(fetchDocuments(id)),
        resetDocuments: () => dispatch(resetDocumentsState())
        // resetLoansState: () => dispatch(resetLoansState())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanPage);