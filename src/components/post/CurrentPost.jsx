import CommentsField from "../comment/CommentsField"
import Categories from "./Categories"
import PostInfo from "./PostInfo"
//import PostController from "./PostController"
import { createRef, React, useState } from 'react'
import Cookie from 'js-cookie';
import axios from 'axios'

import testContentImg from '../../images/defaultAvatar.jpg'

import editImg from "../../images/edit.png"
import deleteImg from "../../images/delete.png"

export default function CurrentPost(props) {
	const commentRef = createRef()

	const [state, setState] = useState({
		reload: false,
		isEditing: false,
		isDeleted: false,
	})

	const editHandler = e => {

	}

	const deleteHandler = e => {
		axios({
			method: 'delete',
			url: "http://127.0.0.1:8000/api/posts/" + props.post.id,
			headers: {
				authorization: `Bearer ` + Cookie.get('token'),
			}
		})
		.then((response) => {
			console.log(response)
			setState({reload: !state.reload, isDeleted: true})
			props.mainPageSetState(previousState => ({
				...previousState,
				reload: true
			}))
		})
		.catch(function (error) {
			console.log(error)
		})
	}

	const onSubmit = e => {
		e.preventDefault()
  
		axios({
			method: 'post',
			url: "http://127.0.0.1:8000/api/posts/" + props.post.id + "/comments",
			data: {
				content: commentRef.current.value
			},
			headers: {
				authorization: `Bearer ` + Cookie.get('token')
			}
		})
		.then((response) => {
		console.log(response)
			setState({reload: !state.reload})
			commentRef.current.value = ""
		})
		.catch(function (error) {
		console.log(error)
		})
	}

	return (
		<div className="post">
			<div className="post-header">
				<div className="post-name-edit">
					<label className="post-name">{props.post.title}</label>
					{
						Cookie.get('token') ? 
						<div className="post-controller">
							<img 
								src={editImg} 
								className="edit" 
								alt="edit" 
								onClick={editHandler}
							></img>
							<img 
								src={deleteImg} 
								className="delete" 
								alt="delete"
								onClick={deleteHandler}
							></img>
						</div> :
						<div></div>
					}
				</div>
				<PostInfo post={props.post}></PostInfo>
				<Categories post={props.post}></Categories>
			</div>
			

			{/* <div className="images-div">
				<button>Hide images</button>
				<img src={testContentImg} alt="test-content"></img>
			</div> */}

			<div className="post-content">
				<p>{props.post.content}</p>
			</div>
			<div className="likes">
					<button>+</button>
					<label>{props.post.likes}</label>
					<button>-</button>
			</div>
			{
				state.isDeleted ? <div></div> : <CommentsField post={props.post.id} reload={state.reload}></CommentsField>
			}
			{
				Cookie.get('token') ?
				<form onSubmit={onSubmit} className="create-comment-field">
					<textarea ref={commentRef} defaultValue=""></textarea>
					<button type="submit"></button>
				</form> :
				<form></form>
			}
		</div>
	)
	
}
