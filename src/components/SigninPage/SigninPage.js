import React, { Component } from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import './style.css';

export default class SigninPage extends Component {
    render() {
        return (
            <div className='signin-page'>
                <div className="back"></div>
                <div className="wrapper">
                    <div className="content-signin">
                        <div className="signin-form">
                            <div className="logo">
                                <img src={logo} alt=""/>
                            </div>
                            <div className="signin-form-inputs">
                                <form>
                                    <InputMask
                                        className='input input-black'
                                        required
                                        ref={ref => this.phoneInput = ref}
                                        mask="+7 999 999-99-99"
                                        placeholder='Номер телефона'
                                        maskChar=""/>
                                    <input type="password" className='input input-black' placeholder='Пароль'/>
                                    <input type="submit" className='input input-submit' value='Войти'/>
                                </form>
                            </div>
                            <div className="signin-form-links">
                                <Link to='/login/recovery'>Не помню пароль</Link>
                                <br/>
                                <Link to='/signup'>Зарегистрироваться</Link>
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