import React, { Component } from 'react';
import Menu from '../../containers/Menu';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { isEmpty } from 'ramda';
import { WorkerAPI, GetFullName, PersonAPI, FacilityAPI } from '../../api/index';
import moment from 'moment';
import Loader from '../Loader/Loader';
import './style.css';
import './media.css';

function DummyInfo(props) {
    return (
        <div className='application-info red'>
            <div style={{backgroundColor: '#dd6666', opacity: '.25', width: '40%', height: '100%', borderRadius: '4px'}}> </div>
        </div>
    );
}

function BlockRow(props) {
    return (
        <div>
            <p className="grey">{props.title}</p>
            <p className={props.red ? 'red' : ''}>{props.text || ' '}</p>
        </div>
    );
}

function Table(props) {
    return (
        <table>
            <tbody>
                {props.children}
            </tbody>
        </table>
    );
}

function TableRow(props) {
    return (
        <tr>
            <td className={props.red ? 'red' : ''}>{props.colOne.toLocaleString('ru')} ₽</td>
            <td>— {props.colTwo}</td>
        </tr>
    )
}

function DoubleRow(props) {
    return (
        <div className='application-info'>
            <div className='application-info-row'>
                <p>{props.firstRow}</p>
                <p className='grey'>{props.secondRow}</p>
            </div>
        </div>
    );
}

export default class ApplicationPage extends Component {

    state = {
        application: null,
        workerError: null
    }

    componentDidMount() {
        if (isEmpty(this.props.applications.data)) {
            this.props.fetchApplications().then(this.fetchAll).catch(console.error);
        } else {
            this.findApplication(this.props.applications.data);
        }
    }

    static getDerivedStateFromProps(props, state) {
        const index = props.applications.data.findIndex(application => application.id === props.match.params.id);
        if (props.applications.data[index] !== state.application) {
            return {
                application: props.applications.data[index]
            };
        }
        // if (state.user !== props.user.data) {
        //     return {
        //         user: props.user.data
        //     };
        // }
        // if (state.persons !== props.persons) {
        //     return {
        //         persons: props.persons
        //     };
        // }
        // if (state.facilities !== props.facilities) {
        //     return {
        //         facilities: props.facilities
        //     };
        // }
        // if (state.workers !== props.workers) {
        //     return {
        //         workers: props.workers
        //     };
        // }
        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        const index = nextProps.applications.data.findIndex(application => application.id === this.props.match.params.id);
        if (nextProps.applications.data[index] !== this.state.application) {
            return true;
        }
        // if (this.state.user !== nextProps.user.data) {
        //     return true;
        // }
        // if (this.state.persons !== nextProps.persons) {
        //     return true;
        // }
        // if (this.state.facilities !== nextProps.facilities) {
        //     return true;
        // }
        // if (this.state.workers !== nextProps.workers) {
        //     return true;
        // }
        if (this.props.user !== nextProps.user.data) {
            return true;
        }
        if (this.props.persons !== nextProps.persons) {
            return true;
        }
        if (this.props.facilities !== nextProps.facilities) {
            return true;
        }
        if (this.props.workers !== nextProps.workers) {
            return true;
        }
        return false;
    }

    findApplication = (applications) => {
        const index = [
            applications
            ? applications
            : this.props.applications.data
        ].findIndex(application => application.id === this.props.match.params.id);
        this.setState({ application: applications[index] }, this.findAllEntities);
    }

    toggle = () => {
        this.setState(prevState => ({isToggled: !prevState.isToggled}));
    }

    fetchAll = () => {
        return Promise.resolve()
                .then(this.fetchWorkers)
                .then(this.fetchPersons)
                .then(this.fetchFacilities)
    }

    findAllEntities = () => {
        this.findWorkersToFetch();
        this.findPersonsToFetch();
        this.findFacilitiesToFetch();
    }

    findWorkersToFetch = () => {
        const { application } = this.state;

        if (isEmpty(this.props.workers)) {
            this.fetchWorkers();
            return;
        }

        let workersToFetch = [];

        Object.keys(application.workers).forEach(key => {
            if (application.workers[key]) {
                const index = this.props.workers.findIndex(worker => worker.id === application.workers[key]);
                if (index < 0) {
                    workersToFetch.push({ id: application.workers[key] });
                }
            }
        })

        !isEmpty(workersToFetch) && this.props.fetchWorkers(workersToFetch);
    }

    findWorkersToRender = (workers) => {
        const { application } = this.state;

        return {
            manager: workers.find(worker => worker.id === application.workers.manager),
            supervisor: workers.find(worker => worker.id === application.workers.supervisor),
            lawyer: workers.find(worker => worker.id === application.workers.lawyer)
        };
    }

    findPersonsToFetch = (data) => {
        const { application } = this.state;

        if (isEmpty(this.props.persons)) {
            this.fetchPersons();
            return;
        }

        let personsToFetch = [];

        application.persons.forEach(person => {
            const index = this.props.persons.findIndex(e => e.id === person.id);
            if (index < 0) personsToFetch.push(person);
        });

        !isEmpty(personsToFetch) && this.props.fetchPersons(personsToFetch);
    }

    findPersonsToRender = (persons) => {
        const { application } = this.state;

        return persons.map(person => {
            const index = application.persons.findIndex(e => e.id === person.id);
            return index >= 0 ? {...person, roles: application.persons[index].roles} : null;
        }).filter(e => e);
    }

    findFacilitiesToFetch = (data) => {
        const { application } = this.state;

        if (isEmpty(this.props.facilities)) {
            this.fetchFacilities();
            return;
        }

        let facilitiesToFetch = [];

        application.facilities.forEach(facility => {
            const index = this.props.facilities.findIndex(e => e.id === facility);
            if (index < 0) facilitiesToFetch.push({id: facility});
        });

        !isEmpty(facilitiesToFetch) && this.props.fetchFacilities(facilitiesToFetch);
    }

    findFacilitiesToRender = (facilities) => {
        const { application } = this.state;

        return facilities.map(facility => {
            const index = application.facilities.findIndex(e => e === facility.id);
            return index >= 0 ? facility : null;
        }).filter(e => e);
    }

    fetchWorkers = () => {
        const { applications } = this.props;
        const application = applications.data[applications.data.findIndex(application => application.id === this.props.match.params.id)];
        const workers = Object.keys(application.workers).map(worker => {
            if (!application.workers[worker]) return null;
            if (typeof application.workers[worker] === 'string') return { id: application.workers[worker] };
            if (application.workers[worker].hasOwnProperty('error')) return application.workers[worker];
            return null;
        }).filter(e => e);
        !isEmpty(workers) ? this.props.fetchWorkers(workers) : null;
    }

    fetchPersons = () => {
        const { applications } = this.props;
        const application = applications.data[applications.data.findIndex(application => application.id === this.props.match.params.id)];
        const persons = application.persons.map(person => {
            if (person.hasOwnProperty('error')) return { id: person.id, ...person };
            return person;
        }).filter(e => e);
        !isEmpty(persons) ? this.props.fetchPersons(persons) : null;
    }

    fetchFacilities = () => {
        const { applications } = this.props;
        const application = applications.data[applications.data.findIndex(application => application.id === this.props.match.params.id)];
        const facilities = application.facilities.map(facility => {
            if (typeof facility === 'string') return { id: facility };
            if (facility.hasOwnProperty('error')) return { id: facility.id, ...facility };
            return facility;
        }).filter(e => e);
        !isEmpty(facilities) ? this.props.fetchFacilities(facilities) : null;
    }

    render() {
        const { application, workerError } = this.state;
        const { applications, workers, persons, facilities, history } = this.props;

        if (!application || applications.fetching || applications.error) return (
            <div className='application-page'>
                <div>
                    <Menu active={'loans'} />
                    <div className="wrapper">
                        <div className="content-application">
                            <Loader/>
                        </div>
                    </div>
                </div>
            </div>
        );

        const lastCalculations = application.calculations[application.calculations.length - 1];

        let matchedPersons = this.findPersonsToRender(persons);
        let matchedWorkers = this.findWorkersToRender(workers);
        let matchedFacilities = this.findFacilitiesToRender(facilities);

        return (
            <div className='application-page'>
                <div>
                    <Menu active={'loans'} />
                    <div className="wrapper">
                        <div className="content-application">
                            <Header title={`Заявка №${application.number}`} page='application' back={() => history.push('/loans')} />
                            <div className="blocks-application">
                                <div className="blocks-application-1">
                                    <div className="block-application">
                                        <div className="block-application-row">
                                            <BlockRow
                                                title='Параметры заявки'
                                                text={`${lastCalculations.loan.toLocaleString('ru')} ₽ на ${lastCalculations.period} мес. под ${lastCalculations.percent}%`} />
                                        </div>
                                        <div className="block-application-row">
                                            <BlockRow
                                                title='Дата заявки'
                                                text={`${moment(application.createdAt).format('DD MMM YYYY')}`} />
                                            <BlockRow
                                                title='Статус'
                                                text={`${application.status.name}`} />
                                        </div>
                                        <div className="block-application-row">
                                            <BlockRow
                                                title='Персональный менеджер'
                                                text={
                                                    workerError
                                                    ? 'Ошибка'
                                                    : typeof matchedWorkers.manager !== 'string' && GetFullName(matchedWorkers.manager)
                                                }
                                                red={workerError}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="blocks-application-2">
                                    <div className="application-list-of">
                                        <h4>Участники</h4>
                                        {application && !isEmpty(matchedPersons) && matchedPersons.map((e, i) => {
                                            if (e.hasOwnProperty('error')) return <DummyInfo key={i} />;
                                            return <DoubleRow
                                                        key={i}
                                                        firstRow={GetFullName(e)}
                                                        secondRow={
                                                            GetFullName(e) && e.roles[0][0].toUpperCase() + e.roles.join(', ').slice(1).toLowerCase()
                                                        } />;
                                        })}
                                    </div>
                                    {!isEmpty(matchedFacilities) && <div className="application-list-of">
                                        <h4>Залог</h4>
                                        {application && matchedFacilities.map((e, i) => {
                                            if (e.hasOwnProperty('error')) return <DummyInfo key={i} />;
                                            return typeof e === 'string'
                                            ? null
                                            : <DoubleRow
                                                    key={i}
                                                    firstRow={[
                                                        `${e.type.value} ${e.area} м`,
                                                        <sup key={1}>2</sup>,
                                                        e.assessment ? ` — ${e.assessment.averagePrice.toLocaleString('ru')} ₽` : null
                                                    ]}
                                                    secondRow={e.address} />;
                                        })}
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}