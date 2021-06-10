import CommentsField from "../comment/CommentsField"
import CreateComment from "../comment/CreateComment"



export default function CurrentPost(props) {
	return (
    <div className="post">
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
      <div className="likes">
				<button>+</button>
				<label>4</label>
				<button>-</button>
			</div>
      <CommentsField></CommentsField>
      <CreateComment></CreateComment>
  	</div>
	)
}
