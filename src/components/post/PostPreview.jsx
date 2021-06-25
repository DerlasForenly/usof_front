import React from 'react'
//import Category from "./Category"
import Categories from "./Categories"

export default function PostPreview(props) {
	const postPreviewHandler = e => {
		props.setState(previousState => ({
			...previousState,
			currentPost: props.post,
			isCreating: false
		}))
	}

	return (
		<div className="post-in-list" onClick={postPreviewHandler}>
			<label className="post-name">
				{props.post.title}
			</label>
			<div className="post-info">
				<label className="author">{props.post.login}</label>
				<label className="date">14.09.2001</label>
				<label className="rating">{props.post.likes}</label>
			</div>
			<Categories post={props.post}></Categories>
		</div>
	)
}
