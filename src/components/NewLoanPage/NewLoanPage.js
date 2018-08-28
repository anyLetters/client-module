import React, { Component } from 'react';
import Header from '../Header/Header';
import CurrencyInput from 'react-currency-input';
import InputMask from 'react-input-mask';
import './style.css';

export default class NewLoanPage extends Component {

    state = {
        loan: null,
        term: null
    }

    render() {
        const { history } = this.props;
        return (
            <div className='new-app-page'>
                <div className="wrapper">
                    <div className="content-new-app">
                        <Header title='Взять заём' page='new-app' back={history.goBack} />
                        <div className="content-new-app-text">
                            <p className='grey'>Выберите желаемую сумму и срок займа. После отправки заявки наш менеджер перезвонит вам в течение часа, чтобыуточнить детали.</p>
                        </div>
                        <div className="content-new-app-form">
                            <form>
                                <div className='content-new-app-form-loan'>
                                    <p>Сумма займа</p>
                                    <CurrencyInput
                                        required
                                        placeholder='1 000 000'
                                        value={this.state.loan}
                                        className='input input-white'
                                        decimalSeparator=" "
                                        thousandSeparator=" "
                                        precision={0}/>
                                    <span>₽</span>
                                </div>
                                <div className='content-new-app-form-term'>
                                    <p>Срок займа</p>
                                    <InputMask
                                        className='input input-white'
                                        required
                                        mask="99"
                                        placeholder='24'
                                        maskChar=""/>
                                    <span>мес.</span>
                                </div>
                                <input type="submit" className='input input-submit' value='Отправить заявку'/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}