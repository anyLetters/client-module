import React, { Component } from 'react';
import miniLogo from '../../images/mini-logo.svg';
import logo from '../../images/logo-textless.svg';
import logout from '../../images/logout.svg';
import fullLogo from '../../images/full-logo.svg';
import { Link } from 'react-router-dom';
import Auth from '../../api/auth';
import account from '../../images/account-default.svg';
import './style.css';
import './media.css';
import { isEmpty } from 'ramda';
import ContentLoader from "react-content-loader";

const MyLoader = props => (
	<ContentLoader
		height={18}
		width={100}
		speed={2}
		primaryColor="#f9f9f9"
		secondaryColor="#f3f3f3"
		{...props}>
		<rect x="0" y="0" rx="6" ry="6" width="100" height="18" />
	</ContentLoader>
);

// class Tabs extends Component {

    // state = {
    //     tab: null
    // }

    // switchTab = tab => {
    //     if (tab.value === this.state.tab.value) return;
    //     this.setState({ tab });
    // }

    // componentDidMount() {
    //     this.defineTab();
    // }

    // static getDerivedStateFromProps(props, state) {
    //     switch(window.location.pathname.split('/')[1]) {
    //         case 'borrower':
    //             return { tab: props.items.find(item => item.value === 'borrower') };
    //         // case 'investor':
    //         //     return { tab: props.items.find(item => item.value === 'investor') };
    //     }
    //     return null;
    // }

    // defineTab = () => {
    //     switch(window.location.pathname.split('/')[1]) {
    //         case 'borrower':
    //             this.setState({ tab: this.props.items.find(item => item.value === 'borrower') });
    //             break;
    //         // case 'investor':
    //         //     this.setState({ tab:this.props.items.find(item => item.value === 'investor') });
    //         //     break;
    //     }
    // }

//     render() {
//         const { items } = this.props;

//         if (!this.state.tab) return null;

//         return (
//             <div className='menu-tabs'>
//                 {items.map((e, i) => {
//                     return (
//                         <Link
//                             key={i}
//                             onClick={() => this.switchTab(e)}
//                             className={`menu-tab ${e.value !== this.state.tab.value ? 'grey' : 'tab-active blue'}`}
//                             to={`/${e.value}`}>
//                             {e.title}
//                         </Link>
//                     );
//                 })}
//             </div>
//         );
//     }
// }

export default class Menu extends Component {

    logout = () => {
        Auth.logout();
    }

    setUsername = user => {
        let name = user.name ? user.name : '';
        let surname = user.surname ? user.surname : '';
        this.username = `${user.name || ''} ${surname ? `${surname[0]}.` : ''}`.trim();
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
        console.log(this.state, this.username);

        return (
            <div className='menu'>
                <div className='menu-content'>
                    <div>
                        <Link to={this.props.history.location}>
                            {/* <img src={miniLogo} className='menu-mini-logo' alt=""/> */}
                            <img src={fullLogo} className='menu-logo' alt=""/>
                        </Link>
                        {/* <span className='menu-btn blue'>Меню</span> */}
                        {/* <Tabs
                            items={[
                                {title: 'Заёмщик', value: 'borrower'},
                                // {title: 'Инвестор', value: 'investor'}
                            ]}/> */}
                    </div>
                    <div>
                        <span className='menu-apply blue'>Подать заявку на заём</span>
                        <div className="user-actions">
                            {fetching && <MyLoader/>}
                            {!error && !fetching && this.username && <Link to='/' className='username'>
                                {this.username}
                            </Link>}
                            <Link
                                to='/login'
                                className='logout'
                                onClick={this.logout}>
                                <img src={logout} alt="выйти"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}