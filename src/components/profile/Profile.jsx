import { useEffect, useState, createRef } from "react"
import axios from 'axios'
import Cookie from 'js-cookie'
import avatarImg from "../../images/defaultAvatar.jpg"
import editImg from "../../images/edit.png"
import acceptImg from "../../images/accept.png"
import logoutImg from "../../images/logout.png"
import { Link, useHistory } from "react-router-dom"

import githubIco from "../../images/githubIco.png"
import instagramIco from "../../images/instagramIco.png"
import telegramIco from "../../images/telegramIco.png"

export default function Profile(props) {
	const history = useHistory()

	const [state, setState] = useState({
		isLoading: true,
		isLoadingAvatar: true,
		profile: {},
		isEditing: false,
		selectedFile: false,
		reload: false,
		avatarFile: false
	})

	const inputAvatarRef = createRef()
	const loginInputRef = createRef()
	const nameInputRef = createRef()

	const onLogout = e => {
		Cookie.remove('token')
		props.appSetState(previousState => ({
			...previousState,
			reload: !props.appState.reload,
		}))
		history.push("/home")
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
			console.log(response.data)	
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

				if (response.data.type === "application/json") {
					setState(previousState => ({
						...previousState,
						isLoadingAvatar: false,
						reload: false,
					}))
				}
				else {
					setState(previousState => ({
						...previousState,
						isLoadingAvatar: false,
						avatarFile: response.data,
						reload: false,
					}))
				}

			})
			.catch((error) => {
				console.log(error)
			})


		})
		.catch((error) => {
			console.log(error)
			Cookie.remove('token')
		})
	}, [state.reload])


	const onEdit = e => {
		setState(previousState => ({
			...previousState,
			isEditing: true
		}))
	}

	const onAccept = e => {
		if (loginInputRef.current.value === state.profile.login && nameInputRef.current.value === state.profile.name) {
			setState(previousState => ({
				...previousState,
				isEditing: false,
			}))

			return
		}


		axios({
			method: 'patch',
			url: 'http://127.0.0.1:8000/api/users/' + state.profile.id,
			data: {
				login: loginInputRef.current.value,
				name: nameInputRef.current.value,
				email: state.profile.email,
				role: state.profile.role,
			},
			headers: {
				Authorization: `Bearer` + Cookie.get('token')
			}
		})
		.then((response) => {
			console.log(response.data)
			setState(previousState => ({
				...previousState,
				isEditing: false,
				profile: response.data,
			}))
		})
		.catch((error) => {
			console.log(error)
		})
	}

	const onSubmitUploadAvatar = e => {
		e.preventDefault()

		const formData = new FormData()

		console.log(inputAvatarRef.current.files[0])
		if (!inputAvatarRef.current.files[0]) {
			return
		}

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
		<div className="profile-page">
			<div className="profile-div">
				<div className="avatar-div">
					{
						state.isLoadingAvatar ? <div></div> : <img className="avatar" src={
							state.avatarFile ? 
							URL.createObjectURL(state.avatarFile) : avatarImg
						} alt="avatar"></img>
					}
					{
						//state.isEditing ? 
						<form encType="mulyipart/form-data" method="post" className="upload-avatar" onSubmit={onSubmitUploadAvatar}>
							<input type="file" name="avatar" ref={inputAvatarRef}></input>
							<button className="upload-button">Upload</button>
						</form> //: <div></div>
					}
				</div>
				<div className="info">
					<div className="login-div">
						<div className="login">
							{
								state.isEditing ? 
								<input type="text" defaultValue={state.profile.login} placeholder="Login" ref={loginInputRef}></input> :
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
						state.isEditing ? 
						<input type="text" className="full-name" defaultValue={state.profile.name} ref={nameInputRef}></input> :
						<label className="full-name">{state.profile.name}</label>
					}
					<div className="other-info">

						<label>Status: null</label>
						<label>Role: {state.profile.role}</label>
						<label>Rating: {state.profile.rating}</label>

						<div className="contacts-div">
							<label>Contacts: </label>
							<div className="icons">
								<a href="https://github.com">
									<img src={githubIco} alt="githubIco"></img>
								</a>
								<a href="https://www.instagram.com/">
									<img src={instagramIco} alt="instagramIco"></img>
								</a>
								<a href="https://telegram.web">
									<img src={telegramIco} alt="telegramIco"></img>
								</a>
							</div>


						</div>

						<div className="hidden-info">
							<label>Hidden information:</label>
							<label>E-mail: {state.profile.email}</label>
							<label>Joined: {state.profile.created_at}</label>
						</div>
						
					</div>
				</div>
			</div>
			<div className="popular-posts">

			</div>
		</div>
		
	)
	
}
