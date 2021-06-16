import React from 'react'
import CommentLikesController from './CommentLikesController'
import axios from 'axios'
import Cookie from 'js-cookie'
import editImg from "../../images/edit.png"
import deleteImg from "../../images/delete.png"
import acceptImg from "../../images/accept.png"

export default class Comment extends React.Component {
	constructor(props) {
    super(props)
		this.MainPageRef = React.createRef()
		this.state = {
			isLoading: true,
			isEditing: false,
		}
  }

	onEdit = e => {
		if (this.state.isEditing) {
			this.setState({isEditing: false})
		}
		else {
			this.setState({isEditing: true})
		}
	}

	onDelete = e => {
		axios({
			method: 'delete',
			url: "http://127.0.0.1:8000/api/comments/" + this.props.comment.id,
			headers: {
				Authorization: `Bearer` + Cookie.get('token')
			}
		})
		.then((response) => {
			console.log(response.data)
		})
		.catch(function (error) {
			console.log(error)
		})
	}

	onSend = e => {
		if (this.state.isEditing) {
			this.setState({isEditing: false})
		}
		else {
			this.setState({isEditing: true})
		}

		console.log('Sending')

		axios({
			method: 'patch',
			url: "http://127.0.0.1:8000/api/comments/" + this.props.comment.id,
			data: {
				content: "new content"
			},
			headers: {
				Authorization: `Bearer` + Cookie.get('token')
			}
		})
		.then((response) => {
			console.log(response.data)
		})
		.catch(function (error) {
			console.log(error)
		})
	}

	


	render() {
		return (
			<div className="comment">
				<div className="author-info">
					<label className="author">{this.props.comment?.login}</label>
					<label className="direction">null</label>
					<label className="date">{this.props.comment?.created_at + ""}</label>
					<div className="edit-delete-div">
						{
							this.state.isEditing ?
							<img 
								src={acceptImg} 
								className="edit" 
								alt="edit" 
								onClick={this.onSend}
							></img> :
								<img 
								src={editImg} 
								className="edit" 
								alt="edit" 
								onClick={this.onEdit}
							></img>
						}
						<img 
							src={deleteImg} 
							className="delete" 
							alt="delete"
							onClick={this.onDelete}
						></img>
					</div>
				</div>
				{
					this.state.isEditing ? 
						<textarea className="edit-area" defaultValue={this.props.comment?.content}></textarea> :
						<label className="content">{this.props.comment?.content}</label>
				}
				<CommentLikesController comment={this.props.comment}></CommentLikesController>
			</div>
		)
	}
	
}
