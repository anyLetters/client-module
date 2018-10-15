import React, { Component } from 'react';
import miniLogo from '../../images/mini-logo.svg';
import logo from '../../images/logo-textless.svg';
import logout from '../../images/logout.svg';
import { Link } from 'react-router-dom';
import Auth from '../../api/auth';
import account from '../../images/account-default.svg';
import './style.css';
import './media.css';
import { isEmpty } from 'ramda';

class Tabs extends Component {

    state = {
        tab: null
    }

    switchTab = tab => {
        if (tab.value === this.state.tab.value) return;
        this.setState({ tab });
    }

    componentDidMount() {
        this.defineTab();
    }

    defineTab = () => {
        switch(window.location.pathname.split('/')[1]) {
            case 'borrower':
                this.setState({ tab: this.props.items.find(item => item.value === 'borrower') });
                break;
            case 'investor':
                this.setState({ tab:this.props.items.find(item => item.value === 'investor') });
                break;
        }
    }

    render() {
        const { items } = this.props;

        if (!this.state.tab) return null;

        return (
            <div className='menu-tabs'>
                {items.map((e, i) => {
                    return (
                        <div key={i} className={`menu-tab ${e.value === this.state.tab.value ? 'tab-active' : ''}`} onClick={() => this.switchTab(e)}>
                            <Link className={`${e.value !== this.state.tab.value ? 'grey' : 'blue'}`} to={`/${e.value}`}>{e.title}</Link>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default class Menu extends Component {

    logout = () => {
        Auth.logout();
    }

    setUsername = user => {
        let name = user.name ? user.name : '';
        let surname = user.surname ? user.surname : '';
        // let username = `${name} ${surname}`.trim();
        // if (username.length >= 20 && name.length < 20 && surname) {
        //     username = `${user.name} ${surname ? `${surname[0]}.` : ''}`.trim();
        // }
        // if (name.length > 20) {
        //     username = name.split(' ')[0];
        // }
        this._username = `${user.name || ''} ${surname ? `${surname[0]}.` : ''}`.trim();
    }

    componentDidMount() {
        if (!isEmpty(this.props.data)) {
            this.setUsername(this.props.data);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setUsername(nextProps.data);
        }
    }

    render() {
        const { error, fetching } = this.props;

        return (
            <div className='menu'>
                <div className='menu-content'>
                    <div>
                        <Link to='/'>
                            <img src={miniLogo} className='menu-mini-logo' alt=""/>
                            <img src={logo} className='menu-big-logo' alt=""/>
                        </Link>
                        <span className='menu-btn blue'>Меню</span>
                        <Tabs
                            items={[
                                {title: 'Заёмщик', value: 'borrower'},
                                {title: 'Инвестор', value: 'investor'}
                            ]}/>
                    </div>
                    <div>
                        <span className='menu-apply blue'>Подать заявку на заём</span>
                        {!error && !fetching && this._username && <Link to='/' className='username'>
                            {this._username}
                        </Link>}
                        <Link to='/login' className='logout' onClick={this.logout}><img src={logout} alt="выйти"/></Link>
                    </div>
                </div>
            </div>
        );
    }
}