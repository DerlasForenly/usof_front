import { useEffect, useState } from "react"
import ratingImg from "../../images/ratingBlack.png"
import myRatingUpImg from "../../images/ratingBlue.png"
import myRatingDownImg from "../../images/ratingRed.png"
import axios from "axios"
import Cookie from "js-cookie"
import jwt_decode from "jwt-decode";

export default function RatingController(props) {
	const [state, setState] = useState({
		isLoading: true,
		rating: 0,
		myRating: false,
		reload: false,
		like: false,
	})

	useEffect(() => {
		let myId
		if (Cookie.get('token'))
			myId = jwt_decode(Cookie.get('token')).sub

		let url
		if (props.type === "comment") {
			url = 'http://127.0.0.1:8000/api/comments/' + props.id + '/like';
		}
		else if (props.type === "post") {
			url = 'http://127.0.0.1:8000/api/posts/' + props.id + '/like';
		}

		axios({
			method: 'get',
			url: url,
		})
		.then((response) => {
			console.log(response.data)

			let rating = 0;
			let like = false;
			response.data.map(e => {
				if (Cookie.get('token'))
					if (e.user_id === myId) {
						like = e
					}

				rating += e.like
				rating -= e.dislike
			})

			setState(previousState => ({
				...previousState,
				isLoading: false,
				rating: rating,
				like: like,
			}))
		})
		.catch((error) => {
			console.log(error)
		})

	}, [props.postId, state.reload])

	const onClickRatingUp = e => {
		let url
		if (props.type === "comment") {
			url = 'http://127.0.0.1:8000/api/comments/' + props.id + '/like';
		}
		else if (props.type === "post") {
			url = 'http://127.0.0.1:8000/api/posts/' + props.id + '/like';
		}

		axios({
			method: 'post',
			url: url,
			data: {
				like: 1,
				dislike: 0,
			},
			headers: {
				Authorization: `Bearer` + Cookie.get('token')
			}
		})
		.then((response) => {
			console.log(response.data)

			setState(previousState => ({
				...previousState,
				reload: !state.reload,
			}))
		})
		.catch((error) => {
			console.log(error)
		})
	}

	const onClickRatingDown = e => {
		let url
		if (props.type === "comment") {
			url = 'http://127.0.0.1:8000/api/comments/' + props.id + '/like';
		}
		else if (props.type === "post") {
			url = 'http://127.0.0.1:8000/api/posts/' + props.id + '/like';
		}

		axios({
			method: 'post',
			url: url,
			data: {
				like: 0,
				dislike: 1,
			},
			headers: {
				Authorization: `Bearer` + Cookie.get('token')
			}
		})
		.then((response) => {
			console.log(response.data)

			setState(previousState => ({
				...previousState,
				reload: !state.reload,
			}))
		})
		.catch((error) => {
			console.log(error)
		})
	}

	const onClickDelete = e => {
		let url
		if (props.type === "comment") {
			url = 'http://127.0.0.1:8000/api/comments/' + props.id + '/like';
		}
		else if (props.type === "post") {
			url = 'http://127.0.0.1:8000/api/posts/' + props.id + '/like';
		}
		
		axios({
			method: 'delete',
			url: url,
			headers: {
				Authorization: `Bearer` + Cookie.get('token')
			}
		})
		.then((response) => {
			console.log(response.data)

			setState(previousState => ({
				...previousState,
				reload: !state.reload,
			}))
		})
		.catch((error) => {
			console.log(error)
		})
	}

	return (
		<div className="likes">
			{
				!state.like ? <img className="inactive-up" src={ratingImg} alt="rating-up-black" onClick={onClickRatingUp}></img> :
				state.like.like === 0 ? <img className="inactive-up" src={ratingImg} alt="rating-up-black" onClick={onClickRatingUp}></img> :
				<img className="rating-up" src={myRatingUpImg} alt="rating-up" onClick={onClickDelete}></img>
			}
			{
				state.isLoading ? <></> : <label>{state.rating}</label>
			}
			{
				!state.like ? <img className="inactive-down" src={ratingImg} alt="rating-down-black" onClick={onClickRatingDown}></img> :
				state.like.dislike === 0 ? <img className="inactive-down" src={ratingImg} alt="rating-down-black" onClick={onClickRatingDown}></img> :
				<img className="rating-down" src={myRatingDownImg} alt="rating-down" onClick={onClickDelete}></img>
			}
		</div>
	)
}