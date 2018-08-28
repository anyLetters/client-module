import React, { Component } from 'react';
import logo from '../../images/mini-logo.svg';
import logout from '../../images/logout.svg';
import { Link } from 'react-router-dom';
import Auth from '../../api/auth';
import account from '../../images/account-default.svg';
import './style.css';
import { isEmpty } from 'ramda';

export default class Menu extends Component {

    logout = () => {
        Auth.logout();
    }

    setUsername = user => {
        let name = user.name ? user.name : '';
        let surname = user.surname ? user.surname : '';
        // let username = `${name} ${surname}`.trim();
        // if (username.length >= 20 && name.length < 20 && surname) {
        //     username = `${user.name} ${surname ? `${surname[0]}.` : ''}`.trim();
        // }
        // if (name.length > 20) {
        //     username = name.split(' ')[0];
        // }
        this._username = `${user.name || ''} ${surname ? `${surname[0]}.` : ''}`.trim();
    }

    componentWillMount() {
        if (!isEmpty(this.props.data)) {
            this.setUsername(this.props.data);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setUsername(nextProps.data);
        }
    }

    render() {
        const { error, fetching } = this.props;
        return (
            <div className='menu'>
                <div>
                    <Link to='/'><img src={logo} alt=""/></Link>
                    <span className='username'>Меню</span>
                </div>
                <div>
                    {!error && !fetching && this._username && <Link to='/' className='username'>
                        {this._username}
                    </Link>}
                    <Link to='/login' onClick={this.logout}><img src={logout} alt="выйти"/></Link>
                </div>
            </div>
        );
    }
}