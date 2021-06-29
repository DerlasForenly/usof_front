import axios from "axios"
import Cookie from "js-cookie"

import paginationImg from "../../images/ratingBlack.png"

export default function PostListPagination(props) {
	const onNextPage = e => {
		e.preventDefault()

		axios({
			method: 'get',
			url: `http://127.0.0.1:8000/api/posts?page=${props.currentPage + 1}`,
			headers: {
				Authorization: `Bearer` + Cookie.get('token')
			}
		})
		.then((response) => {
			console.log(response.data)

			if (response.data.data.length === 0) {
				return
			}

			props.mainPageSetState(previousState => ({
				...previousState,
				posts: response.data.data, 
				isLoading: false,
				isCreating: false,
				currentPage: response.data.current_page
			}))

		})
		.catch((error) => {
			console.log(error)
		})

	}

	const onPrevPage = e => {
		e.preventDefault()

		axios({
			method: 'get',
			url: `http://127.0.0.1:8000/api/posts?page=${props.currentPage - 1}`,
			headers: {
				Authorization: `Bearer` + Cookie.get('token')
			}
		})
		.then((response) => {
			console.log(response.data)

			if (response.data.data.length === 0) {
				return
			}

			props.mainPageSetState(previousState => ({
				...previousState,
				posts: response.data.data, 
				isLoading: false,
				isCreating: false,
				currentPage: response.data.current_page
			}))

		})
		.catch((error) => {
			console.log(error)
		})
	}

	return (
		<div className="pagination">
			<img className="prev" src={paginationImg} alt="newt-page" onClick={onPrevPage}></img>
			<label>{props.currentPage}</label>
			<img className="next" src={paginationImg} alt="newt-page" onClick={onNextPage}></img>
		</div>
	)
}