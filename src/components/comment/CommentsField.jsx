import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Comment from "./Comment"

export default class CommentsField extends React.Component {
	constructor(props) {
    super(props)
		this.state = {
			comments: [],
			isLoading: true
		}
  }

	componentDidMount() {
    axios({
			method: 'get',
			url: "http://127.0.0.1:8000/api/posts/" + this.props.post + "/comments",
			headers: {
				Authorization: `Bearer` + Cookies.get('token')
			}
		})
		.then((response) => {
			this.setState({comments: response.data, isLoading: false})
		})
		.catch(function (error) {
			console.log(error)
		})
  }

	render() {
    return (
			<div className="comments-field">{
				this.state.isLoading ? <p>loading</p> : (
					this.state.comments.map((e, index) => {
						return <Comment comment={e} key={e.id}></Comment>
					})
				)
			}</div>
    )
  }

} 
