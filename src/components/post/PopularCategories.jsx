import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Category from './Category';

export default function PopularCategories(props) {
	const [state, setState] = useState({
		categories: [],
		isLoading: true
	})

	useEffect(() => {

		axios({
			method: 'get',
			url: "http://127.0.0.1:8000/api/categories",
		})
		.then((response) => {
			console.log(response.data)

			setState(previousState => ({
				...previousState,
				categories: response.data,
				isLoading: false,
			}))

		})
		.catch((error) => {
			console.log(error)
		})

	}, [])


	return (
		<div className="popular-categories">
			<label>Popular categories:</label>
			<div className="categories">
				{
					state.isLoading ? <div>Loading</div> :
					state.categories.map((category, index) => {
						return <Category category={category} key={index}></Category>
					})
				}
			</div>
		</div>
	)
}