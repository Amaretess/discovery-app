import { useEffect, useState } from "react";
import commentService from "./services/comment-service";
import { Comment } from "./services/comment-service";
import { CanceledError } from './services/api-client';


const App = () => {

  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = commentService.getAllComments()
    request.then(({ data: allComments }) => {
      setComments(allComments)
      setLoading(false)
    })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      })

    return cancel()
  }, [])

  return (

    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p >{error}</p>}
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
