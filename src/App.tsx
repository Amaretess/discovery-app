import apiClient from './services/api-client';
import { useEffect, useState } from 'react';
import { User } from './services/api-services';
import { CanceledError } from 'axios';


const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {

    const controller = new AbortController();

    setLoading(true);

    apiClient
      .get<User[]>('/users', { signal: controller.signal })
      .then(({ data: allUsers }) => {
        setUsers(allUsers);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)
      })
    controller.abort();
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
