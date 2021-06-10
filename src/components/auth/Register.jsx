import registerImg from "../../images/auth.svg"

export default function Register(props) {
  return (
  	<div className="base-container">
      <div className="header">Register</div>
      <div className="content">
        <div className="image">
          <img src={registerImg} alt=""></img>
        </div>
      	<div className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="username"></input>
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" placeholder="e-mail"></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" name="password" placeholder="password"></input>
          </div>
        </div>
    	</div>
      <div className="footer">
          	<button className="btn" type="submit">Register</button>
      </div>
    </div>
  );
}
