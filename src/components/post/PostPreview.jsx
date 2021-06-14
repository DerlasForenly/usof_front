export default function PostPreview(props) {
	return (
		<div className="post-in-list">
			<label className="post-name">{props.post.title}</label>
			<label className="post-info">{props.post.created_at}</label>
		</div>
	)
}
