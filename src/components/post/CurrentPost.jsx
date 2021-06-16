import CommentsField from "../comment/CommentsField"
import Categories from "./Categories"
import PostInfo from "./PostInfo"
import PostController from "./PostController"
import { React, useState } from 'react'
import Cookie from 'js-cookie';
import axios from 'axios'

export default function CurrentPost(props) {
	let [state, setState] = useState({
		reload: false
	})

	let data = {
		content: ''
	}

	const onTextarea = e => {
		data.content = e.target.value
		console.log(data.content)
	}

	const onSubmit = e => {
		e.preventDefault()
  
    axios({
      method: 'post',
      url: "http://127.0.0.1:8000/api/posts/" + props.post.id + "/comments",
      data,
      headers: {
				authorization: `Bearer ` + Cookie.get('token')
			}
    })
    .then((response) => {
      console.log(response)
			setState({reload: !state.reload})
    })
    .catch(function (error) {
      console.log(error)
    })
	}


	return (
		<div className="post">
				<div className="post-name-edit">
					<label className="post-name">{props.post.title}</label>
					{
						Cookie.get('token') ? <PostController></PostController> :
						<div></div>
					}
				</div>
				<PostInfo post={props.post}></PostInfo>
				<Categories post={props.post}></Categories>
			<div className="post-content">
				<p>{props.post.content}</p>
			</div>
			<div className="likes">
					<button>+</button>
					<label>{props.post.likes}</label>
					<button>-</button>
			</div>
			<CommentsField post={props.post.id} reload={state.reload}></CommentsField>
			<form onSubmit={onSubmit} className="create-comment-field">
				<textarea onChange={onTextarea} defaultValue=""></textarea>
				<button type="submit"></button>
			</form>
		</div>
	)
	
}
