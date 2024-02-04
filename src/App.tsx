import { useEffect, useState } from 'react';
import userService, { User } from './services/user-service';

const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const { request, cancel } = userService.getAllUsers()
      .request.then(({ data: allUsers }) => {
        setUsers(allUsers)
      })
      .
  }, [])

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      <ul>
        {users.map((user) => <li key={user.id} >{user.name}</li>)}
      </ul>
    </>
  )
}

export default App
