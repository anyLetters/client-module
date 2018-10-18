import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { isEmpty } from 'ramda';
import doge from '../../images/1.png';
import PayPopup from '../PayPopup/PayPopup';
import empty from '../../images/empty-folder.svg';
import { GetFullName } from '../../api/index';
import moment from 'moment';
import Loader from '../Loader/Loader';
import InvestmentApps from '../InvestmentApps/InvestmentApps';
import 'moment/locale/ru';

export default class InvestorPage extends Component {

    renderMyInvestments = () => {
        
    }

    renderInvestor = () => {
        return (
            <div>
                {/* <img src={doge} alt=""/>
                <p style={{fontWeight: 600}}>INVESTOR... WOW... MUCH MONEY...</p> */}
                <InvestmentApps {...this.props} />
            </div>
        );
    }

    render() {
        return this.renderInvestor();
    }
}