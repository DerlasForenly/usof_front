import React, { createRef, useEffect, useState } from 'react'
import CommentLikesController from './CommentLikesController'
import axios from 'axios'
import Cookie from 'js-cookie'
import editImg from "../../images/edit.png"
import deleteImg from "../../images/delete.png"
import acceptImg from "../../images/accept.png"

import avatarImg from "../../images/defaultAvatar.jpg"
import TextareaAutosize from 'react-textarea-autosize'

import RatingController from "../post/RatingController"


export default function Comment(props) {
	const editContentRef = createRef()

	const [state, setState] = useState({
		content: props.comment.content,
		isLoading: true,
		isEditing: false,
		avatarIsLoading: true,
		avatarFile: false
	})

	useEffect(() => {
		axios({
			method: 'get',
			url: 'http://127.0.0.1:8000/api/users/' + props.comment.user_id + '/avatar',
			responseType: 'blob', // important
		})
		.then((response) => {
			//console.log(response.data)

			if (response.data.type === "application/json") {
				setState(previousState => ({
					...previousState,
					isLoadingAvatar: false,
				}))
			}
			else {
				setState(previousState => ({
					...previousState,
					isLoadingAvatar: false,
					avatarFile: response.data,
				}))
			}

		})
		.catch((error) => {
			console.log(error)
		})
	}, [props.comment.user_id])



	const onSend = e => {
		if (state.isEditing) {
			setState(previousState => ({
				...previousState,
				isEditing: false,
			}))
		}
		else {
			setState(previousState => ({
				...previousState,
				isEditing: true,
			}))
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
			setState(previousState => ({
				...previousState,
				content: response.data.content
			}))
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
			setState(previousState => ({
				...previousState,
				isEditing: false
			}))
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
				setState(previousState => ({
					...previousState,
					content: response.data.content, 
					isEditing: true
				}))
			})
			.catch((error) => {
				console.log(error)
			})
		}
	}

	return (
		<div className="comment">
			<img className="avatar" src={
				state.avatarFile ? 
				URL.createObjectURL(state.avatarFile) : avatarImg
				} alt="avatar"></img>
			<div className="other">
				<div className="author-info">
					<label className="author">{props.comment.login}</label>
					{/* <label className="direction">null</label> */}
					<label className="date">{props.comment.created_at + ""}</label>
					{
						Cookie.get('token') ?
						<div className="edit-delete-div">
						{/* {
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
						} */}
						<img 
							src={deleteImg} 
							className="delete" 
							alt="delete"
							onClick={onDelete}
						></img>
						</div>
						: <div></div>
					}
				</div>
				{
					state.isEditing ? 
						<TextareaAutosize
							className="edit-area" 
							defaultValue={state.content}
							ref={editContentRef}></TextareaAutosize> :
							<div className="content-rating">
								<div className="content">{state.content}</div>
								<RatingController type="comment" id={props.comment.id}></RatingController>
							</div>
						
				}
			</div>
		</div>
	)
}