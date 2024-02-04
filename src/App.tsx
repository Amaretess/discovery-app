import { useEffect, useState } from 'react';
import userService, { User } from './services/user-service';
import { CanceledError } from 'axios';

const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true);

    const { request, cancel } = userService.getAllUsers();
    request.then(({ data: allUsers }) => {
      setUsers(allUsers)
      setLoading(false);
    })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        // haha i solved my bug on accident
        setError(err.message)
      })

    return () => cancel();
  }, [])

  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <ul>
        {users.map((user) => <li key={user.id} >{user.name}</li>)}
      </ul>
    </>
  )
}

export default App
