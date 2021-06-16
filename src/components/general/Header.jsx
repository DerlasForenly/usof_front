import { Link } from "react-router-dom"
import logoImg from "../../images/a.png"
import searchImg from "../../images/search.png"
import Cookie from 'js-cookie'

export default function Header() {
	return (
		<div className="navigation-header">
			<div className="logo-div">
				<img src={logoImg} className="logo" alt="logo"></img>
				<label>ANS</label>
			</div>
			<div className="search">
				<input type="text"></input>
				<img src={searchImg} alt="search"></img>
			</div>
			<label id="home"><Link to="/">Home</Link></label>
			{
				Cookie.get('token') ? 
				<label id="profile"><Link to="/profile">Profile</Link></label> :
				<label id="login"><Link to="/login">Login</Link></label>
			}
			<label id="register"><Link to="/register">Register</Link></label>
			{/* <div id="create-post">
				<label>lol</label>
			</div> */}
		</div>
	)
}
