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
        user: this.props.user.data,
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
        if (state.user !== props.user.data) {
            return {
                user: props.user.data
            };
        }
        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        const index = nextProps.applications.data.findIndex(application => application.id === this.props.match.params.id);
        if (nextProps.applications.data[index] !== this.state.application) {
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
        this.setState({ application: applications[index] }, this.fetchAll);
    }

    toggle = () => {
        this.setState(prevState => ({isToggled: !prevState.isToggled}));
    }

    fetchAll = () => {
        return Promise.resolve()
                .then(this.fetchWorker)
                .then(this.fetchPersons)
                .then(this.fetchFacilities)
    }

    fetchWorker = () => {
        const { applications } = this.props;
        const application = applications.data[applications.data.findIndex(application => application.id === this.props.match.params.id)];
        if (typeof application.workers.manager === 'string') {
            return WorkerAPI.get(application.workers.manager)
                .then(json => this.props.loadWorkerToApplication(application.id, json, 'manager'))
                .catch(() => this.setState({workerError: 'manager'}));
        } else {
            return null;
        }
    }

    fetchPersons = () => {
        const { applications } = this.props;
        const application = applications.data[applications.data.findIndex(application => application.id === this.props.match.params.id)];
        if (application.persons.findIndex(e => Object.keys(e).length === 2 || e.hasOwnProperty('error')) >= 0) {
            return Promise.all(application.persons.slice(1).map(person => PersonAPI.get(person.id).catch(e => e)))
                    .then(persons => this.props.loadPersonsToApplication(
                        application.id,
                        [ { id: application.persons[0].id, roles: application.persons[0].roles, ...this.props.user.data }, ...persons ]
                    ))
        } else {
            return null;
        }
    }

    fetchFacilities = () => {
        const { applications } = this.props;
        const application = applications.data[applications.data.findIndex(application => application.id === this.props.match.params.id)];
        if (application.facilities.findIndex(e => typeof e === 'string' || e.hasOwnProperty('error')) >= 0) {
            return Promise.all(application.facilities.map(facility => FacilityAPI.get(facility).catch(e => ({id: facility, error: e.message}))))
                    .then(facilities => this.props.loadFacilitiesToApplication(application.id, facilities))
        } else {
            return null;
        }
    }

    render() {
        const { history } = this.props;
        const { application, workerError, user } = this.state;

        if (!application || this.props.applications.fetching || this.props.applications.error) return (
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

        return (
            <div className='application-page'>
                <div>
                    <Menu active={'loans'} />
                    <div className="wrapper">
                        <div className="content-application">
                            <Header title={`Заявка №${application.number}`} page='application' back={() => this.props.history.push('/loans')} />
                            <div className="blocks-application">
                                <div className="blocks-application-1">
                                    <div className="block-application">
                                        <div className="block-application-row">
                                            <BlockRow
                                                title='Параметры заявки'
                                                text={`${application.calculations[0].loan.toLocaleString('ru')} ₽ на ${application.calculations[0].period} мес. под ${application.calculations[0].percent}%`} />
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
                                                    : typeof application.workers.manager !== 'string' && GetFullName(application.workers.manager)
                                                }
                                                red={workerError}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="blocks-application-2">
                                    <div className="application-list-of">
                                        <h4>Участники</h4>
                                        {application && <DoubleRow
                                            firstRow={GetFullName(user)}
                                            secondRow={
                                                GetFullName(user) && application.persons[0].roles[0][0].toUpperCase() + application.persons[0].roles.join(', ').slice(1).toLowerCase()
                                            } />}
                                        {application && application.persons.slice(1).map((e, i) => {
                                            if (e.hasOwnProperty('error') || e.hasOwnProperty('message')) return <DummyInfo/>;
                                            return <DoubleRow
                                                        key={i}
                                                        firstRow={GetFullName(e)}
                                                        secondRow={
                                                            GetFullName(e) && e.roles[0][0].toUpperCase() + e.roles.join(', ').slice(1).toLowerCase()
                                                        } />;
                                        })}
                                    </div>
                                    {!isEmpty(application.facilities) && <div className="application-list-of">
                                        <h4>Залог</h4>
                                        {application && application.facilities.map((e, i) => {
                                            if (e.hasOwnProperty('error')) return <DummyInfo/>;
                                            return typeof e === 'string'
                                            ? null
                                            : <DoubleRow
                                                    key={i}
                                                    firstRow={[
                                                        `${e.type.value} ${e.area} м`,
                                                        <sup>2</sup>,
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