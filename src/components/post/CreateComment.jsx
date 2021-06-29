import { createRef, useEffect, useState } from "react"
import Cookie from "js-cookie"
import TextareaAutosize from 'react-textarea-autosize'
import axios from "axios"
import LengthController from "./LengthController"

export default function CreateComment(props) {
	const maxLength = 500
	const contentRef = createRef()

	const [state, setState] = useState({
		currentLength: 0,
	})

	// useEffect(() => {
	// 	contentRef.current.value = ""
	// }, [props.post.id])

	const onSubmit = e => {
		e.preventDefault()

		axios({
			method: 'post',
			url: "http://127.0.0.1:8000/api/posts/" + props.post.id + "/comments",
			data: {
				content: contentRef.current.value
			},
			headers: {
				authorization: `Bearer ` + Cookie.get('token')
			}
		})
		.then((response) => {
			console.log(response)
			props.postSetState(previousState => ({
				...previousState,
				reload: !props.postState.reload
			}))
		})
		.catch((error) => {
			console.log(error)
		})

	}

	const onChangeContent = e => {
		setState(previousState => ({
			...previousState,
			currentLength: contentRef.current.value.length
		}))
	}

	return !Cookie.get('token') ? <div></div> :
	<form onSubmit={onSubmit} className="create-comment-field">
		<div className="testarea-length-controller">
			<TextareaAutosize ref={contentRef} maxLength={maxLength} onChange={onChangeContent}></TextareaAutosize>
			<LengthController current={state.currentLength} maxLength={500}></LengthController>
		</div>
		
		<button type="submit">Send</button>
	</form>
}