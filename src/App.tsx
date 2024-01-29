import axios, { CanceledError } from 'axios';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

const App = () => {

  const [posts, setPosts] = useState<Post[]>([]);
  const [err, setErr] = useState('');

  useEffect(() => {

    const controller = new AbortController();

    axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts', { signal: controller.signal })
      .then(res => setPosts(res.data))
      .catch(err => {
        if (err instanceof CanceledError) return;
        setErr(err.message)
      })
    return () => controller.abort();
  }, [])

  return (
    <>
      {err && <p className="text-danger" >{err}</p>}
      <ul>
        {posts.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>

    </>
  )
}

export default App
