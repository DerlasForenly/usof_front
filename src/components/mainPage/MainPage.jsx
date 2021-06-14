import React from 'react'
import PostPreview from "../post/PostPreview"
import CurrentPost from "../post/CurrentPost"
import axios from 'axios';
import Cookies from 'js-cookie';


export default class MainPage extends React.Component {
  constructor(props) {
    super(props)
		this.state = {
			posts: [],
			isLoading: true
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
			this.setState({posts: response.data, isLoading: false})
		})
		.catch(function (error) {
			console.log(error)
		})
  }


  render() {
    return (
			<div className="main-page">{
				this.state.isLoading ? <p>LOADING....</p> : (
					<><div className="posts-list">
						{
							this.state.posts.map((post) => {
								return <PostPreview post={post} key={post.id}></PostPreview>
							})
						}
							<div className="pagination">
								<button>left</button>
								<label>1</label>
								<button>right</button>
							</div>
						</div>
						<div className="current-post">{
							<CurrentPost post={this.state.posts[0]}></CurrentPost>
					}</div></>
				)
			}</div>
		)
  }


}
