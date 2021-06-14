import React from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
// import {
//   BrowserRouter as Router,
//   Link,
// } from "react-router-dom"


// import loginImg from "../../images/auth.svg"

export default function Login(props) {
  let autorized = false

  let data = {
    email: "",
    password: ""
  }

  const onChangeEmail = e => {
    data.email = e.target.value
  }

  const onChangePassword = e => {
    data.password = e.target.value
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  
    axios({
      method: 'post',
      url: "http://127.0.0.1:8000/api/auth/login",
      data: {
        email: data.email,
        password: data.password
      }
    })
    .then((response) => {
        console.log(response.data)
        Cookie.set('token', response.data.access_token)
        autorized = true
        console.log(autorized)
    })
    .catch(function (error) {
        console.log(error)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
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
      <button type="submit">Login</button>
    </form>
  )
}
