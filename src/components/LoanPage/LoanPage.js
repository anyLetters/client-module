import React, { Component } from 'react';
import Menu from '../../containers/Menu';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { isEmpty } from 'ramda';
import moment from 'moment';
import './style.css';

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
        <div className='history-row mb-10'>
            <div>
                <div>{props.title}</div>
                <span className={props.color}>
                    {props.color === 'red' && <span>–</span>}{props.expenses} ₽
                </span>
            </div>
            <p className="grey">{props.date}</p>
        </div>
    );
}

export default class LoanPage extends Component {

    state = {
        loan: null,
        isToggled: false
    }

    componentDidMount() {
        if (isEmpty(this.props.data)) {
            this.props.fetchLoans();
        } else {
            this.findLoan(this.props.data);
        }
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
        return schedule[index].date;
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
                color = 'green';
                return {title, color};
            case 'Поступление на расчетный счет':
                title = 'Списание по займу';
                color = 'red';
                return {title, color};
            default:
                return {title, color};
        }
    }

    render() {
        const { error, fetching } = this.props;
        const { loan } = this.state;

        if (error || fetching || !loan) return <div></div>;

        const motion = !isEmpty(loan.contract.motion) ? [...loan.contract.motion] : null;
        const upcomingPaymentDate = this.findUpcomingPaymentDate(loan.contract.schedule);
        const upcomingPayment = this.calculatePayment([loan.contract.upcomingPayment, loan.contract.overduePayment]);
        const overduePayment = this.calculatePayment([loan.contract.overduePayment]);
        const isOverdue = this.calculatePayment([loan.contract.upcomingPayment]) !== upcomingPayment;

        return (
            <div className='loan-page'>
                <div className="wrapper">
                    <div className="content-loan">
                        <Menu />
                        <Header title={loan.number} page='loan' back={() => this.props.history.push('/loans')} />
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
                        <div className="block-loan mb-20">
                            <div className="loan-payment">
                                <span className={isOverdue ? 'red' : ''}>{upcomingPayment.toLocaleString('ru')} ₽</span>
                                <span>{` · `}</span>
                                <span>{moment(upcomingPaymentDate).format('D MMMM')}</span>
                            </div>
                            <div className="loan-under">
                                <p className='grey'>Предстоящий платеж</p>
                                <p className='blue'>
                                    <span onClick={this.toggle}>{this.state.isToggled ? 'Свернуть' : 'Подробно'}</span>
                                    <Link className='blue' to={`/loan/${this.props.match.params.id}/pay`}>Оплатить</Link>
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
                        <div className="loan-history">
                            <h4>Движение средств по договору</h4>
                            {motion && motion.sort((a,b) => a.date < b.date).map((e, i) => {
                                let {title, color} = this.defineTitleAndColor(e);
                                return <HistoryRow key={i} title={title} expenses={e.amount.toLocaleString('ru')} date={moment(e.date).format('DD MMM YYYY')} color={color} />;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}