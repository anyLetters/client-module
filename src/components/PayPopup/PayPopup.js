import React, { Component } from 'react';
import Header from '../Header/Header';
import { isEmpty } from 'ramda';
import moment from 'moment';
import './style.css';
import QRCode from 'qrcode.react';

export default class PayPage extends Component {

    generateQRString = () => {
        const { payer } = this.props;
        let str = 'ST00012';

        if (!payer.surname || !payer.name || !payer.patronymic) return null;

        let qr = {
            Name: "ООО МКК “Магазин кредитов”",
            PersonalAcc: '40702810516540000093',
            BankName: 'Уральский банк ПАО «Сбербанк России»',
            BIC: '046577674',
            CorrespAcc: '30101810500000000674',
            PayeeINN: '6678014749',
            Contract: this.props.number ? this.props.number.replace('У', '') : '',
            LastName: payer.surname,
            FirstName: payer.name,
            MiddleName: payer.patronymic,
            OrgName: "ООО МКК “Магазин кредитов”",
            OrgNumber: '651303465003905',
            ContactPhone: '88007758009',
            Rules: 'https://credit.club/rules',
            Site: 'https://credit.club/',
            NPMIR: 'http://www.npmir.ru/',
            CBR: 'http://www.cbr.ru/',
            LK: 'https://lk.credit.club/',
            FSSPRUS: 'http://fssprus.ru/'
        };

        Object.keys(qr).forEach(key => {
            if (qr[key]) {
                str += `|${key}=${qr[key]}`
            }
        })

        return str;
    }

    render() {
        const { upcomingPayment, number, createdAt, onPayClick } = this.props;

        const qrCode = this.generateQRString();

        return (
            <div className='pay-popup'>
                <div className="background" onClick={onPayClick}></div>
                <div className="wrapper">
                    <div className="content-pay">
                        <Header title='Как оплатить заём' page='pay' back={onPayClick} />
                        <div className="content-pay-text">
                            {qrCode && <div>
                                <p className='grey mb-10'>Покажите этот Куар-код операционисту в Сбербанке, чтобы не вводить наши реквизиты вручную.</p>
                                <div className="qr-code">
                                    <QRCode size={200} value={qrCode} />
                                </div>
                            </div>}
                            <p className='grey'>Назовите реквизиты операционисту, или заполните платежку, чтобы оплатить заём.</p>
                            <p><span className="grey">Наименование</span><br/>ООО МКК “Магазин кредитов”</p>
                            <p><span className="grey">ИНН/КПП</span><br/>6678014749/667801001</p>
                            <p><span className="grey">Номер счета получателя</span><br/>4070 2810 5165 4000 0093</p>
                            <p><span className="grey">Наименование банка получателя</span><br/>Уральский банк ПАО Сбербанк России г. Екатеринбург</p>
                            <p><span className="grey">БИК</span><br/>046577674</p>
                            <p><span className="grey">Номер корр./счета банка получателя</span><br/>3010 1810 5000 0000 0674</p>
                            <p><span className="grey">Назначение платежа</span><br/>Оплата по договору микрозайма {number.replace('У', '')} от {moment(createdAt).format('D MMMM YYYY')} года. (НДС не облагается)</p>
                            <p><span className="grey">Сумма платежа</span><br/>{upcomingPayment.toLocaleString('ru')} рублей</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}