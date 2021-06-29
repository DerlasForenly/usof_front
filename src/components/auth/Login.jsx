import { React, useRef, useState } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
import { useHistory } from 'react-router'

export default function Login(props) {
  const [state, setState] = useState({
    passwordReminding: false,
    errorMessage: false,
  });

  const emailRef = useRef()
  const passwordRef = useRef() 

  const history = useHistory()

  const onSubmitLogin = (e) => {
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
        reload: !props.appState.reload,
      }))
      history.push('/')
    })
    .catch((error) => {
      console.log(error.message)
      
      if (error.message === "Request failed with status code 401") {
        setState(previousState => ({
          errorMessage: "E-mail or password is incorrect"
        }))
      }
      else if (error.message === "Request failed with status code 404") {
        setState(previousState => ({
          errorMessage: "User not found"
        }))
      }
    })
  }

  const onSubmitPasswordReminder = e => {
    e.preventDefault()

    axios({
      method: 'post',
      url: "http://127.0.0.1:8000/api/auth/password-reset",
      data: {
        email: emailRef.current.value,
      }
    })
    .then((response) => {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  const onClickBack = e => {
    e.preventDefault()

    setState(previousState => ({
      ...previousState,
      passwordReminding: false,
    }))
  }

  const onClickForgotPassword = e => {
    e.preventDefault()

    setState(previousState => ({
      ...previousState,
      passwordReminding: true,
    }))
  }


  return (
    state.passwordReminding ? 
    <form onSubmit={onSubmitPasswordReminder} className="login-form">
      <input
        ref={emailRef}
        type="email" 
        placeholder="e-mail"
        defaultValue="tany.tany283@gmail.com"
        required
      ></input>
      <button type="submit">Send token</button>
      <button onClick={onClickBack}>Back</button>
    </form> :
    <form onSubmit={onSubmitLogin} className="login-form">
      <input
        ref={emailRef}
        type="email" 
        placeholder="e-mail"
        defaultValue="tany.tany283@gmail.com"
        required
      ></input>
      <input 
        ref={passwordRef}
        type="password" 
        placeholder="password"
        defaultValue="minecraft"
        required
      ></input>
      {
        state.errorMessage ? <label>{state.errorMessage}</label> : <div></div>
      }
      <button type="submit">Login</button>
      <button onClick={onClickForgotPassword}>Forgot password</button>
      
    </form>
  )
}
