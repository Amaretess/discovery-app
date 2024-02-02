import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react"

interface User {
  id: number;
  name: string;
}

const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {

    const controller = new AbortController();

    setLoading(true);

    axios.get<User[]>('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
      .then(res => {
        setUsers(res.data)
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message)
        setLoading(false);
      });

    return () => controller.abort();
  }, [])

  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="danger-text"></p>}
      <ul>
        {users.map(user => <li key={user.id} >{user.name}</li>)}
      </ul>
    </>
  )
}

export default App
