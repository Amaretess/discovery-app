import axios from 'axios';
import React, { useState, useEffect } from 'react';

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

    axios.get('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
      .then(({ data: allUsers }) => {
        setUsers(allUsers)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
      })

    return controller.abort()

  }, [])


  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <ul>
        {users.map((user) => <li key={user.id}> {user.name}</li>)}
      </ul>
    </>
  )
}

export default App;