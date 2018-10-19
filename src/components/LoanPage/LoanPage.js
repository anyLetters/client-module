import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { isEmpty } from 'ramda';
import moment from 'moment';
import PayPopup from '../PayPopup/PayPopup';
import './style.css';
import './media.css';

function BlockRow(props) {
    return (
        <div>
            <p className="grey">{props.title}</p>
            <p>{props.text}</p>
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
            <td className={props.red && 'red'}>{props.colOne.toLocaleString('ru')} ₽</td>
            <td>— {props.colTwo}</td>
        </tr>
    )
}

function HistoryRow(props) {
    return (
        <div className='loan-history-row'>
            <div>
                <div>{props.title}</div>
                <span className={props.color}>
                    {props.color === 'red' ? <span>–</span> : <span>+</span>}{props.expenses} ₽
                </span>
            </div>
            <p className="grey">{props.date}</p>
        </div>
    );
}

export default class LoanPage extends Component {

    state = {
        loan: null,
        isToggled: false,
        showPaymentPopup: false,
    }
    
    role = this.props.location.pathname.split('/')[1]

    componentDidMount() {
        if (isEmpty(this.props.data)) {
            switch (this.role) {
                case 'borrower':
                    this.props.fetchLoans();
                    break;
                case 'investor':
                    this.props.fetchInvestments(this.props.user.id);
                    break;
            }
        } else {
            this.findLoan(this.props.data);
        }
    }

    onPayClick = () => {
        this.setState(ps => ({ showPaymentPopup: !ps.showPaymentPopup }));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.findLoan(nextProps.data);
        }
    }

    findLoan = (loans) => {
        const index = loans.findIndex(loan => loan.id === this.props.match.params.id);
        this.setState({ loan: loans[index] });
    }

    toggle = () => {
        this.setState(prevState => ({isToggled: !prevState.isToggled}));
    }

    findUpcomingPaymentDate = schedule => {
        let index = schedule.findIndex((payment, i) =>  
            new Date().getTime() <= new Date(`${payment.date.replace(/-/g, "/")} 00:00:00`).setDate(new Date(`${payment.date.replace(/-/g, "/")} 00:00:00`).getDate() + 1)
        );
        return schedule[index];
    }

    calculatePayment = overall => {
        return overall.map(obj => Object.values(obj).reduce((a, b) => a + b)).reduce((a, b) => a + b);
    }

    defineTitleAndColor = (motion) => {
        let title = motion.paymentType;
        let color = '';
        switch(motion.appointment) {
            case 'Списание с расчетного счета':
                title = 'Зачисление средств по займу';
                color = '#343434';
                return {title, color};
            case 'Поступление на расчетный счет':
                title = 'Поступление на счёт';
                color = 'green';
                return {title, color};
            // case 'Поступление на расчетный счет':
            //     title = 'Списание по займу';
            //     color = 'green';
            //     return {title, color};
            case 'Погашение займов':
                color = 'red';
                return {title, color};
            default:
                return {title, color};
        }
    }

    render() {
        const { error, fetching, history } = this.props;
        const { loan, showPaymentPopup } = this.state;

        if (error || fetching || !loan) return null;

        const motion = !isEmpty(loan.contract.motion) ? [...loan.contract.motion].reverse() : null;
        const upcomingPaymentDate = this.findUpcomingPaymentDate(loan.contract.schedule);
        const upcomingPayment = this.calculatePayment([loan.contract.upcomingPayment, loan.contract.overduePayment]);
        const overduePayment = this.calculatePayment([loan.contract.overduePayment]);
        const isOverdue = this.calculatePayment([loan.contract.upcomingPayment]) !== upcomingPayment;
        const payment = upcomingPaymentDate
        ?   [
                <span key={0} className={isOverdue ? 'red' : ''}>{upcomingPayment.toLocaleString('ru')} ₽</span>,
                <span key={1} >{` · `}</span>,
                <span key={2} >{moment(upcomingPaymentDate.date).format('D MMMM')}</span>
            ]
        :   <span className={isOverdue ? 'red' : 'green'}>
                {upcomingPayment ? `${upcomingPayment.toLocaleString('ru')} ₽` : 'Погашен'}
            </span>;

        return (
            <div className='loan-page'>
              {showPaymentPopup && <PayPopup
                    onPayClick={this.onPayClick}
                    number={loan.number}
                    createdAt={loan.createdAt}
                    payer={this.props.user}
                    upcomingPayment={upcomingPayment}
                    upcomingPaymentDate={upcomingPaymentDate} />}
                <div>
                    <div className="wrapper">
                        <div className="content-loan">
                            <Header title={`${loan.number.replace('У', '')}`} page='loan' back={() => this.props.history.push(`/${this.role}`)} />
                            <div className="blocks-loan">
                                <div className="blocks-loan-1">
                                    <div className="block-loan">
                                        <div className="block-loan-row">
                                            <BlockRow title='Параметры займа' text={`${loan.contract.loan.toLocaleString('ru')} ₽ на ${loan.contract.period} мес. под ${loan.contract.percent}%`} />
                                        </div>
                                        <div className="block-loan-row">
                                            <BlockRow title='Остаток долга' text={`${loan.contract.balanceOwed ? loan.contract.balanceOwed.toLocaleString('ru') : 0} ₽`} />
                                            <BlockRow title='Остаток на счете' text={`${loan.contract.accountBalance ? loan.contract.accountBalance.toLocaleString('ru') : 0} ₽`} />
                                        </div>
                                        <div className="block-loan-row">
                                            <BlockRow title='Дата займа' text={`${moment(loan.createdAt).format('DD MMM YYYY')}`} />
                                            <BlockRow title='Тип займа' text={loan.contract.type} />
                                        </div>
                                    </div>
                                </div>
                                <div className="blocks-loan-2">
                                    <div className="block-loan mb-20">
                                        <div className="loan-payment">{payment}</div>
                                        <div className="loan-under">
                                            <p className='grey'>Предстоящий платеж</p>
                                            <p className='blue'>
                                                <span onClick={this.toggle}>{this.state.isToggled ? 'Свернуть' : 'Подробно'}</span>
                                                {upcomingPayment && this.role === 'borrower' && <span onClick={this.onPayClick} className='blue pointer'>Оплатить</span>}
                                            </p>
                                        </div>
                                        {this.state.isToggled && <div className="loan-more">
                                            <Table>
                                                <TableRow colOne={loan.contract.upcomingPayment.main || 0} colTwo='основной долг' />
                                                <TableRow colOne={loan.contract.upcomingPayment.percent || 0} colTwo='проценты' />
                                                <TableRow colOne={loan.contract.upcomingPayment.penalties || 0} colTwo='пени' red />
                                                <TableRow colOne={overduePayment || 0} colTwo='просрочка' red />
                                            </Table>
                                        </div>}
                                    </div>
                                    {!isEmpty(loan.contract.motion) && <div className="loan-history">
                                        <h4>Движение средств по договору</h4>
                                        {motion && motion.map((e, i) => {
                                            let {title, color} = this.defineTitleAndColor(e);
                                            return <HistoryRow key={i} title={title} expenses={e.amount.toLocaleString('ru')} date={moment(e.date).format('DD MMM YYYY')} color={color} />;
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