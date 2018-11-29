import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { isEmpty } from 'ramda';
import moment from 'moment';
import PayPopup from '../PayPopup/PayPopup';
import Loader from '../Loader/Loader';
import Block from '../elements/Block/Block';
import { DocumentAPI, GetFullName, ParsePhone } from '../../api/index';
import './style.css';
import './media.css';

function DummyInfo(props) {
    return (
        <div className='application-info red'>
            <div style={{
                backgroundColor: props.error >= 0 ? '#dd6666' : '#f9f9f9',
                opacity: props.error >= 0 ? '.25' : 1,
                width: '40%',
                height: '100%',
                borderRadius: '4px'
            }}> </div>
        </div>
    );
}

function DocumentBlock({title, status}) {
    return (
        <div className='document-block'>
            <div className='document-block-title'>
                <span>{title}</span>
            </div>
            <div className="document-block-status">
                <span>{status}</span>
            </div>
        </div>
    );
}

function DocumentsList({documents, subscribe}) {
    return (
        <div className="block-list loan-documents">
            {/* <div className="block-list-top">
                <span>Подписать все</span>
            </div> */}
            <div className="block-list-items">
                {documents.map((e, i) => (
                    <DocumentBlock
                        key={i}
                        title={e.category.value}/>
                ))}
            </div>
        </div>
    );
}

function BlockRow(props) {
    return (
        <div>
            <p className="grey">{props.title}</p>
            <p>{props.text || '–'}</p>
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
        <div className='loan-history-row'>
            <div>
                <div>{props.title}</div>
                <span className={props.color}>
                    {props.color === 'red' ? <span>–</span> : <span>+</span>}{props.expenses} ₽
                </span>
            </div>
            <p className="grey">{props.date}</p>
        </div>
    );
}

export default class LoanPage extends Component {

    state = {
        isToggled: false,
        showPaymentPopup: false,
    }
    
    role = this.props.location.pathname.split('/')[1]

    componentDidMount() {
        if (isEmpty(this.props.loan.data)) {
            switch (this.role) {
                case 'borrower':
                    this.props.fetchLoans()
                        .then(this.findAllEntities)
                        .then(() => this.props.fetchDocuments(this.props.loan.data.id))
                        .catch((error) => console.error(error.message));
                    break;
                // case 'investor':
                //     this.props.fetchInvestments(this.props.user.id);
                //     break;
                default:
                    return;
            }
        } else {
            this.findAllEntities();
            this.props.fetchDocuments(this.props.loan.data.id);
        }
    }

    onPayClick = () => {
        this.setState(ps => ({ showPaymentPopup: !ps.showPaymentPopup }));
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.loan !== this.props.loan) {
            return true;
        }
        if (this.props.user !== nextProps.user.data) {
            return true;
        }
        if (this.props.persons !== nextProps.persons) {
            return true;
        }
        if (this.props.facilities !== nextProps.facilities) {
            return true;
        }
        if (this.props.workers !== nextProps.workers) {
            return true;
        }
        return false;
    }

    componentWillUnmount() {
        this.props.resetDocuments();
    }

    toggle = () => {
        this.setState(prevState => ({isToggled: !prevState.isToggled}));
    }

    findAllEntities = () => {
        // this.findWorkersToFetch();
        this.findPersonsToFetch();
        this.findFacilitiesToFetch();
    }

    findWorkersToFetch = () => {
        const { loan } = this.props;

        let workersToFetch = [];

        Object.keys(loan.data.workers).forEach(key => {
            if (loan.data.workers[key] && this.props.workers[key]) {
                if (this.props.workers[key] === loan.data.workers[key]) {
                    workersToFetch.push({ id: loan.data.workers[key] });
                }
            }
        })

        !isEmpty(workersToFetch) && this.props.fetchWorkers(workersToFetch);
    }

    findPersonsToFetch = () => {
        const { loan } = this.props;

        if (isEmpty(this.props.persons) && !isEmpty(loan.data.persons)) {
            this.props.fetchPersons(loan.data.persons.map(person => ({ id: person.id })));
            return;
        }

        let personsToFetch = [];

        loan.data.persons.forEach(person => {
            const index = this.props.persons.findIndex(e => e.id === person.id);
            if (index < 0) personsToFetch.push(person);
        });

        !isEmpty(personsToFetch) && this.props.fetchPersons(personsToFetch);
    }

    findFacilitiesToFetch = () => {
        const { loan } = this.props;

        if (isEmpty(this.props.facilities) && !isEmpty(loan.data.facilities)) {
            this.props.fetchFacilities(loan.data.facilities.map(facility => ({ id: facility })));
            return;
        }

        let facilitiesToFetch = [];

        loan.data.facilities.forEach(facility => {
            const index = this.props.facilities.findIndex(e => e.id === facility);
            if (index < 0) facilitiesToFetch.push({id: facility});
        });

        !isEmpty(facilitiesToFetch) && this.props.fetchFacilities(facilitiesToFetch);
    }

    toggle = () => {
        this.setState(prevState => ({isToggled: !prevState.isToggled}));
    }

    findUpcomingPaymentDate = schedule => {
        let index = schedule.findIndex((payment, i) =>  
            new Date().getTime() <= new Date(`${payment.date.replace(/-/g, "/")} 00:00:00`).setDate(new Date(`${payment.date.replace(/-/g, "/")} 00:00:00`).getDate() + 1)
        );
        return schedule[index];
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
                color = '#343434';
                return {title, color};
            case 'Поступление на расчетный счет':
                title = 'Поступление на счёт';
                color = 'green';
                return {title, color};
            // case 'Поступление на расчетный счет':
            //     title = 'Списание по займу';
            //     color = 'green';
            //     return {title, color};
            case 'Погашение займов':
                color = 'red';
                return {title, color};
            default:
                return {title, color};
        }
    }

    render() {
        let { error, fetching, history, facilities, persons, loan, documents } = this.props;
        const { showPaymentPopup } = this.state;

        if (isEmpty(loan.data) || loan.fetching || loan.error) return (
            <div className='loan-page'>
                <div>
                    <div className="wrapper">
                        <div className="content-loan">
                            {loan.fetching && <Loader/>}
                            {loan.error && <div style={{height: '100%', margin: '4% 0'}}>
                                <p className='red' style={{fontWeight: 600}}>Ошибка приложения</p>
                                <p>Не можем загрузить заявку</p>
                                <br/>
                                <Link to='/loans' className='blue'>Вернуться на главную</Link>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        );

        loan = {...loan.data};

        const motion = !isEmpty(loan.contract.motion) ? [...loan.contract.motion].reverse() : null;
        const upcomingPaymentDate = this.findUpcomingPaymentDate(loan.contract.schedule);
        const upcomingPayment = this.calculatePayment([loan.contract.upcomingPayment, loan.contract.overduePayment]);
        const overduePayment = this.calculatePayment([loan.contract.overduePayment]);
        const isOverdue = this.calculatePayment([loan.contract.upcomingPayment]) !== upcomingPayment;
        const payment = upcomingPaymentDate
        ?   [
                <span key={0} className={isOverdue ? 'red' : ''}>{upcomingPayment.toLocaleString('ru')} ₽</span>,
                <span key={1} >{` · `}</span>,
                <span key={2} >{moment(upcomingPaymentDate.date).format('D MMMM')}</span>
            ]
        :   <span className={isOverdue ? 'red' : 'green'}>
                {upcomingPayment ? `${upcomingPayment.toLocaleString('ru')} ₽` : 'Погашен'}
            </span>;

        return (
            <div className='loan-page'>
              {showPaymentPopup && <PayPopup
                    onPayClick={this.onPayClick}
                    number={loan.number}
                    createdAt={loan.createdAt}
                    payer={this.props.user}
                    upcomingPayment={upcomingPayment}
                    upcomingPaymentDate={upcomingPaymentDate} />}
                <div>
                    <div className="wrapper">
                        <div className="content-loan">
                            <Header title={`${loan.number.replace('У', '')}`} page='loan' back={() => this.props.history.push(`/${this.role}`)} />
                            <div className="blocks-body">
                                <div className="blocks-side">
                                    {/* <div className="block-loan">
                                        <div className="block-loan-row">
                                            <BlockRow title='Параметры заявки' text={loan.calculation && `${loan.calculation.loan.toLocaleString('ru')} ₽ на ${loan.calculation.period} мес. под ${loan.calculation.percent}%`} />
                                        </div>
                                        <div className="block-loan-row">
                                            <BlockRow title='Остаток долга' text={`${loan.contract.balanceOwed ? loan.contract.balanceOwed.toLocaleString('ru') : 0} ₽`} />
                                            <BlockRow title='Остаток на счете' text={`${loan.contract.accountBalance ? loan.contract.accountBalance.toLocaleString('ru') : 0} ₽`} />
                                        </div>
                                        <div className="block-loan-row">
                                            <BlockRow title='Дата займа' text={`${moment(loan.createdAt).format('DD MMM YYYY')}`} />
                                            <BlockRow title='Тип займа' text={loan.contract.type} />
                                        </div>
                                    </div> */}
                                    <Block
                                        title='Параметры заявки'
                                        rows={[
                                            loan.calculation && [
                                                {
                                                    bottom: `${loan.calculation.loan.toLocaleString('ru')} ₽ на ${loan.calculation.period} мес. под ${loan.calculation.percent}%`
                                                }
                                            ],
                                            [
                                                {
                                                    top: 'Статус',
                                                    bottom: `${loan.status.name}`, style: { top: 'grey' }
                                                },
                                                {
                                                    top: 'Дата',
                                                    bottom: `${moment(loan.createdAt).format('DD MMMM')}`, style: { top: 'grey' }
                                                }
                                            ],
                                            // [
                                                // {
                                                //     top: 'Персональный менеджер',
                                                //     bottom: workers.manager.hasOwnProperty('error')
                                                //     ? 'Ошибка'
                                                //     : typeof workers.manager !== 'string' && GetFullName(workers.manager),
                                                //     style: { top: 'grey' }
                                                // }
                                            // ]
                                    ].filter(e => e)}/>
                                     {!(isEmpty(loan) || isEmpty(loan.persons)) && <Block
                                        title='Участники'
                                        rows={[
                                            ...(((loan || {}) || {}).persons || []).map((e, i) => {
                                                const index = persons.findIndex(p => e.id === p.id);
                                                if ((persons[i] && persons[i].hasOwnProperty('message')) || index < 0) {
                                                    return [{ top: <DummyInfo key={i} error={index} /> }];
                                                }
                                                return [{
                                                    top: GetFullName(persons[i]),
                                                    bottom: GetFullName(persons[i]) && e.roles[0][0].toUpperCase() + e.roles.join(', ').slice(1).toLowerCase(),
                                                    style: { bottom: 'grey' }
                                                }];
                                            })
                                        ]} />}
                                    {!(isEmpty(loan) || isEmpty(loan.facilities)) && <Block
                                        title='Залог'
                                        rows={[
                                            ...(((loan || {}) || {}).facilities || []).map((e, i) => {
                                                const index = facilities.findIndex(f => e === f.id);
                                                if ((facilities[i] && facilities[i].hasOwnProperty('message')) || index < 0) {
                                                    return [{ top: <DummyInfo key={i} error={index} /> }];
                                                }
                                                return [{
                                                    top: `${facilities[i].type} ${facilities[i].area} м²${facilities[i].assessment ? ` — ${facilities[i].assessment.averagePrice.toLocaleString('ru')} ₽` : null}`,
                                                    bottom: facilities[i].address.mergedAddress,
                                                    style: { bottom: 'grey' }
                                                }];
                                            })
                                        ]} />}
                                    <Block
                                        title='Документы'
                                        customContent={() => (
                                            <div>
                                                <DocumentsList
                                                    documents={[{"id":"5bff818d7d4f0b00013fb330","title":"Заявление на предоставление займа.svg","createdAt":"2018-11-29T06:05:01.868Z","downloadPath":"applications/5bf79135c3ab470001a5b89e/documents/Заявление на предоставление займа.svg","category":{"title":"LOAN_APPLICATION","value":"Заявление на предоставление займа","entities":["APPLICATION","LOAN"],"comment":null,"required":true}},{"id":"5bff818e7d4f0b00013fb331","title":"Заявление на предоставление займа-1.svg","createdAt":"2018-11-29T06:05:02.646Z","downloadPath":"applications/5bf79135c3ab470001a5b89e/documents/Заявление на предоставление займа-1.svg","category":{"title":"LOAN_APPLICATION","value":"Заявление на предоставление займа","entities":["APPLICATION","LOAN"],"comment":null,"required":true}},{"id":"5bff818e7d4f0b00013fb332","title":"Заявление на предоставление займа-2.svg","createdAt":"2018-11-29T06:05:02.878Z","downloadPath":"applications/5bf79135c3ab470001a5b89e/documents/Заявление на предоставление займа-2.svg","category":{"title":"LOAN_APPLICATION","value":"Заявление на предоставление займа","entities":["APPLICATION","LOAN"],"comment":null,"required":true}},{"id":"5bff818f7d4f0b00013fb333","title":"Заявление на предоставление займа-3.svg","createdAt":"2018-11-29T06:05:03.162Z","downloadPath":"applications/5bf79135c3ab470001a5b89e/documents/Заявление на предоставление займа-3.svg","category":{"title":"LOAN_APPLICATION","value":"Заявление на предоставление займа","entities":["APPLICATION","LOAN"],"comment":null,"required":true}}]}/>
                                            </div>
                                    )}/>
                                </div>
                                <div className="blocks-side">
                                    <Block
                                        title='Предстоящий платеж'
                                        customContent={() => (
                                            <div className={`loan-pay ${isOverdue ? 'loan-pay-overdue' : ''}`}>
                                                 <div className="loan-payment">{payment}</div>
                                                    <div className="loan-under blue">
                                                        <span onClick={this.toggle}>{this.state.isToggled ? 'Свернуть' : 'Подробно'}</span>
                                                        {upcomingPayment && this.role === 'borrower' && <span onClick={this.onPayClick} className='blue pointer'>Оплатить</span>}
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
                                    )}/>
                                    {/* <div className="block-loan mb-20">
                                        <div className="loan-payment">{payment}</div>
                                        <div className="loan-under">
                                            <p className='grey'>Предстоящий платеж</p>
                                            <p className='blue'>
                                                <span onClick={this.toggle}>{this.state.isToggled ? 'Свернуть' : 'Подробно'}</span>
                                                {upcomingPayment && this.role === 'borrower' && <span onClick={this.onPayClick} className='blue pointer'>Оплатить</span>}
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
                                    </div> */}
                                    {/* {!isEmpty(loan.contract.motion) && <div className="loan-history">
                                        <h4>Движение средств по договору</h4>
                                        {motion && motion.map((e, i) => {
                                            let {title, color} = this.defineTitleAndColor(e);
                                            return <HistoryRow
                                                key={i}
                                                title={title}
                                                expenses={e.amount.toLocaleString('ru')}
                                                date={moment(e.date).format('DD MMM YYYY')}
                                                color={color} />;
                                        })}
                                    </div>} */}
                                    <Block
                                        title='Движение средств по договору'
                                        customContent={() => (
                                            <div className='loan-history'>
                                                {motion && motion.map((e, i) => {
                                                    let {title, color} = this.defineTitleAndColor(e);
                                                    return <HistoryRow
                                                        key={i}
                                                        title={title}
                                                        expenses={e.amount.toLocaleString('ru')}
                                                        date={moment(e.date).format('DD MMM YYYY')}
                                                        color={color} />;
                                                })}
                                            </div>
                                    )}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}