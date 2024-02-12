import { useEffect, useState } from 'react'
import userService, { User } from './services/user-service';
import { CanceledError } from './services/api-client';

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
        setError(err.message);
        setLoading(false);
      })
    return () => cancel();
  }, [])

  const deleteUser = (user: User) => {
    setUsers(users.filter(u => u.id !== user.id));
    userService.deleteUser(user.id)
  }

  return (

    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <ul className='list-group'>
        {users.map((user) => <li className='list-group-item d-flex justify-content-between' key={user.id} >
          {user.name}
          <div >
            <button className='btn btn-outline-danger' onClick={() => deleteUser(user)} >Delete</button>
          </div>
        </li>)}

      </ul>
    </>
  )
}

export default App
