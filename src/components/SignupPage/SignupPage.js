import React, { Component } from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Auth from '../../api/auth';
import { UserAPI } from '../../api/index';
import './style.css';

export default class SignupPage extends Component {

    submit = e => {
        e.preventDefault();
        // const name = this.nameInput.value;
        const phone =  this.phoneInput.value
        ? this.phoneInput.value.toString().replace(/[^0-9.]+/g, '').slice(1, this.phoneInput.value.length)
        : '';
        const password1 = this.passwordInput1.value;
        const password2 = this.passwordInput2.value;

        if (password1 !== password2 || !phone) return;

        UserAPI.create({ username: phone, password: password1 })
            .then(response => {
                console.log(response);

                Auth.login({
                    grant_type: 'password',
                    username: response.phone,
                    password: password1
                })
                .then(() => this.props.history.push('/applications'))
                .catch(json => {
                    console.error(`Error: ${json.error}\nMessage: ${json.message}`);
                });
            })
            .catch(json => console.error(`Error: ${json.error}\nMessage: ${json.message}`));
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
                                    {/* <input type="text" required ref={ref => this.nameInput = ref} className='input input-black' placeholder='Имя'/> */}
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