import axios from 'axios';
import { useEffect, useState } from 'react';

interface Posts {
  id: number;
  title: string;
  body: string;
}

const App = () => {

  const [posts, setPosts] = useState<Posts[]>([]);
  const [err, setErr] = useState('');

  const controller = new AbortController()

  useEffect(() => {
    axios.get<Posts[]>('https://jsonplaceholder.typicode.com/posts', { signal: controller.signal })
      .then(res => setPosts(res.data))
      .catch(err => setErr(err.message));

    return () => controller.abort();
  }, [])

  return (
    <>
      {err && <p>{err}</p>}
      <ul>
        {posts.map(post => <li key={post.id} >{post.title}</li>)}
      </ul>
    </>
  )
}

export default App
