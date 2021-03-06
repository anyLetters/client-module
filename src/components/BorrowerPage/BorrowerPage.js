import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { isEmpty } from 'ramda';
import PayPopup from '../PayPopup/PayPopup';
import empty from '../../images/empty-folder.svg';
import { GetFullName } from '../../api/index';
import moment from 'moment';
import Loader from '../Loader/Loader';
import 'moment/locale/ru';

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

class Loan extends Component {

    state = {
        showPaymentPopup: false
    }

    onPayClick = () => {
        this.setState(ps => ({ showPaymentPopup: !ps.showPaymentPopup }));
    }

    render() {
        const { loan, user } = this.props;
        const { showPaymentPopup } = this.state;
        const date = moment.utc(loan.createdAt, 'YYYY-MM-DD').local().format('D MMMM YYYY');
        let upcomingPaymentDate, upcomingPayment, isOverdue, payment;

        if (loan.contract) {
            upcomingPaymentDate = findUpcomingPayment(loan.contract.schedule);
            upcomingPayment = calculatePayment([loan.contract.upcomingPayment, loan.contract.overduePayment]);
            isOverdue = calculatePayment([loan.contract.upcomingPayment]) !== upcomingPayment;

            payment = upcomingPaymentDate
            ?   [
                    <span key={0} className={isOverdue ? 'red' : ''}>{upcomingPayment.toLocaleString('ru')} ₽</span>,
                    <span key={1} >{` · `}</span>,
                    <span key={2} >{moment(upcomingPaymentDate.date).format('D MMMM')}</span>
                ]
            :   <span className={isOverdue ? 'red' : 'green'}>
                    {upcomingPayment ? `${upcomingPayment.toLocaleString('ru')} ₽` : 'Погашен'}
                </span>;
    
            return (
                <div className='block-loan'>
                    {showPaymentPopup && <PayPopup
                        onPayClick={this.onPayClick}
                        number={loan.number}
                        payer={user}
                        createdAt={loan.createdAt}
                        upcomingPayment={upcomingPayment}
                        upcomingPaymentDate={upcomingPaymentDate} />}
                    <div className="block-loan-mobile">
                        <Link to={`/borrower/loan/${loan.id}`}>
                            <div className="loan-info">
                                <p>{`${loan.number.replace('У', '')} от ${date}`}</p>
                                <p className='grey'>
                                    {loan.contract.loan.toLocaleString('ru')} ₽ на {loan.contract.period} мес. под {loan.contract.percent}%
                                </p>
                            </div>
                            <div className="loan-payment">
                                {payment}
                            </div>
                        </Link>
                        {upcomingPayment && <div className="loan-under">
                            <span className='grey'>Предстоящий платеж</span>
                            <span onClick={this.onPayClick} className='blue pointer'>Оплатить</span>
                        </div>}
                    </div>
                    <div className="block-loan-desktop">
                        <Link to={`/borrower/loan/${loan.id}`}>
                            {`${loan.number.replace('У', '')} от ${date}`}
                        </Link>
                        <Link to={`/borrower/loan/${loan.id}`}>
                            {loan.contract.loan.toLocaleString('ru')} ₽ на {loan.contract.period} мес. под {loan.contract.percent}%
                        </Link>
                        <Link to={`/borrower/loan/${loan.id}`}>
                            {payment}
                        </Link>
                        <div>
                            {upcomingPayment && <span onClick={this.onPayClick} className='blue pointer'>Оплатить</span>}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className='block-loan'>
                <div className="block-loan-mobile-no-1c">
                    <div className="loan-info bold">
                        <p>{`${loan.number} от ${date}`}</p>
                    </div>
                    <div>
                        <p className='red'>Нет данных о платежах</p>
                    </div>
                </div>
                <div className="block-loan-desktop">
                    <div>{`${loan.number} от ${date}`}</div>
                    <div>{loan.calculation.loan.toLocaleString('ru')} ₽ на {loan.calculation.period} мес. под {loan.calculation.percent}%</div>
                    <div>Нет данных о платежах</div>
                </div>
            </div>
        );
    }
}

function Application(props) {
    const { application } = props;
    const date = moment.utc(application.createdAt, 'YYYY-MM-DD').local().format('D MMMM YYYY');
    const status = application.status.abbreviation;
    const lastCalculations = application.calculations[application.calculations.length - 1];

    return (
        <Link to={`/borrower/application/${application.id}`}>
            <div className='block-application'>
                <div className="block-application-mobile">
                    <div className="application-info">
                        <p className='bold'>{`№${application.number} от ${date}`}</p>
                        <p className='grey'>
                            {lastCalculations.loan.toLocaleString('ru')} ₽ на {lastCalculations.period} мес. под {lastCalculations.percent}%
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
                        {`№${application.number} от ${date}`}
                    </div>
                    <div>
                        {lastCalculations.loan.toLocaleString('ru')} ₽ на {lastCalculations.period} мес. под {lastCalculations.percent}%
                    </div>
                    <div>
                        <span className={status === 'REFUSAL' ? 'red' : status === 'BECAME_LOAN' ? 'green' : ''}>
                            {application.status.abbreviation}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
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

export default class BorrowerPage extends Component {

    renderLoans = (loans) => {
        return (
            <div className='loans'>
                <div className='loans-columns'>
                    <div>Договор</div>
                    <div>Параметры займа</div>
                    <div>Предстоящий платеж</div>
                </div>
                {loans.map((loan, i) =>
                    <Loan key={i} loan={loan} user={this.props.user} link={this.props.history.push} />
                )}
            </div>
        );
    }

    renderApplications = (applications) => {
        return (
            <div className='applications'>
                <div className='applications-columns'>
                    <div>Заявка</div>
                    <div>Параметры заявки</div>
                    <div>Статус</div>
                </div>
                {applications.map((application, i) => <Application key={i} application={application} link={this.props.history.push} /> )}
            </div>
        );
    }

    renderBorrower = () => {
        const { loans, applications } = this.props;
        const hasLoans = !isEmpty(loans.data) && !loans.fetching;
        const hasApplications = !isEmpty(applications.data) && !applications.fetching;

        if ((loans.fetching && !hasApplications) || (applications.fetching && !hasLoans)) {
            return <div><Loader/></div>
        }

        if (loans.error && applications.error) {
            return (
                <div style={{height: '100%', margin: '5% 0'}}>
                    <p className='red' style={{fontWeight: 600}}>Ошибка приложения</p>
                    <p>Не можем загрузить заявки и займы</p>
                </div>
            );
        }

        if (loans.error || applications.error) {
            return (
                <div className='main-page-list'>
                    {this.renderApplicationsList()}
                    {this.renderloansList()}
                </div>
            );
        }

        if (!hasLoans && !hasApplications) {
            return (
                <div style={{height: '100%', margin: '5% auto', width: '200px'}}>
                    <img src={empty} alt="img"/>
                    <p style={{marginTop: '20px', fontWeight: 600, fontSize: 14}}>Заявок нет</p>
                    <p style={{marginTop: '5px', fontSize: 14, lineHeight: '20px'}}>
                        Подайте свою первую заявку на заём <a rel="noopener noreferrer" href="https://credit.club" target='_blank' className='blue'>на сайте</a> или по телефону <a href="tel:+78007758009" className='blue'>8 800 775 80 09</a>
                    </p>
                </div>
            );
        }

        return (
            <div className='main-page-list'>
                {this.renderApplicationsList()}
                {this.renderloansList()}
            </div>
        );
    }

    renderloansList = () => {
        const { loans } = this.props;
        const hasLoans = !isEmpty(loans.data) && !loans.fetching;

        if (loans.error) {
            return (
                <div className='entity-list'>
                    <div className='tabs-item'>
                        <h3>Займы</h3>
                    </div>
                    <p className='entity-list-message red'>Не удалось загрузить займы, попробуйте позже</p>
                </div>
            );
        }

        if (hasLoans) {
            return (
                <div className='entity-list'>
                    <div className='tabs-item'>
                        <h3>Займы</h3>
                    </div>
                    {this.renderLoans(loans.data)}
                </div>
            );
        }
    }

    renderApplicationsList = () => {
        const { applications } = this.props;
        const hasApplications = !isEmpty(applications.data) && !applications.fetching;

        if (applications.error) {
            return (
                <div className='entity-list'>
                    <div className='tabs-item'>
                        <h3>Заявки</h3>
                    </div>
                    <p className='entity-list-message red'>Не удалось загрузить заявки, попробуйте позже</p>
                </div>
            );
        }

        if (hasApplications) {
            return (
                <div className='entity-list'>
                    <div className='tabs-item'>
                        <h3>Заявки</h3>
                        <span>Показать все</span>
                    </div>
                    {this.renderApplications(applications.data)}
                </div>
            );
        }
    }

    render() {
        return this.renderBorrower();
    }
}