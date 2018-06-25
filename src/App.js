import React, { Component } from 'react';
import './styles/fonts/ubuntu.css';
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import SigninPage from './components/SigninPage/SigninPage.js';
import SignupPage from './components/SignupPage/SignupPage.js';
import RecoveryPage from './components/RecoveryPage/RecoveryPage.js';
import ApplicationsPage from './components/ApplicationsPage/ApplicationsPage';
import PayPage from './components/PayPage/PayPage';

class App extends Component {

	// componentWillMount() {
	// 	let path = window.location.pathname.split( '/' )[1];
	// 	console.log(path);
	// 	if (path === 'login' || path === 'signup') {
	// 		this.backColor = '#343434';
	// 	} else {
	// 		this.backColor = 'white';
	// 	}
	// }

	render() {
		return (
			<Router>
				<div className="App">
					<Switch>
						<Route exact path='/login' component={SigninPage} />
						<Route exact path='/login/recovery' component={RecoveryPage} />
						<Route exact path='/signup' component={SignupPage} />
						<Route exact path='/applications' component={ApplicationsPage} />
						<Route exact path='/application/:id/pay' component={PayPage} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;