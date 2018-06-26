import React, { Component } from 'react';
import Header from '../Header/Header';
import './style.css';

export default class PayPage extends Component {
    render() {
        const { history } = this.props;
        return (
            <div className='pay-page'>
                <div className="wrapper">
                    <div className="content-pay">
                        <Header title='Как оплатить займ' page='pay' back={history.goBack} />
                        <div className="content-pay-text">
                            <p className='grey'>Покажите этот Куар-код операционисту в Сбербанке, чтобы не вводить наши реквизиты вручную.</p>
                            <div className="qr-code">
                            </div>
                            <h3>Данные для платежа</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='grey'>Сумма</td>
                                        <td>32 500 ₽</td>
                                    </tr>
                                    <tr>
                                        <td className='grey'>Дата</td>
                                        <td>21 июня 2018</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h3>Реквизиты</h3>
                            <p className='grey mb-10'>Покажите этот Куар-код операционисту в Сбербанке, чтобы не вводить наши реквизиты вручную.</p>
                            <p className='mb-5'><span className="grey">Наименование</span><br/>ООО МКК “Магазин кредитов”</p>
                            <p className='mb-5'><span className="grey">ИНН/КПП</span><br/>6678014749/667801001</p>
                            <p className='mb-5'><span className="grey">Номер счета получателя</span><br/>4070 2810 5165 4000 0093</p>
                            <p className='mb-5'><span className="grey">Наименование банка получателя</span><br/>Уральский банк ПАО Сбербанк России г. Екатеринбург</p>
                            <p className='mb-5'><span className="grey">БИК</span><br/>046577674</p>
                            <p className='mb-5'><span className="grey">Номер корр./счета банка получателя</span><br/>3010 1810 5000 0000 0674</p>
                            <p className='mb-5'><span className="grey">Назначение платежа</span><br/>Оплата по договору микрозайма № МК 0218/102 от 27 февраля 2018 года. (НДС не облагается)</p>
                            <p className='mb-5'><span className="grey">Сумма платежа</span><br/>32 500 рублей</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}