import { React, useState, useEffect } from 'react'
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


/*

Set max length of post title as 80, and content 500.
Get 7 post for 1 list
Get 10 popular categories
Style start page
-> LengthController in post creating content
Length for login 25
Confirmation for deleting post
-> Edit comment repair (avatar dissappear and text formatting is bad)
get info from token on front
-> profile edit
password reminder
edit comment only for admins
creating likes set defaults 0 
reply in comments
logout

*/
