import React, { Component } from 'react';
import Menu from '../../containers/Menu';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { isEmpty } from 'ramda';
import doge from '../../images/1.png';
import { GetFullName } from '../../api/index';
import moment from 'moment';
import Loader from '../Loader/Loader';
import 'moment/locale/ru';
import './style.css';
import './media.css';

function DummyLoan(props) {
    return (
        <div>
            <div className='loans-columns'>
                <div>Договор</div>
                <div>Параметры займа</div>
                <div>Предстоящий платеж</div>
            </div>
            <div className={`block-loan`}>
                <div className="block-loan-mobile">
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
                <div className={`block-loan-desktop ${props.error ? 'block-error' : ''}`}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

function DummyApplication(props) {
    return (
        <div>
            <div className='applications-columns'>
                <div>Параметры займа</div>
                <div>Статус</div>
                <div>Дата и время</div>
            </div>
            <div className={`block-application`}>
                <div className="block-application-mobile">
                    <div className="application-info">
                        <p className={`p-dummy${props.error ? '-error' : ''}`} style={{width: '80%', marginBottom: 8, height: '16px'}}>{` `}</p>
                        <p className={`p-dummy${props.error ? '-error' : ''}`} style={{width: '60%', height: '16px'}}>{` `}</p>
                    </div>
                    <div className="application-under">
                        <p className={`p-dummy${props.error ? '-error' : ''}`} style={{width: '25%'}}>{` `}</p>
                    </div>
                </div>
                <div className={`block-application-desktop ${props.error ? 'block-error' : ''}`}>
                    <div></div>
                    <div></div>
                    <div></div>
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
    let upcomingPaymentDate, upcomingPayment, isOverdue;

    if (loan.contract) {
        upcomingPaymentDate = findUpcomingPayment(loan.contract.schedule);
        upcomingPayment = calculatePayment([loan.contract.upcomingPayment, loan.contract.overduePayment]);
        isOverdue = calculatePayment([loan.contract.upcomingPayment]) !== upcomingPayment;

        return (
            <Link to={`/loan/${loan.id}`}>
                <div className='block-loan'>
                    <div className="block-loan-mobile">
                        <div className="loan-info">
                            <p>{`${loan.number} от ${date}`}</p>
                            <p className='grey'>
                                {loan.contract.loan.toLocaleString('ru')} ₽ на {loan.contract.period} мес. под {loan.contract.percent}%
                            </p>
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
                    <div className="block-loan-desktop">
                        <div>
                            {`№${loan.number} от ${date}`}
                        </div>
                        <div>
                            {loan.contract.loan.toLocaleString('ru')} ₽ на {loan.contract.period} мес. под {loan.contract.percent}%
                        </div>
                        <div>
                            <span className={isOverdue && 'red'}>{upcomingPayment.toLocaleString('ru')} ₽</span>
                            <span>{` · `}</span>
                            <span>{moment(upcomingPaymentDate.date).format('D MMMM')}</span>
                        </div>
                        <div>
                            <Link to={`/loan/${loan.id}/pay`} className='blue'>Оплатить</Link>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <div className='block-loan'>
            <div className="block-loan-mobile-no-1c">
                <div className="loan-info">
                    <p>{`${loan.number} от ${date}`}</p>
                </div>
                <div>
                    <p className='red'>Нет данных о платежах</p>
                </div>
            </div>
            <div className="block-loan-desktop">
                <div>{`${loan.number} от ${date}`}</div>
                <div>-</div>
                <div>Нет данных о платежах</div>
            </div>
        </div>
    );
}

function Application(props) {
    const { application } = props;
    const date = moment.utc(application.createdAt, 'YYYY-MM-DD').local().format('D MMMM YYYY');
    const status = application.status.abbreviation;
    return (
        // <Link to={`/application/${application.id}`}>
            <div className='block-application'>
                <div className="block-application-mobile">
                    <div className="application-info">
                        <p>{`№${application.number} от ${date}`}</p>
                        <p className='grey'>
                            {application.calculations[0].loan.toLocaleString('ru')} ₽ на {application.calculations[0].period} мес. под {application.calculations[0].percent}%
                        </p>
                    </div>
                    <div className="application-under">
                        <span className={status === 'REFUSAL' ? 'red' : status === 'BECAME_LOAN' ? 'green' : ''}>
                            {application.status.abbreviation}
                        </span>
                    </div>
                </div>
                <div className="block-application-desktop">
                    <div>
                        {application.calculations[0].loan.toLocaleString('ru')} ₽ на {application.calculations[0].period} мес. под {application.calculations[0].percent}%
                    </div>
                    <div>
                        <span className={status === 'REFUSAL' ? 'red' : status === 'BECAME_LOAN' ? 'green' : ''}>
                            {/* {STATUSES.find(e => status === e.title).value} */}
                            {application.status.abbreviation}
                        </span>
                    </div>
                    <div>
                        {date}
                        {/* фыоалФЫОАлф офлЫаол фоыал фоыла ФОЫЛа офЛЫполфполдф ОпдлфОЫДЛ фдЫподл */}
                    </div>
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
        activeTab: 'Заявки'
    }

    componentDidMount() {
        document.body.style = 'background: white;';
        if (isEmpty(this.props.loans.data)) {
            this.props.fetchLoans();
        }
        if (isEmpty(this.props.applications.data)) {
            this.props.fetchApplications();
        }
    }

    renderLoans = (loans) => {
        return (
            <div className='loans'>
                <div className='loans-columns'>
                    <div>Договор</div>
                    <div>Параметры займа</div>
                    <div>Предстоящий платеж</div>
                </div>
                {/* {isEmpty(loans)
                ? <div className='loans-not-found'>Займы не найдены :(</div>
                : loans.map((loan, i) => <Loan key={i} loan={loan} link={this.props.history.push} /> )} */}
                {loans.map((loan, i) => <Loan key={i} loan={loan} link={this.props.history.push} /> )}
            </div>
        );
    }

    renderApplications = (applications) => {
        return (
            <div className='applications'>
                <div className='applications-columns'>
                    <div>Параметры займа</div>
                    <div>Статус</div>
                    <div>Дата и время</div>
                </div>
                {/* {isEmpty(applications)
                ? <div className='applications-not-found'>Заявки не найдены :(</div>
                : applications.map((application, i) => <Application key={i} application={application} link={this.props.history.push} /> )} */}
                {applications.map((application, i) => <Application key={i} application={application} link={this.props.history.push} /> )}
            </div>
        );
    }

    renderContent = () => {
        const { loans, applications } = this.props;
        const hasLoans = !isEmpty(loans.data) && !loans.fetching;
        const hasApplications = !isEmpty(applications.data) && !applications.fetching;

        if (loans.fetching || applications.fetching) {
            return <div><Loader/></div>
        }

        if (!hasLoans && !hasApplications) {
            return <div style={{height: '100%', margin: '5% 0'}}><img src={doge} alt=""/><p>Здесь ничего нет</p></div>;
        } else if (hasApplications && hasLoans) {
            return (
                <div>
                    <h3 className='tabs-item'>Займы</h3>
                    {this.renderLoans(loans.data)}
                    <h3 className='tabs-item'>Инвестиции</h3>
                    {this.renderApplications(applications.data)}
                </div>
            )
        }

        if (hasLoans && !hasApplications) {
            return (
                <div>
                    <h3 className='tabs-item'>Займы</h3>
                    {this.renderLoans(loans.data)}
                </div>
            );
        }

        if (hasApplications && !hasLoans) {
            return (
                <div>
                    <h3 className='tabs-item'>Инвестиции</h3>
                    {this.renderApplications(applications.data)}
                </div>
            );
        }

        return null;
    }

    onSelectTab = (value) => {
        this.setState({ activeTab: value });
    }

    render() {
        const { loans, applications, match, history } = this.props;
        const { activeTab } = this.state;
        console.log(this.props);
        return (
            <div className='main-page'>
                <div>
                    <Menu active={history.location.pathname.split('/')[1]} />
                    <div className="wrapper">
                        <div className="content-main">
                            <div className="content-main-upper">
                                {/* <Tabs>
                                    <TabItem value='Займы' active={activeTab} onSelectTab={this.onSelectTab} />
                                    <TabItem value='Заявки' active={activeTab} onSelectTab={this.onSelectTab} />
                                </Tabs> */}
                                {/* {!isEmpty(loans.data) && <div>
                                    <h3>Займы</h3>
                                    {(loans.fetching || loans.error)
                                        ? <DummyLoan error={loans.error} />
                                        : this.renderLoans(loans.data)}
                                </div>}
                                {!isEmpty(applications.data) && <div>
                                    <h3>Инвестиции</h3>
                                    {(applications.fetching || applications.error)
                                        ? <DummyApplication error={applications.error} />
                                        : this.renderApplications(applications.data)}
                                </div>} */}
                                {this.renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='wrapper content-main-footer'>
                    <input type="button" className='input input-submit' value='Подать заявку на заём'/>
                </div>
            </div>
        );
    }
}