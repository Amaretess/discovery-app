import { useEffect, useState } from 'react';
import userService, { User } from './services/user-service';
import { CanceledError } from 'axios';


const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {

    setLoading(true);

    userService
      .getAllUsers()
      .then(({ data: allUsers }) => {
        setUsers(allUsers);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)
      })
  }, [])

  return (
    <>
      {isLoading && <div className='spinner-border' ></div>}
      {error && <p className='text-danger' >{error}</p>}
      <ul className="list-group" >
        {users.map((user) => <li className='list-group-item' key={user.id} >{user.name}</li>)}
      </ul>
    </>
  )
}

export default App
