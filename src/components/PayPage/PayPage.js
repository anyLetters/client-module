import React, { Component } from 'react';
import Header from '../Header/Header';
import { isEmpty } from 'ramda';
import moment from 'moment';
import './style.css';

export default class PayPage extends Component {

    state = {
        loan: null
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

    findUpcomingPaymentDate = schedule => {
        let index = schedule.findIndex((payment, i) =>  
            new Date().getTime() <= new Date(`${payment.date.replace(/-/g, "/")} 00:00:00`).setDate(new Date(`${payment.date.replace(/-/g, "/")} 00:00:00`).getDate() + 1)
        );
        return schedule[index].date;
    }

    calculatePayment = overall => {
        return overall.map(obj => Object.values(obj).reduce((a, b) => a + b)).reduce((a, b) => a + b);
    }

    render() {
        const { history, match, error, fetching } = this.props;
        const { loan } = this.state;

        if (error || fetching || !loan) return <div></div>;

        const upcomingPaymentDate = this.findUpcomingPaymentDate(loan.contract.schedule);
        const upcomingPayment = this.calculatePayment([loan.contract.upcomingPayment, loan.contract.overduePayment]);
        const overduePayment = this.calculatePayment([loan.contract.overduePayment]);
        const isOverdue = this.calculatePayment([loan.contract.upcomingPayment]) !== upcomingPayment;

        return (
            <div className='pay-page'>
                <div className="wrapper">
                    <div className="content-pay">
                        <Header title='Как оплатить займ' page='pay' back={history.goBack} />
                        <div className="content-pay-text">
                            {/* <p className='grey'>Покажите этот Куар-код операционисту в Сбербанке, чтобы не вводить наши реквизиты вручную.</p>
                            <div className="qr-code">
                            </div> */}
                            <h3>Данные для платежа</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='grey'>Сумма</td>
                                        <td>{upcomingPayment.toLocaleString('ru')} ₽</td>
                                    </tr>
                                    <tr>
                                        <td className='grey'>Дата</td>
                                        <td>{moment(upcomingPaymentDate).format('D MMMM YYYY')}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h3>Реквизиты</h3>
                            {/* <p className='grey mb-10'>Покажите этот Куар-код операционисту в Сбербанке, чтобы не вводить наши реквизиты вручную.</p> */}
                            <p className='mb-5'><span className="grey">Наименование</span><br/>ООО МКК “Магазин кредитов”</p>
                            <p className='mb-5'><span className="grey">ИНН/КПП</span><br/>6678014749/667801001</p>
                            <p className='mb-5'><span className="grey">Номер счета получателя</span><br/>4070 2810 5165 4000 0093</p>
                            <p className='mb-5'><span className="grey">Наименование банка получателя</span><br/>Уральский банк ПАО Сбербанк России г. Екатеринбург</p>
                            <p className='mb-5'><span className="grey">БИК</span><br/>046577674</p>
                            <p className='mb-5'><span className="grey">Номер корр./счета банка получателя</span><br/>3010 1810 5000 0000 0674</p>
                            <p className='mb-5'><span className="grey">Назначение платежа</span><br/>Оплата по договору микрозайма № {loan.number} от {moment(loan.createdAt).format('D MMMM YYYY')} года. (НДС не облагается)</p>
                            <p className='mb-5'><span className="grey">Сумма платежа</span><br/>{upcomingPayment.toLocaleString('ru')} рублей</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}