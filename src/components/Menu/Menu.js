import React, { Component } from 'react';
import logo from '../../images/mini-logo.svg';
import logout from '../../images/logout.svg';
import { Link } from 'react-router-dom';
import './style.css';

export default class Menu extends Component {
    render() {
        return (
            <div className='menu'>
                <Link to='/applications'><img src={logo} alt=""/></Link>
                <Link to='/login'><img src={logout} alt=""/></Link>
            </div>
        );
    }
}