import React, { createRef, useEffect, useState } from 'react'
import PostPreview from "../post/PostPreview"
import CurrentPost from "../post/CurrentPost"
import axios from 'axios';
import Cookie from 'js-cookie';
import PostListPagination from "../post/PostListPagination"
import CreatePost from "../post/CreatePost"
import createImg from "../../images/create.png"
import WelcomePage from "./WelcomPage"
import PopularCategories from '../post/PopularCategories';


export default function MainPage(props) {
	const [state, setState] = useState({
		posts: [],
		isLoading: true,
		somePostActive: false,
		currentPost: false,
		isCreating: false,
		reload: false
	})

	const mainPageRef = createRef()

	useEffect(() => {
		axios({
			method: 'get',
			url: "http://127.0.0.1:8000/api/posts",
			headers: {
				Authorization: `Bearer` + Cookie.get('token')
			}
		})
		.then((response) => {

			setState(previousState => ({
				...previousState,
				posts: response.data, 
				isLoading: false,
				currentPost: false,
				isCreating: false,
			}))

		})
		.catch((error) => {
			console.log(error)
		})
	}, [state.isLoading, state.reload])

	const onCreatePost = e => {
		setState(previousState => ({
			...previousState,
			isCreating: true
		}))
	}


	return (
		<div className="main-page" ref={mainPageRef}>{
			state.isLoading ? <p>LOADING....</p> : (
				<>
					<div className="posts-list">
						{
							!Cookie.get('token') ? <div></div> :
							<div className="create-post-div" onClick={onCreatePost}>
								<img src={createImg} className="logo" alt="logo"></img>
							</div>
						}
						{
							state.posts.map((post) => {
								return (
									<div key={post.id} id={post.id}>
										<PostPreview 
											setState={setState}
											post={post} 
											key={post.id}
											mainPageState={state}>
										</PostPreview>
									</div>
								)
							})
						}
						<PostListPagination></PostListPagination>
					</div>
					<div className="current-post">
						{
							state.isCreating ? <CreatePost mainPageSetState={setState}></CreatePost> :
							state.currentPost ? <CurrentPost post={state.currentPost} mainPageSetState={setState}></CurrentPost> :
							<WelcomePage></WelcomePage>
						}
					</div>
					<PopularCategories></PopularCategories>
				</>
			)
		}</div>
	)
}