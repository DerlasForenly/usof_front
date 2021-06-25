import React, { createRef, useState } from 'react'
import CommentLikesController from './CommentLikesController'
import axios from 'axios'
import Cookie from 'js-cookie'
import editImg from "../../images/edit.png"
import deleteImg from "../../images/delete.png"
import acceptImg from "../../images/accept.png"


export default function Comment(props) {
	const editContentRef = createRef()

	const [state, setState] = useState({
		content: props.comment.content,
		isLoading: true,
		isEditing: false,
	})

	const onSend = e => {
		if (state.isEditing) {
			setState({isEditing: false})
		}
		else {
			setState({isEditing: true})
		}

		axios({
			method: 'patch',
			url: "http://127.0.0.1:8000/api/comments/" + props.comment.id,
			data: {
				content: editContentRef.current.value
			},
			headers: {
				Authorization: `Bearer` + Cookie.get('token')
			}
		})
		.then((response) => {
			console.log(response.data)
			setState({content: response.data.content})
		})
		.catch(function (error) {
			console.log(error)
		})
	}

	const onDelete = e => {
		axios({
			method: 'delete',
			url: "http://127.0.0.1:8000/api/comments/" + props.comment.id,
			headers: {
				Authorization: `Bearer` + Cookie.get('token')
			}
		})
		.then((response) => {
			console.log(response.data)
			props.setComments(comments => comments.filter(comment => comment.id !== props.comment.id))
		})
		.catch((error) => {
			console.log(error)
		})
	}

	const onEdit = e => {
		if (state.isEditing) {
			setState({isEditing: false})
		}
		else {
			axios({
				method: 'patch',
				url: "http://127.0.0.1:8000/api/comments/" + props.comment.id,
				data: {
					content: props.comment.content
				},
				headers: {
					Authorization: `Bearer` + Cookie.get('token')
				}
			})
			.then((response) => {
				console.log(response.data)
				setState({content: response.data.content, isEditing: true})
			})
			.catch((error) => {
				console.log(error)
			})
		}
	}

	return (
		<div className="comment">
			<div className="author-info">
				<label className="author">{props.comment.login}</label>
				{/* <label className="direction">null</label> */}
				<label className="date">{props.comment.created_at + ""}</label>
				{
					//props.me ?
					<div className="edit-delete-div">
					{
						//props.me.id === props.comment.user_id ?
							state.isEditing ?
							<img 
								src={acceptImg} 
								className="edit" 
								alt="edit" 
								onClick={onSend}
							></img> :
								<img 
								src={editImg} 
								className="edit" 
								alt="edit" 
								onClick={onEdit}
							></img> //: <div></div>
					}
					<img 
						src={deleteImg} 
						className="delete" 
						alt="delete"
						onClick={onDelete}
					></img>
					</div>
					//: <div></div>
				}
			</div>
			{
				state.isEditing ? 
					<textarea 
						className="edit-area" 
						defaultValue={state.content}
						ref={editContentRef}></textarea> :
					<label className="content">{state.content}</label>
			}
			<CommentLikesController comment={props.comment}></CommentLikesController>
		</div>
	)
}