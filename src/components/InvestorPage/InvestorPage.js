import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { isEmpty } from 'ramda';
import moment from 'moment';
import Loader from '../Loader/Loader';
import InvestmentApps from '../InvestmentApps/InvestmentApps';
import 'moment/locale/ru';
import './style.css';
import './media.css';
import ContentLoader from "react-content-loader";

function DesktopLoader(props) {
    return (
        <ContentLoader
            height={76}
            width={1148}
            speed={2}
            primaryColor="#f9f9f9"
            secondaryColor="#f3f3f3"
            {...props}>
            <rect x="0" y={0} rx="4" ry="4" width="128" height="18" />
            <rect x="140" y={0} rx="4" ry="4" width="100" height="18" />
            <rect x="252" y={0} rx="4" ry="4" width="64" height="18" />
            <rect x="0" y='26' rx="4" ry="4" width="420" height="22" />
            <rect x="0" y='56' rx="4" ry="4" width="128" height="16" />
        </ContentLoader>
    );
}

function MobileLoader(props) {
    return (
        <ContentLoader
            height={76}
            width={600}
            speed={2}
            primaryColor="#f9f9f9"
            secondaryColor="#f3f3f3"
            {...props}>
            <rect x="0" y={0} rx="4" ry="4" width="128" height="18" />
            <rect x="140" y={0} rx="4" ry="4" width="100" height="18" />
            <rect x="252" y={0} rx="4" ry="4" width="64" height="18" />
            <rect x="0" y='26' rx="4" ry="4" width="420" height="22" />
            <rect x="0" y='56' rx="4" ry="4" width="128" height="16" />
        </ContentLoader>
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

    render() {
        const { loan, user } = this.props;
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
                    <div className="block-loan-mobile">
                        <Link to={`/investor/loan/${loan.id}`}>
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
                        </div>}
                    </div>
                    <div className="block-loan-desktop">
                        <Link to={`/investor/loan/${loan.id}`}>
                            {`${loan.number.replace('У', '')} от ${date}`}
                        </Link>
                        <Link to={`/investor/loan/${loan.id}`}>
                            {loan.contract.loan.toLocaleString('ru')} ₽ на {loan.contract.period} мес. под {loan.contract.percent}%
                        </Link>
                        <Link to={`/investor/loan/${loan.id}`}>
                            {payment}
                        </Link>
                    </div>
                </div>
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
                    <div>–</div>
                    <div>Нет данных о платежах</div>
                </div>
            </div>
        );
    }
}

export default class InvestorPage extends Component {

    state = {
        showList: false
    }

    renderInvestmentInfo = () => {
        const { investments } = this.props;

        if (investments.fetching) {
            return (
                <div className='block-info'>
                    <div className="block-info-loader-mobile">
                        <MobileLoader/>
                    </div>
                    <div className="block-info-loader-desktop">
                        <DesktopLoader/>
                    </div>
                </div>
            );
        }

        const Col = ({ title, value }) => {
            return (
                <div className="block-info-col">
                    <p>{title}</p>
                    <p>{value || '-'}</p>
                </div>
            );
        };

        const overall = investments.data.reduce((a, b) => a + ((b.contract || {}).loan || 0), 0);

        return (
            <div className='block-info'>
                <div className="block-info-row">
                    <Col title={`${investments.data.length} займов`} value={isEmpty(investments.data) ? `0 ₽` : `${overall.toLocaleString('ru')} ₽`} />
                    <Col title={`Доходность`} value={isEmpty(investments.data) ? `0%` : ''} />
                    <Col title={`Доход за ${new Date().getFullYear()}`} value={isEmpty(investments.data) ? `0 ₽` : ''} />
                </div>
                <div className='block-info-buttons'>
                    {!isEmpty(investments.data) && <span className='blue' onClick={() => this.setState(ps => ({ showList: !ps.showList }))}>
                        {this.state.showList ? 'Скрыть займы' : 'Показать займы'}
                    </span>}
                </div>
            </div>
        );
    }

    renderListOfInvestments = () => {
        const { investments } = this.props;

        if (!this.state.showList) return null;

        return (
            <div>
                <div className='loans'>
                    <div className='loans-columns'>
                        <div>Договор</div>
                        <div>Параметры займа</div>
                        <div>Предстоящий платеж</div>
                    </div>
                    {investments.data.map((loan, i) =>
                        <Loan key={i} loan={loan} user={this.props.user} link={this.props.history.push} />
                    )}
                </div>
            </div>
        );
    }

    renderMyInvestments = () => {
        return (
            <div className='entity-list'>
                <h3 className='tabs-item'>Мои инвестиции</h3>
                {this.renderInvestmentInfo()}
                {this.renderListOfInvestments()}
            </div>
        );
    }

    renderInvestor = () => {
        return (
            <div>
                {this.renderMyInvestments()}
                <InvestmentApps {...this.props} />
            </div>
        );
    }

    render() {
        return this.renderInvestor();
    }
}