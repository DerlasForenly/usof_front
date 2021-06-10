import PostPreview from "../post/PostPreview"
import CurrentPost from "../post/CurrentPost"

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
