import React from 'react'
import Categories from './Categories'

export default function PostInfo(props) {
	return (
		<div className="post-info">
			<label>{props.post.login}</label>
			<label>{props.post.created_at + ""}</label>
			<label>{props.post.status}</label>
		</div>
	)
}
