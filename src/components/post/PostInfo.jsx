import React from 'react'
//import Categories from './Categories'

import avatarImg from '../../images/defaultAvatar.jpg'

export default function PostInfo(props) {
	return (
		<div className="post-info">
			<div className="avatar-login-div">
				{/* <img src={avatarImg} alt="avatar"></img> */}
				<label>{props.post.login}</label>
			</div>
			<label>{props.post.created_at + ""}</label>
			<label>{props.post.status}</label>
		</div>
	)
}
