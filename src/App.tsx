// i hate you so much

import { useState, useEffect } from 'react'
import apiClient, { CanceledError } from './services/api-client';

interface User {
  id: number;
  name: string;
}

const App = () => {

  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);

    const controller = new AbortController();

    apiClient.get('/users')
      .then(({ data: allUsers }) => {
        setUsers(allUsers)
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message)
        setLoading(false);
      })

    return () => controller.abort();
  }, [])

  const updateUser = (user: User) => {
    const updatedUser = [{ ...user, name: user.name + '!' }]
    setUsers(users.filter(u => u.id === user.id ? updatedUser : user));
  }

  const deleteUser = (user: User) => {
    setUsers(users.filter(u => u.id !== user.id))
  }

  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <ul className='list-group'>
        {users.map(user => <li className='list-group-item d-flex justify-content-between' key={user.id} >
          {user.name}
          <div>
            <button onClick={() => updateUser(user)} className='btn btn-outline-secondary' >Update</button>
            <button onClick={() => deleteUser(user)} className='btn btn-outline-danger' >Delete</button>
          </div>
        </li>)}
      </ul>
    </>
  )
}

export default App
