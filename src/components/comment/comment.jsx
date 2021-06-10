export default function Comment(props) {
	return (
		<div className="comment">
			<div className="author-info">
				<label className="author">vOVA</label>
				<label className="direction">#dfsfd</label>
				<label className="date">15-45-65</label>
			</div>
			<label className="content">aboba is me</label>
			<div className="likes">
				<button>+</button>
				<label>4</label>
				<button>-</button>
			</div>
		</div>
	)
}
