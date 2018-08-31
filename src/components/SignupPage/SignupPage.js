import React, { Component } from 'react';
// import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Auth from '../../api/auth';
import logo from '../../images/mini-logo-white.svg';
import Loader from '../Loader/Loader';
import { PersonAPI, Dadata } from '../../api/index';
import './style.css';

export default class SignupPage extends Component {

    state = {
        error: false,
        errorText: null,
        isLoading: false
    }

    submit = e => {
        e.preventDefault();
        const phone =  this.phoneInput.value
        ? this.phoneInput.value.toString().replace(/[^0-9.]+/g, '').slice(1, this.phoneInput.value.length)
        : '';
        const password = this.passwordInput1.value;
        const password2 = this.passwordInput2.value;
        const query = this.fullName.value.trim();

        if (password !== password2) {
            this.setState({error: true, errorText: 'Пароли не совпадают'});
            return;
        };
        this.setState({ isLoading: true }, () => {
            Dadata.getFIOSuggestions(query)
                .then(personRes => {
                    PersonAPI.create({
                        name: personRes.name,
                        surname: personRes.surname,
                        patronymic: personRes.patronymic,
                        phone,
                        password
                    })
                    .then(response => {
                        Auth.login({
                            grant_type: 'password74',
                            username: phone,
                            password
                        })
                        .then(() => this.props.history.push('/borrower'))
                        .catch(json => this.props.history.push('/login'));
                    })
                    .catch(json => {
                        this.showError(json);
                        console.error(`Error: ${json.error}\nMessage: ${json.message}`);
                    });
            })
            .catch((json) => this.showError(json));
        })
    }

    showError = (error) => {
        if (error.message.includes('user already exists')) {
            this.setState({error: true, errorText: 'Такой пользователь уже существует', isLoading: false});
            return;
        }
        switch (error.message) {
            // case 'Bad credentials':
            //     this.setState({error: true, errorText: 'Неверный логин или пароль', isLoading: false});
            //     break;
            default:
                this.setState({error: true, errorText: 'Ошибка приложения, попробуйте позже', isLoading: false});
        }
    }

    componentDidMount() {
        document.body.style = 'background: #343434;';
    }

    render() {
        const { error, errorText, isLoading } = this.state;
        return (
            <div className='signup-page'>
                <div className="wrapper">
                    <div className="content-signup">
                        <div className="menu no-padding">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="signup-form">
                        {isLoading
                        ?   <Loader/>
                        :   <div>
                                <div className='signup-form-title'>
                                    <h1>Регистрация</h1>
                                </div>
                                <div className="signup-form-inputs">
                                    <form onSubmit={this.submit}>
                                        <input required ref={ref => this.fullName = ref} className='input input-black' placeholder='ФИО'/>
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
                                        {errorText && <p className='red' style={{marginTop: '24px'}}>{errorText}</p>}
                                    </form>
                                </div>
                                <div className="signup-form-links">
                                    <p>Уже зарегистрированы?</p>
                                    <Link to='/login'>Войти</Link>
                                </div>
                            </div>}
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