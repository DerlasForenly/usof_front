import { useEffect, useState, createRef } from "react"
import axios from 'axios'
import Cookie from 'js-cookie'
import avatarImg from "../../images/defaultAvatar.jpg"
import editImg from "../../images/edit.png"
import acceptImg from "../../images/accept.png"
import logoutImg from "../../images/logout.png"
import { Link } from "react-router-dom"

export default function Profile(props) {
	const [state, setState] = useState({
		isLoading: true,
		isLoadingAvatar: true,
		profile: {},
		isEditing: false,
		selectedFile: false,
		reload: false,
		avatarFile: avatarImg
	})

	const inputAvatarRef = createRef()

	const onLogout = e => {
		Cookie.remove('token')
	}

	useEffect(() => {
		axios({
			method: 'post',
			url: 'http://127.0.0.1:8000/api/auth/me',
			headers: {
				Authorization: `Bearer` + Cookie.get('token')
			}
		})
		.then((response) => {
			//console.log(response.data)	
			setState(previousState => ({
				...previousState,
				profile: response.data,
				isLoading: false,
			}))

			axios({
				method: 'get',
				url: 'http://127.0.0.1:8000/api/users/' + response.data.id + '/avatar',
				responseType: 'blob', // important
			})
			.then((response) => {
				//console.log(response.data)	
				setState(previousState => ({
					...previousState,
					isLoadingAvatar: false,
					avatarFile: response.data,
					reload: false,
				}))

				//console.log(state.avatarFile)
			})
			.catch((error) => {
				console.log(error)
			})


		})
		.catch((error) => {
			console.log(error)
		})
	}, [state.reload])


	const onEdit = e => {
		setState(previousState => ({
			...previousState,
			isEditing: true
		}))
	}

	const onAccept = e => {
		setState(previousState => ({
			...previousState,
			isEditing: false
		}))
	}

	const onSubmitUploadAvatar = e => {
		e.preventDefault()

		const formData = new FormData()

		console.log(inputAvatarRef.current.files[0])

		formData.append(
			'picture',
			inputAvatarRef.current.files[0]
		)

		axios({
      method: 'post',
      url: "http://127.0.0.1:8000/api/users/avatar",
      data: formData,
			headers: {
				authorization: `Bearer ` + Cookie.get('token'),
				'Content-Type': 'multipart/form-data'
			}
    })
    .then((response) => {
      console.log(response.data)
      setState(previousState => ({
				...previousState,
				reload: true,
			}))
    })
    .catch(function (error) {
      console.log(error)
    })
	}

	return (
		state.isLoading ? <div>loading</div> :
		<div className="profile-div">
			<div className="avatar-div">
				{
					state.isLoadingAvatar ? <div></div> : <img className="avatar" src={
						URL.createObjectURL(state.avatarFile)
					} alt="avatar"></img>
				}
				{
					//state.isEditing ? 
					<form encType="mulyipart/form-data" method="post" className="upload-avatar" onSubmit={onSubmitUploadAvatar}>
						<input type="file" name="avatar" ref={inputAvatarRef}></input>
						<button>Upload</button>
					</form> //: <div></div>
				}
			</div>
			
			<div className="info">
				<div className="login-div">

					<div className="login">
						{
							state.isEditing ? <input type="text" defaultValue={state.profile.login} placeholder="Login"></input> :
							<label>{state.profile.login}</label>
						}
					</div>

					<img className="control" src={
						state.isEditing ? acceptImg : editImg
					} alt="edit" onClick={
						state.isEditing ? onAccept : onEdit
					}></img>
					<Link className="control" to="/home" onClick={onLogout}>
						<img src={logoutImg} alt="logout"></img>
					</Link>
					
				</div>

				{
					state.isEditing ? <input type="text" className="full-name" defaultValue={state.profile.name}></input> :
					<label className="full-name">{state.profile.name}</label>
				}

				<div className="other-info">
					<label>Status: null</label>
					<label>Role: {state.profile.role}</label>
					<label>Rating: {state.profile.rating}</label>
					<div>
						<label>Contacts: </label>
					</div>
				</div>
			</div>
		</div>
	)
	
}
