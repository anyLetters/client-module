import React, { Component } from 'react';
import Menu from '../../containers/Menu';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { isEmpty } from 'ramda';
import moment from 'moment';
import 'moment/locale/ru';
import './style.css';
import './media.css';

export const STATUSES = [
    {
        "title": "REFUSAL",
        "value": "Отказ"
    },
    {
      "title": "NEW",
      "value": "Новая"
    },
    {
      "title": "PROCESSING",
      "value": "В Обработке",
    },
    {
      "title": "FIRST_APPROVAL",
      "value": "Согласование"
    },
    {
      "title": "FIRST_LEGAL_ASSESSMENT",
      "value": "Юр. оценка"
    },
    {
      "title": "SECOND_APPROVAL",
      "value": "Согласование"
    },
    {
      "title": "WAITING_FOR_INVESTMENT",
      "value": "Инвестирование"
    },
    {
      "title": "CREATION_OF_CONTRACTS",
      "value": "Создание договоров"
    },
    {
      "title": "SECOND_LEGAL_ASSESSMENT",
      "value": "Юр. оценка"
    },
    {
      "title": "WAITING_FOR_SIGNING",
      "value": "Подписание"
    },
    {
      "title": "BECAME_LOAN",
      "value": "Займ"
    }
];

function DummyLoan(props) {
    return (
        <div>
            <div className='block-loan'>
                <div className="loan-info">
                    <p className={`p-dummy${props.error ? '-error' : ''}`} style={{width: '80%', marginBottom: 8, height: '16px'}}>{` `}</p>
                    <p className={`p-dummy${props.error ? '-error' : ''}`} style={{width: '60%', height: '16px'}}>{` `}</p>
                </div>
                <div className="loan-payment">
                    <p className={`p-dummy${props.error ? '-error' : ''}`} style={{width: '30%', height: '16px'}}>{` `}</p>
                </div>
                <div className="loan-under">
                    <p className={`p-dummy${props.error ? '-error' : ''}`} style={{width: '100%'}}>{` `}</p>
                </div>
            </div>
        </div>
    );
}

function DummyApplication(props) {
    return (
        <div>
            <div className='block-application'>
                <div className="application-info">
                    <p className={`p-dummy${props.error ? '-error' : ''}`} style={{width: '80%', marginBottom: 8, height: '16px'}}>{` `}</p>
                    <p className={`p-dummy${props.error ? '-error' : ''}`} style={{width: '60%', height: '16px'}}>{` `}</p>
                </div>
                <div className="application-under">
                    <p className={`p-dummy${props.error ? '-error' : ''}`} style={{width: '25%'}}>{` `}</p>
                </div>
            </div>
        </div>
    );
}

function findUpcomingPayment(schedule) {
    let index = schedule.findIndex((payment, i) =>  
        new Date().getTime() <= new Date(
            `${payment.date.replace(/-/g, "/")} 00:00:00`
        ).setDate(new Date(`${payment.date.replace(/-/g, "/")} 00:00:00`).getDate() + 1)
    );
    return schedule[index];
}

function calculatePayment(overall) {
    return overall.map(obj => Object.values(obj).reduce((a, b) => a + b)).reduce((a, b) => a + b);
}

function Loan(props) {
    const { loan } = props;
    const date = moment.utc(loan.createdAt, 'YYYY-MM-DD').local().format('D MMMM YYYY');
    const upcomingPaymentDate = findUpcomingPayment(loan.contract.schedule);
    const upcomingPayment = calculatePayment([loan.contract.upcomingPayment, loan.contract.overduePayment]);
    const isOverdue = calculatePayment([loan.contract.upcomingPayment]) !== upcomingPayment;

    return (
        <Link to={`/loan/${loan.id}`}>
            <div className='block-loan'>
                <div className="loan-info">
                    <p>{`${loan.number} от ${date}`}</p>
                    <p className='grey'>{loan.contract.loan.toLocaleString('ru')} ₽ на {loan.contract.period} мес. под {loan.contract.percent}%</p>
                </div>
                <div className="loan-payment">
                    <span className={isOverdue && 'red'}>{upcomingPayment.toLocaleString('ru')} ₽</span>
                    <span>{` · `}</span>
                    <span>{moment(upcomingPaymentDate.date).format('D MMMM')}</span>
                </div>
                <div className="loan-under">
                    <span className='grey'>Предстоящий платеж</span>
                    <Link to={`/loan/${loan.id}/pay`} className='blue'>Оплатить</Link>
                    {/* <span className='blue' onClick={() => props.link(`/loan/${loan.id}/pay`)}>Оплатить</span> */}
                </div>
            </div>
        </Link>
    );
}

function Application(props) {
    const { application } = props;
    const date = moment.utc(application.createdAt, 'YYYY-MM-DD').local().format('D MMMM YYYY');
    const status = application.status.title;
    return (
        // <Link to={`/application/${application.id}`}>
            <div className='block-application'>
                <div className="application-info">
                    <p>{`№${application.number} от ${date}`}</p>
                    <p className='grey'>
                        {application.calculations[0].loan.toLocaleString('ru')} ₽ на {application.calculations[0].period} мес. под {application.calculations[0].percent}%
                    </p>
                </div>
                <div className="application-under">
                    <span className={status === 'REFUSAL' ? 'red' : status === 'BECAME_LOAN' ? 'green' : ''}>
                        {STATUSES.find(e => status === e.title).value}
                    </span>
                </div>
            </div>
        // </Link>
    );
}

function Tabs(props) {
    return (
        <div className='tabs'>
            {props.children}
        </div>
    );
}

function TabItem(props) {
    return (
        <div
            className={`tabs-item ${props.active === props.value ? '' : 'grey'}`}
            onClick={() => props.onSelectTab(props.value)}>
            {props.value}
        </div>
    );
}

export default class MainPage extends Component {

    state = {
        activeTab: 'Займы'
    }

    componentDidMount() {
        this.props.fetchLoans();
        this.props.fetchApplications();
    }

    renderLoans = (loans) => {
        return (
            <div className='loans'>
                {isEmpty(loans)
                ? <div className='loans-not-found'>Займы не найдены :(</div>
                : loans.map((loan, i) => <Loan key={i} loan={loan} link={this.props.history.push} /> )}
            </div>
        );
    }

    renderApplications = (applications) => {
        return (
            <div className='applications'>
                {isEmpty(applications)
                ? <div className='applications-not-found'>Заявки не найдены :(</div>
                : applications.map((application, i) => <Application key={i} application={application} link={this.props.history.push} /> )}
            </div>
        );
    }

    onSelectTab = (value) => {
        this.setState({ activeTab: value });
    }

    render() {
        const { loans, applications, match } = this.props;
        const { activeTab } = this.state;
        return (
            <div className='main-page'>
                <div className="wrapper">
                    <div className="content-main">
                        <div className="content-main-upper">
                            <Menu />
                            <Tabs>
                                <TabItem value='Займы' active={activeTab} onSelectTab={this.onSelectTab} />
                                <TabItem value='Заявки' active={activeTab} onSelectTab={this.onSelectTab} />
                            </Tabs>
                            {activeTab === 'Займы' ? (loans.fetching || loans.error)
                                ? <DummyLoan error={loans.error} />
                                : this.renderLoans(loans.data) : null}
                            {activeTab === 'Заявки' ? (applications.fetching || applications.error)
                                ? <DummyApplication error={applications.error} />
                                : this.renderApplications(applications.data) : null}
                        </div>
                        <div className='content-main-footer'>
                            <input type="button" className='input input-submit' value='Подать заявку на заём'/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}