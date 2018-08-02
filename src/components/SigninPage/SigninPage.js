import React, { Component } from 'react';
import logo from '../../images/mini-logo-white.svg';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Auth from '../../api/auth';
import './style.css';

export default class SigninPage extends Component {

    state = {
        error: false,
        errorText: null
    }

    submit = e => {
        e.preventDefault();
        const phone = this.phoneInput.value.replace(/[^0-9.]/g, "").slice(1);;
        const password = this.refs.password.value;

        Auth.login({
            grant_type: 'password',
            username: phone,
            password
        })
        .then(() => this.props.history.push('/loans'))
        .catch(json => {
            this.showError(json);
            console.error(`Error: ${json.error}\nMessage: ${json.message}`);
        });
    }

    showError = (error) => {
        switch (error.message) {
            case 'Bad credentials':
                this.setState({error: true, errorText: 'Неверный логин или пароль'}, () => setTimeout(() => {
                    this.setState({error: false})
                }, 1000));
                break;
            default:
                this.setState({error: true, errorText: 'Ошибка приложения, попробуйте позже'}, () => setTimeout(() => {
                    this.setState({error: false})
                }, 1000));
        }
    }

    render() {
        const { error, errorText } = this.state;
        return (
            <div className='signin-page'>
                <div className="back"></div>
                <div className="wrapper">
                    <div className="content-signin">
                        <div className="menu">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="signin-form">
                            <div className='signup-form-title'>
                                <h1>Вход</h1>
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
                                    <input type="submit" className='input input-submit' style={{backgroundColor: error ? '#dd6666' : '', transitionDuration: '.5s'}} value='Войти'/>
                                    {errorText && <p className='red' style={{marginTop: '24px'}}>{errorText}</p>}
                                </form>
                            </div>
                            <div className="signin-form-links">
                                {/* <Link to='/login/recovery'>Не помню пароль</Link> */}
                                {/* <br/> */}
                                <Link to='/signup'>Зарегистрироваться</Link>
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