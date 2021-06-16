import React from 'react'
import PostPreview from "../post/PostPreview"
import CurrentPost from "../post/CurrentPost"
import axios from 'axios';
import Cookies from 'js-cookie';
import PostListPagination from "../post/PostListPagination"
//import Categories from "../post/Categories"


export default class MainPage extends React.Component {
  constructor(props) {
    super(props)
		this.state = {
			posts: [],
			isLoading: true,
			somePostActive: false,
			currentPost: 1
		}
  }

  componentDidMount() {
    axios({
			method: 'get',
			url: "http://127.0.0.1:8000/api/posts",
			headers: {
				Authorization: `Bearer` + Cookies.get('token')
			}
		})
		.then((response) => {
			this.setState({
				posts: response.data, 
				isLoading: false,
			})
		})
		.catch(function (error) {
			console.log(error)
		})
  }

	postPreviewHandler = e => {
		this.setState({currentPost: parseInt(e.currentTarget.id)})
	}


  render() {
    return (
			<div className="main-page">{
				this.state.isLoading ? <p>LOADING....</p> : (
					<>
						<div className="posts-list">
							{
								this.state.posts.map((post) => {
									return (
										<div onClick={this.postPreviewHandler} key={post.id} id={post.id}>
											<PostPreview 
												post={post} 
												key={post.id}>
											</PostPreview>
										</div>
									)
								})
							}
							<PostListPagination></PostListPagination>
						</div>
						<div className="current-post">
								<CurrentPost post={this.state.posts[this.state.currentPost - 1]}></CurrentPost>
						</div>
					</>
				)
			}</div>
		)
  }


}
