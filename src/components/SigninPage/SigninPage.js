import React, { Component } from 'react';
import logo from '../../images/mini-logo-white.svg';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Auth from '../../api/auth';
import './style.css';
import './media.css';
import Loader from '../Loader/Loader';

function Form({ step, error }) {
    return (
        <div>
            <div className='signin-form-title'>
                <h1>{step.title}</h1>
                <p className='signin-form-hint'>{step.hint}</p>
            </div>
            <div className="signin-form-inputs">
                <form onSubmit={step.onSubmit}>
                    {step.inputs.map((Input, i) => <Input key={i} />)}
                    <input type="submit" className='input input-submit' value={step.submitPlaceholder}/>
                    {error && <p className='red' style={{marginTop: '24px'}}>{error}</p>}
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
        step: {
            title: 'Вход',
            hint: `Используйте номер, который вы указывали в заявке на заём.`,
            inputs: [() => this.getInput('phone'), () => this.getInput('password')],
            secondHint: null,
            submitPlaceholder: 'Далее',
            onSubmit: e => this.submit(e),
            error: null
        }
    }

    getInput = (input) => {
        switch(input) {
            case 'phone':
                return (
                    <InputMask
                        className='input input-black'
                        required
                        onChange={e => this.setState({ values: { ...this.state.values, phone: e.target.value } })}
                        value={this.state.values.phone}
                        mask="+7 999 999-99-99"
                        placeholder='Номер телефона'
                        maskChar=""/>
                );
            case 'password':
                return (
                    <input
                        type='password'
                        className='input input-black'
                        required
                        onChange={e => this.setState({ values: { ...this.state.values, password: e.target.value } })}
                        value={this.state.values.password}
                        placeholder='Пароль'/>
                );
        }
    }

    // submitPhone = (e) => {
    //     e.preventDefault();
    //     const { values } = this.state;
    //     const phone = values.phone.replace(/[^0-9.]/g, "").slice(1);

    //     if (phone.length !== 10) {
    //         this.setState({error: 'Номер не полный'});
    //         return;
    //     }

    //     this.setState({
    //         step: {
    //             title: 'Пароль',
    //             hint: `Пароль отправлен по СМС на номер: ${this.state.values.phone}`,
    //             inputs: () => this.getInput('password'),
    //             secondHint: null,
    //             submitPlaceholder: 'Войти',
    //             onSubmit: e => this.submitPhone(e),
    //             error: null
    //         }
    //     });
    // }

    submit = e => {
        e.preventDefault();
        const phone = this.state.values.phone.replace(/[^0-9.]/g, '').slice(1);
        const password = this.state.values.password;

        if (phone.length !== 10) {
            this.setState({error: 'Номер не полный'});
            return;
        }

        this.setState({ isLoading: true }, () => {
            Auth.login({
                grant_type: 'password',
                username: phone,
                password
            }).then(() => this.props.history.push('/borrower')).catch(json => {
                this.showError(json);
                console.error(`Error: ${json.error}\nMessage: ${json.message}`);
            });
        })
    }

    showError = (error) => {
        switch (error.message) {
            case 'Bad credentials':
                this.setState({error: 'Неверный логин или пароль', isLoading: false});
                break;
            default:
                this.setState({error: 'Ошибка приложения, попробуйте позже', isLoading: false});
        }
    }

    componentDidMount() {
        document.body.style = 'background: #343434;';
    }

    render() {
        const { error, isLoading, step } = this.state;

        return (
            <div className='signin-page'>
                <div className="wrapper">
                    <div className="content-signin">
                        <div className="menu no-padding">
                            <img src={logo} alt=""/>
                        </div>
                        <div className="signin-form">
                            {isLoading ? <Loader/> : <Form step={step} error={error}/>}
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