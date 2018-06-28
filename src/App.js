import React, { Component } from 'react';
import './styles/fonts/ubuntu.css';
import './App.css';
import Auth from './api/auth';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import SigninPage from './components/SigninPage/SigninPage.js';
import SignupPage from './components/SignupPage/SignupPage.js';
import RecoveryPage from './components/RecoveryPage/RecoveryPage.js';
import ApplicationsPage from './components/ApplicationsPage/ApplicationsPage';
import ApplicationPage from './components/ApplicationPage/ApplicationPage';
import PayPage from './components/PayPage/PayPage';
import NewApplicationPage from './components/NewApplicationPage/NewApplicationPage';
import CreatePasswordPage from './components/CreatePasswordPage/CreatePasswordPage';

function withAuth(AuthComponent) {
    return class AuthWrapped extends Component {

        componentWillMount() {
            if (!Auth.loggedIn()) {
                this._component = <Redirect to='/login' />;
            } else {
				this._component = <AuthComponent {...this.props} />;
			}
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
						<Route exact path='/applications' component={withAuth(ApplicationsPage)} />
						<Route exact path='/application/:id' component={withAuth(ApplicationPage)} />
						<Route exact path='/application/:id/pay' component={withAuth(PayPage)} />
						<Route exact path='/password' component={withAuth(CreatePasswordPage)} />
						{/* <Route exact path='/new_application' component={NewApplicationPage} /> */}
						<Redirect from='/' to='/login' />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;