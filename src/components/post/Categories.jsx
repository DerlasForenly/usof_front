import React from 'react'
import axios from 'axios';
import Category from "./Category"
import { useState, useEffect } from 'react'

export default function Categories(props) {
	const [state, setState] = useState({
		categories: [],
		isLoading: true
	})

	useEffect(() => {
		axios({
			method: 'get',
			url: "http://127.0.0.1:8000/api/posts/" + props.post.id + "/categories",
		})
		.then((response) => {
			setState({categories: response.data, isLoading: false})
		})
		.catch((error) => {
			console.log(error)
		})
	}, [ props.post, props.reload ])

	return (
		state.isLoading ? 
		<label>loading..</label> :
		<div className="categories">
			{
				state.categories.map((category, index) =>
					{
						return <Category category={category} key={index}></Category>
					})
			}
		</div>
	)
}
