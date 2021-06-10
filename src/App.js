import React from 'react'
import { Login, Register } from "./components/login/index"
import MainPage from "./components/main_page/main_page"

import logoImg from "./images/a.svg"

import "./style.scss"

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

export default function App() {
	return (
	  <Router>
		<div>
			<div className="navigation-header">
				<div className="navigation" className="logo-div">
					<img src={logoImg} className="logo"></img>
					<label>ANS</label>
				</div>
				<div className="search">
					<label>Search</label>
					<input type="text"></input>
				</div>
				<label id="home"><Link to="/">Home</Link></label>
				<label id="login"><Link to="/login">Login</Link></label>
				<label id="register"><Link to="/register">Register</Link></label>
			</div>
  
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
	);
}


