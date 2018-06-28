import React, { Component } from 'react';
import logo from '../../images/mini-logo.svg';
import logout from '../../images/logout.svg';
import { Link } from 'react-router-dom';
import Auth from '../../api/auth';
import './style.css';

export default class Menu extends Component {

    logout = () => {
        Auth.logout();
    }

    render() {
        return (
            <div className='menu'>
                <Link to='/applications'><img src={logo} alt=""/></Link>
                <Link to='/login' onClick={this.logout}><img src={logout} alt=""/></Link>
            </div>
        );
    }
}