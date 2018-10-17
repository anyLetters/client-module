import React, { Component } from 'react';
import { ApplicationAPI } from '../../api/index';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { isEmpty } from 'ramda';
import moment from 'moment';
import empty from '../../images/empty-folder.svg';
import 'moment/locale/ru';
import ContentLoader from "react-content-loader";

function MyLoader(props) {
    return (
        <ContentLoader 
            height={400}
            width={1148}
            speed={2}
            primaryColor="#f9f9f9"
            secondaryColor="#f3f3f3"
            {...props}>
            <rect x="0" y={0} rx="4" ry="4" width="256" height="16" />
            <rect x="268" y={0} rx="4" ry="4" width="128" height="16" />
            <rect x="408" y={0} rx="4" ry="4" width="64" height="16" />
            {[1].map((e, i) => {
                let y = 24 + (i * (56 + 8));
                return (
                    <rect key={i} x="0" y={y} rx="4" ry="4" width="1148" height="56" />
                );
            })}
        </ContentLoader>
    );
}

function Application(props) {
    const { application } = props;
    const date = moment.utc(application.createdAt, 'YYYY-MM-DD').local().format('D MMM YYYY');
    const status = application.status.abbreviation;
    const lastCalculations = application.calculations[application.calculations.length - 1];

    const warranter = [
        ...application.persons.map(e => e.roles.join(', ')),
        ...application.organizations.map(e => e.roles.join(', ')),
        ...application.entrepreneurs.map(e => e.roles.join(', ')),
    ].find(e => e === 'Поручитель') || null;

    // const facilities = isEmpty(application.facilities) ? null : application.facilities.ma

    const provisionNotFound = isEmpty(application.facilities) && !warranter && '—';

    let provision = `${warranter}`.toLowerCase();

    provision = provision[0].toUpperCase() + provision.substring(1);

    return (
        <Link to={`/investor/application/${application.id}`}>
            <div className='block-application'>
                <div className="block-application-mobile">
                    <div className="application-info">
                        <p>{`№${application.number} от ${date}`}</p>
                        <p className='grey'>
                            {lastCalculations.loan.toLocaleString('ru')} ₽ на {lastCalculations.period} мес. под {lastCalculations.percent}%
                        </p>
                    </div>
                    <div className="application-under">
                        <span className={status === 'REFUSAL' ? 'red' : status === 'BECAME_LOAN' ? 'green' : ''}>
                            {application.status.abbreviation}
                        </span>
                    </div>
                </div>
                <div className="block-application-desktop investor-apps">
                    <div>
                        {lastCalculations.loan.toLocaleString('ru')} ₽ на {lastCalculations.period} мес. под {lastCalculations.percent}%
                    </div>
                    <div>{date}</div>
                    <div>—</div>
                    <div>{application.purpose.length > 23 ? `${application.purpose.slice(0, 23)}...` : application.purpose}</div>
                    <div>{provisionNotFound ? provisionNotFound : provision}</div>
                </div>
            </div>
        </Link>
    );
}

export default class InvestmentApps extends Component {

    state = {
        applications: {
            data: [],
            error: null,
            fetching: false
        },
        pagination: {
            currentPage: 0,
            totalElements: 0,
            totalPages: 0
        },
        params: {
            direction: 'DESC5',
            size: 5,
            property: 'number',
            body: {
                applicants: { value: null },
                channels: { value: null },
                from: { value: null },
                purposes: { value: null },
                statuses: { value:
                    // null
                    ['Ожидает инвестирования']
                },
                to: { value: null },
                lawyers: { value: null },
                managers: { value: null },
                supervisors: { value: null }
            }
        }
    }

    fetchApplications = () => {
        this.setState({
            applications: {
                ...this.state.applications,
                fetching: true,
                error: null
            }
        }, () => {
            ApplicationAPI.getApplications({
                    ...this.state.params,
                    page: this.state.pagination.currentPage > 0
                    ? this.state.pagination.currentPage - 1 : 0
                })
                .then(json => {
                    this.setState({
                        applications: {
                            data: json.content,
                            fetching: false,
                            error: null
                        },
                        pagination: {
                            currentPage: json.last ? json.totalPages : json.pageable.pageNumber + 1,
                            totalElements: json.totalElements,
                            totalPages: json.totalPages
                        }
                    })
                })
                .catch(this.onError);
        })
    }

    onError = (error) => {
        this.setState({
            applications: {
                data: [],
                fetching: false,
                error: 'Не удалось загрузить заявки, попробуйте позже'
            }
        })
    }

    renderApplications = (applications) => {
        return (
            <div className='applications'>
                <div className='applications-columns investor-apps'>
                    <div>Параметры заявки</div>
                    <div>Дата подачи</div>
                    <div>Рейтинг</div>
                    <div>Цель займа</div>
                    <div>Обеспечение</div>
                </div>
                {applications.map((application, i) => <Application key={i} application={application} link={this.props.history.push} /> )}
            </div>
        );
    }

    renderContent = () => {
        const { applications } = this.state;

        if (applications.fetching) {
            return (
                <div className='entity-list'>
                    <h3 className='tabs-item'>Лента заявок</h3>
                    <div style={{marginTop: 30}}><MyLoader/></div>
                </div>
            );
        }

        if (isEmpty(applications.data) && !applications.fetching && applications.error) {
            return (
                <div className='entity-list'>
                    <h3 className='tabs-item'>Лента заявок</h3>
                    <p className='entity-list-message red'>{applications.error}</p>
                </div>
            );
        }

        if (isEmpty(applications.data) && !applications.fetching) {
            return (
                <div className='entity-list'>
                    <h3 className='tabs-item'>Лента заявок</h3>
                    <p className='entity-list-message'>Заявок на инвестирование нет. Попробуйте зайти позже</p>
                </div>
            );
        }

        return (
            <div className={`entity-list`}>
                <h3 className='tabs-item'>Лента заявок</h3>
                {this.renderApplications(applications.data)}
            </div>
        );
    }

    componentDidMount() {
        this.fetchApplications();
    }

    render() {
        return this.renderContent();
    }
}