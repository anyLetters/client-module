import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { LoanAPI } from '../../api/index';
import { isEmpty } from 'ramda';
import moment from 'moment';
import 'moment/locale/ru';
import './style.css';
import './media.css';

function Dummy(props) {
    return (
        <div>
            <div className='block-loan'>
                <div className="loan-info">
                    <p className={`p-dummy${props.error ? '-error' : ''}`} style={{width: '80%', marginBottom: 8, height: '16px'}}>{` `}</p>
                    <p className={`p-dummy${props.error ? '-error' : ''}`} style={{width: '60%', height: '16px'}}>{` `}</p>
                </div>
                <div className="loan-payment">
                    <p className={`p-dummy${props.error ? '-error' : ''}`} style={{width: '30%', height: '16px'}}>{` `}</p>
                </div>
                <div className="loan-under">
                    <p className={`p-dummy${props.error ? '-error' : ''}`} style={{width: '100%'}}>{` `}</p>
                </div>
            </div>
        </div>
    );
}

function Loan(props) {
    const { loan } = props;
    const date = moment(loan.createdAt, 'YYYY-MM-DD').format('D MMMM YYYY');

    return (
        <Link to={`/loan/${loan.id}`}>
            <div className='block-loan'>
                <div className="loan-info">
                    <p>{`${loan.number} от ${date}`}</p>
                    <p className='grey'>3 000 000 ₽ на 36 мес. под 2.4%</p>
                </div>
                <div className="loan-payment">
                    <span>17 500 ₽</span>
                    <span>{` · `}</span>
                    <span>22 мая</span>
                </div>
                <div className="loan-under">
                    <span className='grey'>Предстоящий платеж</span>
                    {/* <Link to={`/application/1/pay`} className='blue'>Оплатить</Link> */}
                    <span className='blue'>Оплатить</span>
                </div>
            </div>
        </Link>
    );
}

export default class LoansPage extends Component {

    state = {
        loans: [],
        isFetchError: false
    }

    componentDidMount() {
        this.fetchPersonsLoans();
    }

    fetchPersonsLoans = () => {
        LoanAPI.getAllByPersonId()
            .then(loans => this.setState({loans, isFetchError: false}))
            .catch(() => this.setState({isFetchError: true}));
    }

    render() {
        console.log(this.state);
        const { loans, isFetchError } = this.state;

        const dummies = (
            <div>
                <Dummy error={isFetchError} />
                <Dummy error={isFetchError} />
            </div>
        );

        return (
            <div className='loans-page'>
                <div className="wrapper">
                    <div className="content-loans">
                        <Menu />
                        <Header title='Мои займы' page='loans' />
                        <div className='loans'>
                            {isEmpty(loans) ? dummies : loans.map((loan, i) => <Loan key={i} loan={loan} /> )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}