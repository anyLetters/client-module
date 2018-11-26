import React, { Component } from 'react';
import logo from '../../images/mini-logo-white.svg';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { PersonAPI } from '../../api/index';
import Auth from '../../api/auth';
import './style.css';
import './media.css';
import Loader from '../Loader/Loader';

function Form({ step, disabled }) {
    return (
        <div>
            <div className='signin-form-title'>
                <h1>{step.title}</h1>
                <p className='signin-form-hint'>{step.hint}</p>
            </div>
            <div>
                <form onSubmit={step.onSubmit}>
                    <div className="signin-form-inputs">
                        {step.inputs.map((Input, i) => <Input key={i} />)}
                    </div>
                    {step.secondHint && <p className="signin-form-second-hint">{step.secondHint}</p>}
                    <input type="submit" className='input input-submit' value={step.submitPlaceholder}/>
                    {step.error && <p className='red' style={{marginTop: '24px'}}>{step.error}</p>}
                </form>
            </div>
        </div>
    );
}

export default class SigninPage extends Component {

    state = {
        isLoading: false,
        values: {
            phone: null,
            password: null
        },
        disabled: false,
        step: {
            title: 'Вход',
            hint: `Используйте номер, который вы указывали в заявке на заём.`,
            inputs: [() => this.getInput('phone')],
            secondHint: null,
            submitPlaceholder: 'Далее',
            onSubmit: e => this.submitPhone(e),
            error: null
        }
    }

    getInput = (input) => {
        switch(input) {
            case 'phone':
                return (
                    <div>
                        <InputMask
                            className='input input-black'
                            required
                            onChange={e => this.setState({ values: { ...this.state.values, phone: e.target.value } })}
                            value={this.state.values.phone || ''}
                            mask="+7 999 999-99-99"
                            placeholder='Номер телефона'
                            maskChar=""/>
                    </div>
                );
            case 'password':
                return (
                    <div>
                        <input
                            type='password'
                            className='input input-black'
                            required
                            onChange={e => this.setState({ values: { ...this.state.values, password: e.target.value } })}
                            value={this.state.values.password || ''}
                            placeholder='Пароль'/>
                    </div>
                );
            case 'passwordWithRecover':
                return (
                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <input
                            type='password'
                            className='input input-black'
                            required
                            maxLength='20'
                            onChange={e => this.setState({ values: { ...this.state.values, password: e.target.value } })}
                            value={this.state.values.password || ''}
                            placeholder='Пароль'/>
                            <span
                                className={`blue ${this.state.disabled ? 'none' : ''}`}
                                onClick={this.passwordRecovery}
                                style={{
                                    position: 'absolute',
                                    right: 16,
                                    transitionDuration: '.5s',
                                    fontSize: 16,
                                    cursor: 'pointer'
                                }}>
                                Не помню
                            </span>
                    </div>
                );
        }
    }

    submitPhone = (e) => {
        e.preventDefault();
        const { values } = this.state;
        const phone = values.phone.replace(/[^0-9.]/g, "").slice(1);

        if (phone.length !== 10) {
            this.setState({ step: { ...this.state.step, error: 'Номер не полный' } });
            return;
        }

        this.setState({ isLoading: true }, () => {
            PersonAPI.signin(phone).then((response) => {
                if (response.ok) {
                    if (response.status === 201) {
                        this.setState({
                            isLoading: false,
                            step: {
                                title: 'Пароль',
                                hint: `Пароль отправлен по СМС на номер: ${this.state.values.phone}`,
                                inputs: [() => this.getInput('password')],
                                secondHint: null,
                                submitPlaceholder: 'Войти',
                                onSubmit: e => this.signin(e),
                                error: null
                            }
                        });
                    } else if (response.status === 200) {
                        this.setState({
                            isLoading: false,
                            step: {
                                title: 'Пароль',
                                hint: `Вы можете найти пароль в истории СМС сообщений.`,
                                inputs: [() => this.getInput('passwordWithRecover')],
                                secondHint: null,
                                submitPlaceholder: 'Войти',
                                onSubmit: e => this.signin(e),
                                error: null
                            }
                        });
                    }
                }
            }).catch(e => {
                this.setState({
                    isLoading: false,
                    step: {
                        ...this.state.step,
                        error: e.message
                    }
                })
            });
        })
    }

    signin = (e) => {
        e.preventDefault();
        const { values } = this.state;
        const phone = values.phone.replace(/[^0-9.]/g, "").slice(1);
        const password = values.password;
        
        if (!password && !phone) return;

        this.setState({ isLoading: true }, () => {
            Auth.login({
                grant_type: 'password',
                username: phone,
                password
            }).then(() => this.props.history.push('/borrower')).catch(json => {
                this.showError(json);
            });
        })
    }

    undisabled = (time) => {
        this.timeout = setTimeout(() => {
            this.setState({ disabled: false });
        }, 30000);
    }

    passwordRecovery = () => {
        const { values } = this.state;
        const phone = values.phone.replace(/[^0-9.]/g, "").slice(1);

        this.setState({
            disabled: true
        }, () => {
            PersonAPI.passwordRecovery(phone).then(() => {
                this.setState({
                    step: {
                        title: 'Пароль',
                        hint: `Пароль отправлен вам по СМС. Если вы входите не впервые, поищите его в истории сообщений.`,
                        inputs: [() => this.getInput('passwordWithRecover')],
                        secondHint: 'Мы отправили новый пароль по СМС. Если СМС не приходит, напишите в чат внизу страницы. Запросить можно будет снова через 30 секунд.',
                        submitPlaceholder: 'Войти',
                        onSubmit: e => this.signin(e),
                        error: null
                    }
                }, this.undisabled);
            }).catch(e => {
                this.setState({
                    disabled: false,
                    step: {
                        ...this.state.step,
                        error: e.message
                    }
                })
            })
        })
    }

    showError = (error) => {
        switch (error.message) {
            case 'Bad credentials':
                this.setState({ step: { ...this.state.step, error: 'Неверный пароль' }, isLoading: false});
                break;
            default:
                this.setState({error: 'Ошибка приложения, попробуйте позже', isLoading: false});
        }
    }

    componentDidMount() {
        document.body.style = 'background: #343434;';
    }

    componentWillUnmount() {
        clearInterval(this.timeout);
        document.body.style = 'background: #f9f9f9';
    }

    render() {
        const { isLoading, step } = this.state;

        return (
            <div className='signin-page'>
                <div className="wrapper">
                    <div className="content-signin">
                        <div className="menu no-padding">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="signin-form">
                            {isLoading ? <Loader/> : <Form step={step} disabled={this.state.disabled}/>}
                        </div>
                        <footer>
                            <p><span>© {new Date().getFullYear()}, Credit.club</span> <span>8 800 775 80 09</span></p>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}