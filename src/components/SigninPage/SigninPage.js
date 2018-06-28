import React, { Component } from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Auth from '../../api/auth';
import './style.css';

export default class SigninPage extends Component {

    submit = e => {
        e.preventDefault();
        const phone = this.phoneInput.value.replace(/[^0-9.]/g, "").slice(1);;
        const password = this.refs.password.value;

        Auth.login({
            grant_type: 'password',
            username: phone,
            password
        })
        .then(() => this.props.history.push('/applications'))
        .catch(json => {
            console.error(`Error: ${json.error}\nMessage: ${json.message}`);
        });
    }

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
                                <form onSubmit={this.submit}>
                                    <InputMask
                                        className='input input-black'
                                        required
                                        ref={ref => this.phoneInput = ref}
                                        mask="+7 999 999-99-99"
                                        placeholder='Номер телефона'
                                        maskChar=""/>
                                    <input ref='password' type="password" className='input input-black' placeholder='Пароль'/>
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