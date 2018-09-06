import React, { Component } from 'react';
import './styles/fonts/ubuntu.css';
import './App.css';
import Auth from './api/auth';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import SigninPage from './components/SigninPage/SigninPage.js';
import SignupPage from './components/SignupPage/SignupPage.js';
import RecoveryPage from './components/RecoveryPage/RecoveryPage.js';
import MainPage from './containers/Main';
import LoanPage from './containers/Loan';
import PayPage from './containers/Pay';
import ApplicationPage from './containers/Application';
import NewLoanPage from './components/NewLoanPage/NewLoanPage';
import CreatePasswordPage from './components/CreatePasswordPage/CreatePasswordPage';
import store from './store';
import { fetchUser } from './actions/index';
import { isEmpty } from 'ramda';

function withAuth(AuthComponent) {
    return class AuthWrapped extends Component {

		state = {
			component: null
		}

		fetchUserAndDefineAuthComponent = () => {
			if (isEmpty(store.getState().user.data) && !store.getState().user.fetching) {
				store.dispatch(fetchUser());
			}
			this.setState({ component: <AuthComponent {...this.props} /> });
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
}

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Switch>
						<Route exact path='/loans' component={withAuth(MainPage)} />
						<Route exact path='/investments' component={withAuth(MainPage)} />
						<Route exact path='/login' component={SigninPage} />
						<Route exact path='/login/recovery' component={RecoveryPage} />
						<Route exact path='/signup' component={SignupPage} />
						<Route exact path='/loan/:id' component={withAuth(LoanPage)} />
						<Route exact path='/loan/:id/pay' component={withAuth(PayPage)} />
						<Route exact path='/application/:id' component={withAuth(ApplicationPage)} />
						<Route exact path='/password' component={withAuth(CreatePasswordPage)} />
						{/* <Route exact path='/new_loan' component={NewLoanPage} /> */}
						<Redirect from='/' to='/loans' />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;