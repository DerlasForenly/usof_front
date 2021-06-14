import CommentsField from "../comment/CommentsField"
import CreateComment from "../comment/CreateComment"

export default function CurrentPost(props) {
	return (
    <div className="post">
      <label className="post-name">{props.post?.title}</label>
		  <label className="post-info">{
				props.post?.created_at + " " + props.post?.status
			}</label>
      <div className="post-content">
        <p>{props.post?.content}</p>
      </div>
      <div className="likes">
				<button>+</button>
				<label>{props.post?.likes}</label>
				<button>-</button>
			</div>
      <CommentsField post={props.post?.id}></CommentsField>
      <CreateComment post={props.post?.id}></CreateComment>
  	</div>
	)
}
