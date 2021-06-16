import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookie from 'js-cookie';
import Comment from "./Comment"

export default function CommentsField(props) {
	const [ comments, setComments ] = useState([])
	const [ isLoading, setIsLoading ] = useState(true)

	useEffect(() => {
		axios({
			method: 'get',
			url: "http://127.0.0.1:8000/api/posts/" + props.post + "/comments",
			headers: {
				Authorization: `Bearer` + Cookie.get('token')
			}
		})
		.then((response) => {
			setComments(response.data)
			setIsLoading(false)
		})
		.catch(function (error) {
			console.log(error)
		})
	}, [ props.post, props.reload ])

	return (
		<div className="comments-field">
			{
				isLoading ? <p>loading</p> : (
					comments.map((e, index) => {
						return <Comment comment={e} key={e.id}></Comment>
					})
				)
			}
		</div>
	)
}
