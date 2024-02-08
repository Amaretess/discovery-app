import { useEffect, useState } from "react";
import commentService from "./services/comment-service";
import { Comment } from "./services/comment-service";


const App = () => {

  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    commentService.getAllComments()
      .request.then(({ data: allComments }) => {
        setComments(allComments)
      })
      .catch((err) => {
        setError(err.message);
      })
  }, [])

  return (

    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p ></p>}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} >
            {comment.name}
          </li>
        ))}

      </ul>
    </>
  )
}

export default App
