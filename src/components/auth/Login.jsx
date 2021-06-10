import loginImg from "../../images/auth.svg"

export default function Login(props) {
  return (
    <div className="base-container">
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img src={loginImg}></img>
        </div>
      <div className="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="username"></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="text" name="password" placeholder="password"></input>
        </div>
      </div>
      </div>
        <div className="footer">
        <button className="btn" type="submit">Login</button>
      </div>
    </div>
  );
}
