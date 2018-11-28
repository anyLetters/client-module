import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { isEmpty } from 'ramda';
import PayPopup from '../PayPopup/PayPopup';
import empty from '../../images/empty-folder.svg';
import { GetFullName } from '../../api/index';
import moment from 'moment';
import Loader from '../Loader/Loader';
import BorrowerPage from '../BorrowerPage/BorrowerPage';
import InvestorPage from '../InvestorPage/InvestorPage';
import 'moment/locale/ru';
import './style.css';
import './media.css';

export default class MainPage extends Component {

    componentDidMount() {
        if (isEmpty(this.props.loans.data)) {
            this.props.fetchLoans();
        }
        if (isEmpty(this.props.applications.data)) {
            this.props.fetchApplications();
        }
        // if (isEmpty(this.props.investments.data)) {
        //     this.props.fetchInvestments(this.props.user.id);
        // }
    }

    renderContent = () => {
        const { history } = this.props;

        switch (history.location.pathname.split('/')[1]) {
            case 'borrower':
                return <BorrowerPage {...this.props} />;
            // case 'investor':
            //     return <InvestorPage {...this.props} />;
            default:
                return null;
        }
    }

    render() {
        const { history } = this.props;
        return (
            <div className='main-page'>
                <div>
                    <div className="wrapper">
                        <div className="content-main">
                            <div className="content-main-upper">
                                {this.renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='wrapper content-main-footer'>
                    <input type="button" className='input input-submit' value='Подать заявку на заём'/>
                </div>
            </div>
        );
    }
}