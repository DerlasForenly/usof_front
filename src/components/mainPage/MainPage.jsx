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
		reload: false,
		currentPage: 1,
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
			console.log(response.data)

			setState(previousState => ({
				...previousState,
				posts: response.data.data, 
				isLoading: false,
				currentPost: false,
				isCreating: false,
				currentPage: response.data.current_page
			}))

		})
		.catch((error) => {
			console.log(error)
		})
	}, [state.isLoading, state.reload])

	const onCreatePost = e => {
		setState(previousState => ({
			...previousState,
			isCreating: true,
			currentPost: false,
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
								<label>Create post: </label>
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
						<PostListPagination currentPage={state.currentPage} mainPageSetState={setState} mainPageState={state}></PostListPagination>
					</div>
					<div className="current-post">
						{
							state.isCreating ? <CreatePost mainPageSetState={setState} mainPageState={state}></CreatePost> :
							state.currentPost ? <CurrentPost post={state.currentPost} mainPageSetState={setState} mainPageState={state}></CurrentPost> :
							<WelcomePage></WelcomePage>
						}
					</div>
					<PopularCategories></PopularCategories>
				</>
			)
		}</div>
	)
}