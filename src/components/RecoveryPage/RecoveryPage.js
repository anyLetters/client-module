import React, { Component } from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './style.css';

export default class RecoveryPage extends Component {
    render() {
        return (
            <div className='recovery-page'>
                <div className="back"></div>
                <div className="wrapper">
                    <div className="content-recovery">
                        <div className="recovery-form">
                            <div className="logo">
                                <img src={logo} alt=""/>
                            </div>
                            <div className="recovery-form-inputs">
                                <form>
                                    <input type="text" className='input input-black' placeholder='Телефон'/>
                                    <input type="submit" className='input input-submit' value='Напомнить пароль'/>
                                </form>
                            </div>
                            <div className="recovery-form-links">
                                <p>Пришлем пароль в смс <br/> на указанный номер</p>
                            </div>
                        </div>
                        <footer>
                            <p><span>© 2018, КредитКлаб</span> <span>Помощь</span></p>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}