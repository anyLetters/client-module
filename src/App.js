import React, { Component } from 'react';
import './styles/fonts/ubuntu.css';
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import SigninPage from './components/SigninPage/SigninPage.js';
import SignupPage from './components/SignupPage/SignupPage.js';
import RecoveryPage from './components/RecoveryPage/RecoveryPage.js';
import ApplicationsPage from './components/ApplicationsPage/ApplicationsPage';
import ApplicationPage from './components/ApplicationPage/ApplicationPage';
import PayPage from './components/PayPage/PayPage';
import NewApplicationPage from './components/NewApplicationPage/NewApplicationPage';
import CreatePasswordPage from './components/CreatePasswordPage/CreatePasswordPage';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Switch>
						<Route exact path='/login' component={SigninPage} />
						<Route exact path='/login/recovery' component={RecoveryPage} />
						<Route exact path='/signup' component={SignupPage} />
						<Route exact path='/applications' component={ApplicationsPage} />
						<Route exact path='/application/:id' component={ApplicationPage} />
						<Route exact path='/application/:id/pay' component={PayPage} />
						<Route exact path='/password' component={CreatePasswordPage} />
						{/* <Route exact path='/new_application' component={NewApplicationPage} /> */}
						<Redirect from='/' to='/login' />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;