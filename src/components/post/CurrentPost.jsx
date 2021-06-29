import CommentsField from "../comment/CommentsField"
import Categories from "./Categories"
import PostInfo from "./PostInfo"
//import PostController from "./PostController"
import { createRef, React, useEffect, useState } from 'react'
import Cookie from 'js-cookie';
import axios from 'axios'

//import testContentImg from '../../images/defaultAvatar.jpg'

import editImg from "../../images/edit.png"
import deleteImg from "../../images/delete.png"
import avatarImg from '../../images/defaultAvatar.jpg'
import CreateComment from "./CreateComment";
import RatingController from "./RatingController";
//import sendImg from "../../images/send.png"

export default function CurrentPost(props) {
	const commentRef = createRef()

	const [state, setState] = useState({
		reload: false,
		isEditing: false,
		isDeleted: false,
		avatarIsLoading: true,
		avatarFile: false,
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
			//console.log(response)

			setState(previousState => ({
				...previousState,
				isDeleted: true
			}))
			
			props.mainPageSetState(previousState => ({
				...previousState,
				reload: !props.mainPageState.reload,
				currentPost: false,
			}))
			
		})
		.catch(function (error) {
			console.log(error)
		})
	}

	useEffect(() => {
		//commentRef.current.value = ""

		axios({
			method: 'get',
			url: 'http://127.0.0.1:8000/api/users/' + props.post.user_id + '/avatar',
			responseType: 'blob', // important
		})
		.then((response) => {
			console.log(response.data)

			if (response.data.type === "application/json") {
				setState(previousState => ({
					...previousState,
					isLoadingAvatar: false,
					avatarFile: false,
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
	}, [props.post.user_id, state.reload])

	return (
		state.isDeleted ? <div></div> :
		<div className="post">
			<div className="post-header">
				<img className="avatar" src={
					state.avatarFile ? 
					URL.createObjectURL(state.avatarFile) : avatarImg
					} alt="avatar"></img>
				<div className="post-info-div-in-header">
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
			</div>
			

			{/* <div className="images-div">
				<button>Hide images</button>
				<img src={testContentImg} alt="test-content"></img>
			</div> */}

			<div className="post-content">
				<p>{props.post.content}</p>
				<RatingController id={props.post.id} type="post"></RatingController>
			</div>
			
			<CommentsField post={props.post.id} reload={state.reload}></CommentsField>
			<CreateComment post={props.post} postSetState={setState} postState={state}></CreateComment>
		</div>
	)
	
}
