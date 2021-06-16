import React from 'react'
//import Category from "./Category"
import Categories from "./Categories"

export default function PostPreview(props) {
		return (
			<div className="post-in-list">
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
