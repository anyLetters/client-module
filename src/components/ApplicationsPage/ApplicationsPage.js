import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import './style.css';
import './media.css';

function Loan(props) {
    return (
        <Link to={`/application/1`}>
            <div className='block-loan'>
                <div className="loan-info">
                    <p>МК 0917/83 от 22 сентября 2017</p>
                    <p className='grey'>3 000 000 ₽ на 36 мес. под 2.4%</p>
                </div>
                <div className="loan-payment">
                    <span>17 500 ₽</span>
                    <span>{` · `}</span>
                    <span>22 мая</span>
                </div>
                <div className="loan-under">
                    <span className='grey'>Предстоящий платеж</span>
                    <Link to={`/application/1/pay`} className='blue'>Оплатить</Link>
                </div>
            </div>
        </Link>
    );
}

export default class ApplicationsPage extends Component {
    render() {
        return (
            <div className='applications-page'>
                <div className="wrapper">
                    <div className="content-applications">
                        <Menu />
                        <Header title='Мои займы' page='applications' />
                        <Loan />
                    </div>
                </div>
            </div>
        );
    }
}