import React, { Component } from 'react';
import logo from '../../images/mini-logo.svg';
import logout from '../../images/logout.svg';
import './style.css';

export default class Menu extends Component {
    render() {
        return (
            <div className='menu'>
                <img src={logo} alt=""/>
                <img src={logout} alt=""/>
            </div>
        );
    }
}