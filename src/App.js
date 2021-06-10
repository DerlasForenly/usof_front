import React from 'react'
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import MainPage from "./components/mainPage/MainPage"
import Header from './components/general/Header';

import "./style.scss"

import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

export default function App() {
	return (
	  <Router>
		<div>
			<Header/>
		  <Switch>
				<Route path="/register">
					<Register></Register>
				</Route>
				<Route path="/login">
					<Login></Login>
				</Route>
				<Route path="/">
					<MainPage></MainPage>
				</Route>
		  </Switch>

		</div>
	  </Router>
	)
}
