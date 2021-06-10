import CommentsField from "../comment/comments_field"
import CreateComment from "../comment/create_comment"

import "./style.scss"

export default function CurrentPost(props) {
	return (
        <div className="post-head">
            <label className="post-name">what is aboba</label>
		    <label className="post-info">12-30-2415</label>
            <div className="post-content">
                <p>
                    Lorem ipsum dolor sit 
                    amet consectetur adipisicing 
                    elit. Amet, perspiciatis! 
                    Deleniti quibusdam aspernatur 
                    provident tempore quas ab non 
                    dolorem adipisci illo quasi iusto, 
                    similique repellat tenetur cum ipsum 
                    libero ad.
                </p>
            </div>
            <CommentsField></CommentsField>
            <CreateComment></CreateComment>
        </div>
	)
}