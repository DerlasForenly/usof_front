import React from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
// import {
//   BrowserRouter as Router,
//   Link,
// } from "react-router-dom"

export default function CreateComment(props) {
  let data = {
    content: ""
  }

  const onChangeContent = e => {
    data.content = e.target.value
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  
    axios({
      method: 'post',
      url: "http://127.0.0.1:8000/api/posts/" + props.post + "/comments",
      data,
      headers: {
				authorization: `Bearer ` + Cookie.get('token')
			}
    })
    .then((response) => {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })

    window.location.reload()
  }

  return (
    <form onSubmit={handleSubmit} className="create-comment-field">
      <textarea onChange={onChangeContent}></textarea>
      <button type="submit"></button>
    </form>
  )

}
