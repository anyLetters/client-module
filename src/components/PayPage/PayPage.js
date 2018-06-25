import React, { Component } from 'react';
import Header from '../Header/Header';
import './style.css';

export default class PayPage extends Component {
    render() {
        return (
            <div className='pay-page'>
                <div className="wrapper">
                    <div className="content-pay">
                        <Header title='Как оплатить займ' page='pay' />
                        <div className="content-pay-text">
                            <p className='grey'>Покажите этот Куар-код операционисту в Сбербанке, чтобы не вводить наши реквизиты вручную.</p>
                            <div className="qr-code">
                            </div>
                            <h3>Данные для платежа</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}