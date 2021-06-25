import { React, useRef } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
import { useHistory } from 'react-router'

export default function Login(props) {
  const emailRef = useRef()
  const passwordRef = useRef() 

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
  
    axios({
      method: 'post',
      url: "http://127.0.0.1:8000/api/auth/login",
      data: {
        email: emailRef.current.value,
        password: passwordRef.current.value
      }
    })
    .then((response) => {
      console.log(response.data)
      Cookie.set('token', response.data.access_token, {
        expires: 7
      })
      props.appSetState(previousState => ({
        ...previousState,
        reload: true,
      }))
      history.push('/')
    })
    .catch(function (error) {
      console.log(error)
    })
  }


  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        ref={emailRef}
        type="email" 
        placeholder="e-mail"
        defaultValue="tany.tany283@gmail.com"
      ></input>
      <input 
        ref={passwordRef}
        type="password" 
        placeholder="password"
        defaultValue="minecraft" 
      ></input>
      <button type="submit">Login</button>
    </form>
  )
}
