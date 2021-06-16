import axios from 'axios'

export default function Register(props) {
  let data = {
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    login: ""
  }

  const onChangeEmail = e => {
    data.email = e.target.value
  }

  // const onChangeConfirmPassword = e => {
  //   data.confirmPassword = e.target.value
  // }

  const onChangeLogin = e => {
    data.login = e.target.value
  }

  const onChangeName = e => {
    data.name = e.target.value
  }

  const onChangePassword = e => {    
    data.password = e.target.value
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(data)

    axios({
      method: 'post',
      url: "http://127.0.0.1:8000/api/auth/registration",
      data: {
        email: data.email,
        password: data.password,
        login: data.login,
        name: data.name
      }
    })
    .then(function (response) {
        console.log(response.data)
    })
    .catch(function (error) {
        console.log(error)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input 
        type="text" 
        placeholder="login" 
        onChange={onChangeLogin}
      ></input>
      <input 
        type="name" 
        placeholder="name" 
        onChange={onChangeName}
      ></input>
      <input 
        type="email" 
        placeholder="e-mail" 
        onChange={onChangeEmail} 
      ></input>
      <input 
        type="password" 
        placeholder="password" 
        onChange={onChangePassword}
      ></input>
      {/* <input 
        type="password" 
        placeholder="confirm password" 
        onChange={onChangeConfirmPassword}
      ></input> */}
      <button type="submit">Register</button>
    </form>
  )
}
