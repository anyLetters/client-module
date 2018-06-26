import React, { Component } from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { User } from '../../api/index';
import './style.css';

export default class SignupPage extends Component {

    submit = e => {
        e.preventDefault();
        const name = this.nameInput.value;
        const phone = this.phoneInput.value;
        const password1 = this.passwordInput1.value;
        const password2 = this.passwordInput2.value;

        if (password1 !== password2) return;
        User.create();
    }

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
                                <form onSubmit={this.submit}>
                                    <input type="text" required ref={ref => this.nameInput = ref} className='input input-black' placeholder='Имя'/>
                                    <InputMask
                                        className='input input-black'
                                        required
                                        ref={ref => this.phoneInput = ref}
                                        mask="+7 999 999-99-99"
                                        placeholder='Номер телефона'
                                        maskChar=""/>
                                    <input type="password" required ref={ref => this.passwordInput1 = ref} className='input input-black' placeholder='Пароль'/>
                                    <input type="password" required ref={ref => this.passwordInput2 = ref} style={{marginBottom: 0}} className='input input-black' placeholder='Пароль ещё раз'/>
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