import { React, useState, useEffect } from 'react'
//import Cookie, { set } from 'js-cookie'

import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import MainPage from "./components/mainPage/MainPage"
import Header from './components/general/Header'
import Profile from './components/profile/Profile'

import "./style.scss"

import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom"

export default function App() {
	const [state, setState] = useState({
		reload: false,
	})

	useEffect(() => {
		setState({
			reload: false
		})
	}, [state.reload])

	return (
		<Router>
		<div>
			<Header appSetState={setState} appState={state}/>
			<Switch>
					<Route path="/profile">
					<Profile appSetState={setState} appState={state}></Profile>
				</Route>
				<Route path="/register">
					<Register appSetState={setState} appState={state}></Register>
				</Route>
				<Route path="/login">
					<Login appSetState={setState} appState={state}></Login>
				</Route>
				<Route path="/">
					<MainPage></MainPage>
				</Route>
			</Switch>

		</div>
		</Router>
	)
}
