import React, { Component } from 'react';
// import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Auth from '../../api/auth';
import logo from '../../images/mini-logo-white.svg';
import { UserAPI } from '../../api/index';
import './style.css';

export default class SignupPage extends Component {

    state = {
        error: false,
        errorText: null
    }

    submit = e => {
        e.preventDefault();
        const phone =  this.phoneInput.value
        ? this.phoneInput.value.toString().replace(/[^0-9.]+/g, '').slice(1, this.phoneInput.value.length)
        : '';
        const password1 = this.passwordInput1.value;
        const password2 = this.passwordInput2.value;
        
        if (password1 !== password2) {
            this.showError('Пароли не совпадают')
            return;
        };

        UserAPI.create({ username: phone, password: password1 })
            .then(response => {
                Auth.login({
                    grant_type: 'password',
                    username: response.phone,
                    password: password1
                })
                .then(() => this.props.history.push('/loans'))
                .catch(json => {
                    this.showError('Ошибка приложения, попробуйте позже');
                    console.error(`Error: ${json.error}\nMessage: ${json.message}`);
                });
            })
            .catch(json => {
                this.showError('Ошибка приложения, попробуйте позже');
                console.error(`Error: ${json.error}\nMessage: ${json.message}`);
            });
    }

    showError = (errorText) => {
        this.setState({error: true, errorText}, () => setTimeout(() => {
            this.setState({error: false})
        }, 1000));
    }

    render() {
        const { error, errorText } = this.state;
        return (
            <div className='signup-page'>
                <div className="back"></div>
                <div className="wrapper">
                    <div className="content-signup">
                        <div className="menu">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="signup-form">
                            {/* <div className="logo">
                                <img src={logo} alt=""/>
                            </div> */}
                            <div className='signup-form-title'>
                                <h1>Регистрация</h1>
                            </div>
                            <div className="signup-form-inputs">
                                <form onSubmit={this.submit}>
                                    <InputMask
                                        className='input input-black'
                                        required
                                        ref={ref => this.phoneInput = ref}
                                        mask="+7 999 999-99-99"
                                        placeholder='Номер телефона'
                                        maskChar=""/>
                                    <input type="password" required ref={ref => this.passwordInput1 = ref} className='input input-black' placeholder='Пароль'/>
                                    <input type="password" required ref={ref => this.passwordInput2 = ref} style={{marginBottom: 0}} className='input input-black' placeholder='Пароль ещё раз'/>
                                    <input type="submit" className='input input-submit' style={{backgroundColor: error ? '#dd6666' : '', transitionDuration: '.5s'}} value='Зарегистрироваться'/>
                                    {errorText && <p className='red' style={{marginTop: '24px'}}>{errorText}</p>}
                                </form>
                            </div>
                            <div className="signup-form-links">
                                <p>Уже зарегистрированы?</p>
                                <Link to='/login'>Войти</Link>
                            </div>
                        </div>
                        <footer>
                            <p><span>© 2018, КредитКлаб</span> <span>8 800 775 80 09</span></p>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}