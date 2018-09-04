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
        tab: this.props.active
    }

    switchTab = tab => {
        if (tab === this.state.tab) return;
        this.setState({ tab });
    }

    render() {
        const { items } = this.props;

        return (
            <div className='menu-tabs'>
                {items.map((e, i) => {
                    return (
                        <div key={i} className={`menu-tab ${e.value === this.state.tab ? 'tab-active' : ''}`} onClick={() => this.switchTab(e.value)}>
                            <Link className={`${e.value !== this.state.tab ? 'grey' : 'blue'}`} to={`/${e.value}`}>{e.title}</Link>
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

    componentWillMount() {
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
        const { error, fetching, active } = this.props;
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
                            active={active}
                            items={[
                                {title: 'Займы', value: 'loans'},
                                {title: 'Инвестиции', value: 'investments'}
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