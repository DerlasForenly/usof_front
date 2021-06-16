import React from 'react'
import editImg from "../../images/edit.png"
import deleteImg from "../../images/delete.png"

export default class PostController extends React.Component {
	constructor(props) {
    super(props)
		this.state = {
			isLoading: true
		}
  }

	editHandler = (e) => {

	}

	deleteHandler = e => {

	}

	render() {
		return (
			<div className="post-controller">
				<img 
					src={editImg} 
					className="edit" 
					alt="edit" 
					onClick={this.editHandler}
				></img>
				<img 
					src={deleteImg} 
					className="delete" 
					alt="delete"
					onClick={this.deleteHandler}
				></img>
			</div>
		)
	}
}