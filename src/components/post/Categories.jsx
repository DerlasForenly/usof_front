import React from 'react'
import axios from 'axios';
import Category from "./Category"

export default class Categories extends React.Component {
	constructor(props) {
    super(props)
		this.state = {
			categories: [],
			isLoading: true
		}
  }

	componentDidMount() {
    axios({
			method: 'get',
			url: "http://127.0.0.1:8000/api/posts/" + this.props.post.id + "/categories",
		})
		.then((response) => {
			//console.log(response.data)
			this.setState({categories: response.data, isLoading: false})
		})
		.catch((error) => {
			console.log(error)
		})
  }

	render() {
		return (
			this.state.isLoading ? 
			<label>loading..</label>
			:
			<div className="categories">
				{
					this.state.categories.map((category, index) =>
						{
							return <Category category={category} key={index}></Category>
						})
				}
			</div>
		)
	}
}
