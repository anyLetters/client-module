import React, { Component } from 'react';
import './styles/fonts/ubuntu.css';
import './App.css';
import Auth from './api/auth';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import SigninPage from './components/SigninPage/SigninPage.js';
import SignupPage from './components/SignupPage/SignupPage.js';
import RecoveryPage from './components/RecoveryPage/RecoveryPage.js';
import Menu from './containers/Menu.js';
import Loader from './components/Loader/Loader';
import MainPage from './containers/Main';
import LoanPage from './containers/Loan';
import ApplicationPage from './containers/Application';
import NewLoanPage from './components/NewLoanPage/NewLoanPage';
import CreatePasswordPage from './components/CreatePasswordPage/CreatePasswordPage';
import { fetchUser } from './actions/index';
import { isEmpty } from 'ramda';
import { connect } from 'react-redux';

function UserError(props) {
	return (
		<div className='user-profile-error'>
			<h2>Ошибка приложения: не удалось загрузить профиль</h2>
		</div>
	);
}

function withAuth(AuthComponent) {

	function mapStateToProps(state) {
		return {
			user: state.user
		};
	}

	function mapDispatchToProps(dispatch) {
		return {
			fetchUser: () => dispatch(fetchUser())
		};
	}

   	class AuthWrapped extends Component {

		state = {
			component: null
		}

		fetchUserAndDefineAuthComponent = () => {
			if (isEmpty(this.props.user.data) && !this.props.user.fetching) {
				this.props.fetchUser();
			}
		}
		
		static getDerivedStateFromProps(props, state) {
			if (!isEmpty(props.user.data) && !props.user.error && !props.user.fetching) {
				return {
					component: <AuthComponent {...props} />
				};
			}
			if (props.user.error) {
				return {
					component: <UserError/>
				};
			}
			return null;
		}

        componentDidMount() {
            if (!Auth.loggedIn()) {
				Auth.logout();
				this.setState({ component: <Redirect to='/login' /> });
            } else {
				this.fetchUserAndDefineAuthComponent();
			}
        }

        render() {
            return this.state.component;
        }
	}
	
	return connect(mapStateToProps, mapDispatchToProps)(AuthWrapped);
}

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Route path='/(borrower|investor)' component={Menu} />
					<Switch>
						<Route exact path='/borrower' component={withAuth(MainPage)} />
						<Route exact path='/investor' component={withAuth(MainPage)} />
						<Route exact path='/borrower/loan/:id' component={withAuth(LoanPage)} />
						<Route exact path='/borrower/application/:id' component={withAuth(ApplicationPage)} />
						<Route exact path='/login' component={SigninPage} />
						<Route exact path='/login/recovery' component={RecoveryPage} />
						<Route exact path='/signup' component={SignupPage} />
						<Redirect from='/' to='/borrower' />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;