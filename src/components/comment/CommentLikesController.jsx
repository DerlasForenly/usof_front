export default function CommentLikesController(props) {
  return (
		<div className="likes">
			<button>+</button>
			<label>{props.comment?.likes}</label>
			<button>-</button>
    </div>
  )
}