import React from 'react'
// import axios from 'axios'
// import Cookie from 'js-cookie'

export default function Comment(props) {
	return (
		<div className="comment">
			<div className="author-info">
				<label className="author">{props.comment?.login}</label>
				<label className="direction">null</label>
				<label className="date">{props.comment?.created_at + ""}</label>
			</div>
			<label className="content">{props.comment?.content}</label>
			<div className="likes">
				<button>+</button>
				<label>{props.comment?.likes}</label>
				<button>-</button>
				<button>delete</button>
				<button>edit</button>
			</div>
		</div>
	)
}
