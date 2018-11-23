import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { isEmpty } from 'ramda';
import { WorkerAPI, GetFullName, PersonAPI, FacilityAPI, ParsePhone } from '../../api/index';
import moment from 'moment';
import Loader from '../Loader/Loader';
import Block from '../elements/Block/Block';
import './style.css';
import './media.css';

function DummyInfo(props) {
    return (
        <div className='application-info red'>
            <div style={{
                backgroundColor: props.error >= 0 ? '#dd6666' : '#f9f9f9',
                opacity: props.error >= 0 ? '.25' : 1,
                width: '40%',
                height: '100%',
                borderRadius: '4px'
            }}> </div>
        </div>
    );
}

function Message({text}) {
    return (
        <p style={{
            backgroundColor: 'rgb(252, 238, 150, .5)',
            padding: '10px 6px',
            fontSize: '12px',
            lineHeight: '16px',
            borderRadius: '4px',
            textAlign: 'left'
        }}>
            {text}
        </p>
    );
}

function BlockCol(props) {
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

    componentDidMount() {
        if (isEmpty(this.props.application.data)) {
            this.props.fetchApplications().then(this.findAllEntities).catch((error) => console.error(error.message));
        } else {
            this.findAllEntities();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.application !== this.props.application) {
            return true;
        }
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

    toggle = () => {
        this.setState(prevState => ({isToggled: !prevState.isToggled}));
    }

    findAllEntities = () => {
        this.findWorkersToFetch();
        this.findPersonsToFetch();
        this.findFacilitiesToFetch();
    }

    findWorkersToFetch = () => {
        const { application } = this.props;

        let workersToFetch = [];

        Object.keys(application.data.workers).forEach(key => {
            if (application.data.workers[key] && this.props.workers[key]) {
                if (this.props.workers[key] === application.data.workers[key]) {
                    workersToFetch.push({ id: application.data.workers[key] });
                }
            }
        })

        !isEmpty(workersToFetch) && this.props.fetchWorkers(workersToFetch);
    }

    findPersonsToFetch = () => {
        const { application } = this.props;

        if (isEmpty(this.props.persons) && !isEmpty(application.data.persons)) {
            this.props.fetchPersons(application.data.persons.map(person => ({ id: person.id })));
            return;
        }

        let personsToFetch = [];

        application.data.persons.forEach(person => {
            const index = this.props.persons.findIndex(e => e.id === person.id);
            if (index < 0) personsToFetch.push(person);
        });

        !isEmpty(personsToFetch) && this.props.fetchPersons(personsToFetch);
    }

    findFacilitiesToFetch = () => {
        const { application } = this.props;

        if (isEmpty(this.props.facilities) && !isEmpty(application.data.facilities)) {
            this.props.fetchFacilities(application.data.facilities.map(facility => ({ id: facility })));
            return;
        }

        let facilitiesToFetch = [];

        application.data.facilities.forEach(facility => {
            const index = this.props.facilities.findIndex(e => e.id === facility);
            if (index < 0) facilitiesToFetch.push({id: facility});
        });

        !isEmpty(facilitiesToFetch) && this.props.fetchFacilities(facilitiesToFetch);
    }

    render() {
        let { application, workers, persons, history, facilities } = this.props;

        if (isEmpty(application.data) || application.fetching || application.error) return (
            <div className='application-page'>
                <div>
                    <div className="wrapper">
                        <div className="content-application">
                            {application.fetching && <Loader/>}
                            {application.error && <div style={{height: '100%', margin: '4% 0'}}>
                                <p className='red' style={{fontWeight: 600}}>Ошибка приложения</p>
                                <p>Не можем загрузить заявку</p>
                                <br/>
                                <Link to='/loans' className='blue'>Вернуться на главную</Link>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        );

        const lastCalculations = application.data.calculations[application.data.calculations.length - 1];

        return (
            <div className='application-page'>
                <div>
                    <div className="wrapper">
                        <div className="content-application">
                            <Header title={`Заявка №${application.data.number}`} page='application' back={() => history.push('/borrower')} />
                            <div className="blocks-body">
                                <div className="blocks-side">
                                    <Block
                                        title='Параметры заявки'
                                        rows={[
                                            [
                                                {
                                                    bottom: `${lastCalculations.loan.toLocaleString('ru')} ₽ на ${lastCalculations.period} мес. под ${lastCalculations.percent}%`
                                                }
                                            ],
                                            [
                                                {
                                                    top: 'Дата',
                                                    bottom: `${moment(application.data.createdAt).format('DD MMMM')}`, style: { top: 'grey' }
                                                },
                                                {
                                                    top: 'Статус',
                                                    bottom: `${application.data.status.name}`, style: { top: 'grey' }
                                                }
                                            ],
                                            [
                                                {
                                                    top: 'Персональный менеджер',
                                                    bottom: workers.manager.hasOwnProperty('error')
                                                    ? 'Ошибка'
                                                    : typeof workers.manager !== 'string' && GetFullName(workers.manager),
                                                    style: { top: 'grey' }
                                                }
                                            ]
                                    ]}/>
                                    {!(isEmpty(application.data) || isEmpty(application.data.persons)) && <Block
                                        title='Участники'
                                        rows={[
                                            (((application || {}).data || {}).persons || []).map((e, i) => {
                                                const index = persons.findIndex(p => e.id === p.id);
                                                if ((persons[i] && persons[i].hasOwnProperty('error')) || index < 0) {
                                                    return { top: <DummyInfo key={i} error={index} /> };
                                                }
                                                return {
                                                    top: GetFullName(persons[i]),
                                                    bottom: GetFullName(persons[i]) && e.roles[0][0].toUpperCase() + e.roles.join(', ').slice(1).toLowerCase(),
                                                    style: { bottom: 'grey' }
                                                };
                                            })
                                        ]} />}
                                    {!(isEmpty(application.data) || isEmpty(application.data.facilities)) && <Block
                                        title='Залог'
                                        rows={[
                                            (((application || {}).data || {}).facilities || []).map((e, i) => {
                                                const index = facilities.findIndex(f => e === f.id);
                                                if ((facilities[i] && facilities[i].hasOwnProperty('error')) || index < 0) {
                                                    return { top: <DummyInfo key={i} error={index} /> };
                                                }
                                                return {
                                                    top: `${facilities[i].type.value} ${facilities[i].area} м²${facilities[i].assessment ? ` — ${facilities[i].assessment.averagePrice.toLocaleString('ru')} ₽` : null}`,
                                                    bottom: facilities[i].address.mergedAddress,
                                                    style: { bottom: 'grey' }
                                                };
                                            })
                                        ]} />}
                                </div>
                                <div className="blocks-side">
                                    <Block
                                        title='Документы'
                                        customContent={() => (
                                            <div>
                                                <Message text={
                                                    `Подпишите документы по одному или все сразу. Для подписания пришлем СМС-код на телефон: ${ParsePhone(this.props.user.data.phone)}`
                                                } />
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}