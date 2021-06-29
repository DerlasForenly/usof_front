import axios from 'axios'
import { createRef, useState } from 'react'
import { useHistory } from 'react-router'
import Cookie from "js-cookie"

export default function Register(props) {
  const history = useHistory()

  const [state, setState] = useState({
    errorMessage: false,
  })

  const passwordRef = createRef()
  const loginRef = createRef()
  const confirmPasswordRef = createRef()
  const nameRef = createRef()
  const emailRef = createRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (confirmPasswordRef.current.value != passwordRef.current.value) {
      setState(previousState => ({
        ...previousState,
        errorMessage: "Password mismatch",
      }))
      return
    }

    axios({
      method: 'post',
      url: "http://127.0.0.1:8000/api/auth/registration",
      data: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        login: loginRef.current.value,
        name: nameRef.current.value
      }
    })
    .then(function (response) {
      //console.log(response.data)

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
            ...previousState,
            errorMessage: "E-mail or password is incorrect"
          }))
        }
        else if (error.message === "Request failed with status code 404") {
          setState(previousState => ({
            ...previousState,
            errorMessage: "User not found"
          }))
        }
      })
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
        ref={loginRef}
        pattern="[A-Za-z_]{3,25}"
        required
      ></input>
      <input
        type="name" 
        placeholder="name" 
        ref={nameRef}
        pattern="[A-Za-z ]{3,100}"
        required
      ></input>
      <input 
        type="email" 
        placeholder="e-mail"
        ref={emailRef}
        required
      ></input>
      <input 
        type="password" 
        placeholder="password"
        ref={passwordRef}
        required
      ></input>
      <input 
        type="password"
        placeholder="confirm password" 
        ref={confirmPasswordRef}
        required
      ></input>
      {
        state.errorMessage ? <label>{state.errorMessage}</label> : <div></div>
      }
      <button type="submit">Register</button>
    </form>
  )
}
