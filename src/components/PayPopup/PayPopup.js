import React, { Component } from 'react';
import Header from '../Header/Header';
import { isEmpty } from 'ramda';
import moment from 'moment';
import './style.css';

export default class PayPage extends Component {

    render() {
        const { upcomingPayment, upcomingPaymentDate, number, createdAt, onPayClick } = this.props;

        return (
            <div className='pay-popup'>
                <div className="background" onClick={onPayClick}></div>
                <div className="wrapper">
                    <div className="content-pay">
                        <Header title='Как оплатить заём' page='pay' back={onPayClick} />
                        <div className="content-pay-text">
                            <p className='grey'>Назовите реквизиты операционисту, или заполните платежку, чтобы оплатить заём.</p>
                            {/* <div className="qr-code">
                            </div> */}
                            {/* <h3>Данные для платежа</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='grey'>Сумма</td>
                                        <td>{upcomingPayment.toLocaleString('ru')} ₽</td>
                                    </tr>
                                    {upcomingPaymentDate && <tr>
                                        <td className='grey'>Дата</td>
                                        <td>{moment(upcomingPaymentDate.date).format('D MMMM YYYY')}</td>
                                    </tr>}
                                </tbody>
                            </table> */}
                            {/* <h3>Реквизиты</h3> */}
                            {/* <p className='grey mb-10'>Покажите этот Куар-код операционисту в Сбербанке, чтобы не вводить наши реквизиты вручную.</p> */}
                            <p><span className="grey">Наименование</span><br/>ООО МКК “Магазин кредитов”</p>
                            <p><span className="grey">ИНН/КПП</span><br/>6678014749/667801001</p>
                            <p><span className="grey">Номер счета получателя</span><br/>4070 2810 5165 4000 0093</p>
                            <p><span className="grey">Наименование банка получателя</span><br/>Уральский банк ПАО Сбербанк России г. Екатеринбург</p>
                            <p><span className="grey">БИК</span><br/>046577674</p>
                            <p><span className="grey">Номер корр./счета банка получателя</span><br/>3010 1810 5000 0000 0674</p>
                            <p><span className="grey">Назначение платежа</span><br/>Оплата по договору микрозайма № {number} от {moment(createdAt).format('D MMMM YYYY')} года. (НДС не облагается)</p>
                            <p><span className="grey">Сумма платежа</span><br/>{upcomingPayment.toLocaleString('ru')} рублей</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}