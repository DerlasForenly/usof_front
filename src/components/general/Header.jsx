import { Link } from "react-router-dom"
import logoImg from "../../images/a.png"

export default function Header(props) {
    return (
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
    )
}
