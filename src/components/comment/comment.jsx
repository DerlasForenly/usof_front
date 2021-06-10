import "./style.scss"

export default function Comment(props) {
	return (
        <div className="comment">
            <div className="author-info">
                <label id="author">vOVA</label>
                <label id="direction">#dfsfd</label>
                <label id="date">15-45-65</label>
            </div>
            <label id="content">aboba is me</label>
        </div>
	)
}