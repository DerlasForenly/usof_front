import React, { useEffect, useState } from 'react'
import Categories from "./Categories"
import axios from "axios"

export default function PostPreview(props) {
	const [state, setState] = useState({
		post: false,
	})

	const postPreviewHandler = e => {
		if (props.mainPageState.currentPost.id === props.post.id) {
			return
		}

		props.setState(previousState => ({
			...previousState,
			currentPost: props.post,
			isCreating: false
		}))
	}

	useEffect(() => {
		axios({
			method: 'get',
			url: "http://127.0.0.1:8000/api/posts/" + props.post.id,
		})
		.then((response) => {

			setState(previousState => ({
				...previousState,
				post: response.data, 
			}))

		})
		.catch((error) => {
			console.log(error)
		})
	}, [props.post.id])

	return (
		<div className="post-in-list" onClick={postPreviewHandler}>
			<label className="post-name">
				{state.post.title}
			</label>
			<div className="post-info">
				<label className="author">{state.post.login}</label>
				<label className="date">{state.post.created_at}</label>
				<label className="rating">{state.post.likes}</label>
			</div>
			<Categories post={state.post}></Categories>
		</div>
	)
}
