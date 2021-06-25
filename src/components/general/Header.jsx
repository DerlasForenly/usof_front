import { Link } from "react-router-dom"
import logoImg from "../../images/a.png"
import searchImg from "../../images/search.png"
import Cookie from 'js-cookie'
//import { useEffect, useState } from "react"

export default function Header(props) {
	return (
		<div className="navigation-header">
			<div className="logo-div">
				<img src={logoImg} className="logo" alt="logo"></img>
				<label>ANS</label>
			</div>
			<div className="search">
				<input type="text"></input>
				<img src={searchImg} alt="search" onClick={e => alert(`It's a prank))))0))`)}></img>
			</div>
			<div className="link-div">
				<label id="home"><Link to="/">Home</Link></label>
				{
					Cookie.get('token') ? 
					<label id="profile"><Link to="/profile">Profile</Link></label> :
					<div className="login-register">
						<label id="login"><Link to="/login">Login</Link></label>
						<label id="register"><Link to="/register">Register</Link></label>
					</div>
				}
			</div>
			
		</div>
	)
}
