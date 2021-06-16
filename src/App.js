import React from 'react'
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

import axios from 'axios'
import Cookie from 'js-cookie'

// axios.interceptors.request.use(
// 	config => {
// 	  const token = Cookie.get('token')
  
// 	  config.headers.authorization = `Bearer ${token}`
  
// 	  return config
// 	},
// 	error => {
// 	  return Promise.reject(error)
// 	}
// )

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
				<Route path="/profile">
					<Profile></Profile>
				</Route>
		  </Switch>

		</div>
	  </Router>
	)
}
