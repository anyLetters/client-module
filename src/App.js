import React, { Component } from 'react';
import './styles/fonts/ubuntu.css';
import './App.css';
import Auth from './api/auth';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import SigninPage from './components/SigninPage/SigninPage.js';
import SignupPage from './components/SignupPage/SignupPage.js';
import RecoveryPage from './components/RecoveryPage/RecoveryPage.js';
import LoansPage from './components/LoansPage/LoansPage';
import LoanPage from './components/LoanPage/LoanPage';
import PayPage from './components/PayPage/PayPage';
import NewLoanPage from './components/NewLoanPage/NewLoanPage';
import CreatePasswordPage from './components/CreatePasswordPage/CreatePasswordPage';

function withAuth(AuthComponent) {
    return class AuthWrapped extends Component {

        componentWillMount() {
            // if (!Auth.loggedIn() || Auth.isExpired()) {
			// 	Auth.logout();
            //     this._component = <Redirect to='/login' />;
            // } else {
				this._component = <AuthComponent {...this.props} />;
			// }
			console.log('Logged in: ' + Auth.loggedIn());
        }

        render() {
            return this._component;
        }
    }
}

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Switch>
						<Route exact path='/login' component={SigninPage} />
						<Route exact path='/login/recovery' component={RecoveryPage} />
						<Route exact path='/signup' component={SignupPage} />
						<Route exact path='/loans' component={withAuth(LoansPage)} />
						<Route exact path='/loan/:id' component={withAuth(LoanPage)} />
						<Route exact path='/loan/:id/pay' component={withAuth(PayPage)} />
						<Route exact path='/password' component={withAuth(CreatePasswordPage)} />
						{/* <Route exact path='/new_application' component={NewLoan} /> */}
						<Redirect from='/' to='/login' />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;