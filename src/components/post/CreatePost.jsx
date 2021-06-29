import { React, useEffect, useRef, useState } from 'react'

import Cookie from 'js-cookie';
import axios from 'axios'
import TextareaAutosize from 'react-textarea-autosize';
import attachImg from '../../images/attach.png'
import Select from 'react-select';
import LengthController from './LengthController'


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
		titleLength: 0,
		currentCategories: [],
	})

	const titleOnChange = e => {
		setState(previousState => ({
			...previousState,
			titleLength: e.target.value.length
		}))
	}

	useEffect(() => {
		axios({
			method: 'get',
			url: 'http://127.0.0.1:8000/api/categories',
		})
		.then((response) => {

			let arr = []
      response.data.forEach(element => {
        arr.push({value: element.id, label: element.title})
      });

			setState(previousState => ({
				...previousState,
				categories: arr,
				isLoading: false,
			}))

		})
		.catch((error) => {
			console.log(error)
		})
	}, [props])

	const onSubmitHandler = e => {
		if (textAreaContentRef.current.value === "") {
			setState({
				isInvalidData: true,
				errorMessage: "Content cannot be empty"
			})
			return	
		}

		if (textAreaTitleRef.current.value === "") {
			setState({
				isInvalidData: true,
				errorMessage: "Title cannot be empty"
			})
			return
		}

		if (state.currentCategories.length === 0) {
			setState(previousState => ({
				...previousState,
				currentCategories: [1]
			}))
		}

		axios({
			method: 'post',
			url: 'http://127.0.0.1:8000/api/posts',
			data: {
				title: textAreaTitleRef.current.value,
				content: textAreaContentRef.current.value,
				categories: state.currentCategories,
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
			props.mainPageSetState(previousState => ({
				...previousState,
				reload: !props.mainPageState.reload,
				currentPost: false,
			}))	
		})
		.catch((error) => {
			console.log(error)
			setState(previousState => ({
				...previousState,
				isInvalidData: true,
				errorMessage: "Unautorized"
			}))
		})
	}

	const handleSelect = (newValue, actionMeta) => {
		if (actionMeta.action === 'select-option' || actionMeta.action === 'pop-value') {
			let arr = []
			newValue.forEach(elem => {
					arr.push(elem.value)
			})
			setState(previousState => ({
				...previousState,
				currentCategories: arr,
			}))
		}
		console.groupEnd();
	}

	return (
		state.isLoading ? <div></div> :
		<div className="create-post-div">
			<div className="title-row">
				<TextareaAutosize ref={textAreaTitleRef} placeholder="Title" name="title" onChange={titleOnChange}/>
				<LengthController current={state.titleLength} maxLength={80}></LengthController>
			</div>
			<div className="categories-row">
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


