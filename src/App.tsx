import axios, { CanceledError } from 'axios';
import { useState, useEffect } from 'react';

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
      .then(({ data: allUsers }) => {
        setUsers(allUsers)
        setLoading(false)
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)
      })

    return () => controller.abort()

  }, [])


  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group d-flex justify-content-between" >
        {users.map((user) => <li className="list-group-item" key={user.id}>
          {user.name}
          <div>
            <button className="btn btn-outline-danger" >delete</button>

          </div>
        </li>)}
      </ul>
    </>
  )
}

export default App;