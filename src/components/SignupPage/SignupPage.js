import React, { Component } from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './style.css';

export default class SignupPage extends Component {
    render() {
        return (
            <div className='signup-page'>
                <div className="back"></div>
                <div className="wrapper">
                    <div className="content-signup">
                        <div className="signup-form">
                            <div className="logo">
                                <img src={logo} alt=""/>
                            </div>
                            <div className="signup-form-inputs">
                                <form>
                                    <input type="text" className='input input-black' placeholder='Имя'/>
                                    <input type="text" className='input input-black' placeholder='Телефон'/>
                                    <input type="password" className='input input-black' placeholder='Пароль'/>
                                    <input type="password" style={{marginBottom: 0}} className='input input-black' placeholder='Пароль ещё раз'/>
                                    <input type="submit" className='input input-submit' value='Зарегистрироваться'/>
                                </form>
                            </div>
                            <div className="signup-form-links">
                                <p>Уже зарегистрированы?</p>
                                <Link to='/login'>Войти</Link>
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