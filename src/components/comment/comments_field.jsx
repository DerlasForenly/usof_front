import Comment from "../comment/comment"

import "./style.scss"

export default function CommentsField(props) {
	return (
        <div className="comments-field">
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
        </div>
	)
}