import PostPreview from "../post/post_preview"
import CurrentPost from "../post/current_post"

import "./style.scss"

export default function MainPage(props) {
	return (
		<div class="main-page">
			<div className="posts-list">
				<PostPreview></PostPreview>
				<PostPreview></PostPreview>
				<PostPreview></PostPreview>
			</div>
			<div className="current-post">
				<CurrentPost></CurrentPost>
			</div>
		</div>
	)
}