import { React, useEffect, useRef, useState } from 'react'

import Cookie from 'js-cookie';
import axios from 'axios'
import TextareaAutosize from 'react-textarea-autosize';
import attachImg from '../../images/attach.png'
import Select from 'react-select';


export default function CreatePost(props) {
	const textAreaTitleRef = useRef()
	const textAreaContentRef = useRef()

	const [state, setState] = useState({
		title: "",
		content: "",
		isLoading: true,
		categories: [],
		isInvalidData: false,
		errorMessage: "",
	})

	useEffect(() => {
		axios({
			method: 'get',
			url: 'http://127.0.0.1:8000/api/categories',
		})
		.then((response) => {

			let arr = Array()
          response.data.forEach(element => {
          arr.push({value: element.id, label: element.title})
      });

			setState({
				categories: arr,
				isLoading: false,
			})

		})
		.catch((error) => {
			console.log(error)
		})
	}, [props])

	let data = {
		currentCategories: []
	}

	const onSubmitHandler = e => {
		if (textAreaContentRef.current.value === "" ||
		textAreaTitleRef.current.value === "") {
			setState({
				isInvalidData: true,
				errorMessage: "Invalid data"
			})
			return
		}

		if (data.currentCategories.length == 0) {
			data.currentCategories = [1]
		}

		axios({
			method: 'post',
			url: 'http://127.0.0.1:8000/api/posts',
			data: {
				title: textAreaTitleRef.current.value,
				content: textAreaContentRef.current.value,
				categories: data.currentCategories,
			},
			headers: {
				Authorization: `Bearer` + Cookie.get('token')
			}
		})
		.then((response) => {
			console.log(response.data)
			setState({
				isInvalidData: false,
				errorMessage: ""
			})			
		})
		.catch((error) => {
			console.log(error)
			setState({
				isInvalidData: true,
				errorMessage: "Unautorized"
			})
		})
	}

	const handleSelect = (newValue, actionMeta) => {
		if (actionMeta.action === 'select-option' || actionMeta.action === 'pop-value') {
			let arr = Array()
			newValue.forEach(elem => {
					arr.push(elem.value)
			})
      data.currentCategories = arr
		}
		console.groupEnd();
	}

	return (
		state.isLoading ? <div></div> :
		<div className="create-post-div">
			<div className="title-row">
				<TextareaAutosize ref={textAreaTitleRef} placeholder="Title" name="title"/>
			</div>
			<div className="categories-row">
				{/* <TagInput></TagInput> */}
				<Select
					isMulti
					name="categories"
					className="select"
					options={state.categories}
					classNamePrefix="select"
					placeholder="Categories"
					onChange={handleSelect}
				/>
			</div>
			<div className="content-row">
				<TextareaAutosize ref={textAreaContentRef} placeholder="Content:" name="content"/>
				<div className="buttons">
					<img src={attachImg} className="attach" alt="attach"></img>
				</div>
			</div>
			<button onClick={onSubmitHandler}>Create</button>
			{
				state.isInvalidData ? <label className="error">{state.errorMessage}</label> : <div></div>
			}
		</div>
	)
	
}
