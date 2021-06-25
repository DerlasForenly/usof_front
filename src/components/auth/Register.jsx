import axios from 'axios'
import { createRef } from 'react'

export default function Register(props) {
  const passwordRef = createRef()
  const loginRef = createRef()
  //const confirmPasswordRef = createRef()
  const nameRef = createRef()
  const emailRef = createRef()

  const handleSubmit = (e) => {
    e.preventDefault()

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
        ref={loginRef}
      ></input>
      <input
        type="name" 
        placeholder="name" 
        ref={nameRef}
      ></input>
      <input 
        type="email" 
        placeholder="e-mail"
        ref={emailRef}
      ></input>
      <input 
        type="password" 
        placeholder="password"
        ref={passwordRef}
      ></input>
      {/* <input 
        type="password" 
        placeholder="confirm password" 
        ref={confirmPasswordRef}
      ></input> */}
      <button type="submit">Register</button>
    </form>
  )
}
