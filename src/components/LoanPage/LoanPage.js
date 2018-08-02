import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
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
            <td>{props.colOne} ₽</td>
            <td>— {props.colTwo}</td>
        </tr>
    )
}

function HistoryRow(props) {
    return (
        <div className='history-row mb-10'>
            <p><span>{props.title}</span><span>{props.expenses} ₽</span></p>
            <p className="grey">{props.date}</p>
        </div>
    );
}

export default class LoanPage extends Component {

    state = {
        isToggled: false
    }

    toggle = () => {
        this.setState(prevState => ({isToggled: !prevState.isToggled}));
    }

    render() {
        return (
            <div className='loan-page'>
                <div className="wrapper">
                    <div className="content-loan">
                        <Menu />
                        <Header title='МК 0917/83' page='loan' back={this.props.history.goBack} />
                        <div className="block-loan">
                            <div className="block-loan-row">
                                <BlockRow title='Параметры займа' text='2 000 000 ₽ на 36 мес. под 2.3%' />
                            </div>
                            <div className="block-loan-row">
                                <BlockRow title='Остаток долга' text='1 200 000 ₽' />
                                <BlockRow title='Остаток на счете' text='3 000 ₽' />
                            </div>
                            <div className="block-loan-row">
                                <BlockRow title='Дата займа' text='17 янв 2018' />
                                <BlockRow title='Тип займа' text='Аннуитет' />
                            </div>
                        </div>
                        <div className="block-loan mb-20">
                            <div className="loan-payment">
                                <span>32 300 ₽</span>
                                <span>{` · `}</span>
                                <span>31 июня</span>
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
                                    <TableRow colOne='12 000' colTwo='основной долг' />
                                    <TableRow colOne='3 000' colTwo='проценты' />
                                    <TableRow colOne='1 000' colTwo='пени' />
                                    <TableRow colOne='12 000' colTwo='просрочка' />
                                </Table>
                            </div>}
                        </div>
                        <div className="loan-history">
                            <h4>Движение средств по договору</h4>
                            <HistoryRow title='Оплата по договору' expenses='50 000' date='17 апр 2018 21:41'/>
                            <HistoryRow title='Просроченный платеж' expenses='-20 000' date='22 апр 2018 10:11'/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}