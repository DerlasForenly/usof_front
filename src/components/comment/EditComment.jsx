import React, {useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import editImg from "../../images/edit.png"



export default function EditComment(props) {
	const [editing, setEditing] = useState(false)

	const submitHandler = e => {
		e.preventDefault()

		axios({
			method: 'patch',
			url: "http://127.0.0.1:8000/api/comments/" + props.id,
			data: {
				content: "new content"
			},
			headers: {
				Authorization: `Bearer` + Cookies.get('token')
			}
		})
		.then((response) => {
			setEditing(false)
			window.location.reload()
		})
		.catch(function (error) {
			console.log(error)
		})
	}

	function editingHandle(e) {
		setEditing(true)
	}

	function unEditingHandle(e) {
		setEditing(false)
	}

	return (
		editing ? 
		<form>
			<textarea></textarea>
			<button onClick={submitHandler}>send</button>
			<button onClick={unEditingHandle}>cancel</button>
		</form>
		:
		<form>
			<img 
				src={editImg} 
				className="edit" 
				alt="edit" 
				onClick={editingHandle}
			></img>
		</form>
	)
}
