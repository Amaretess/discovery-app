import { useEffect, useState } from 'react'
import userService, { User } from './services/user-service';
import { CanceledError } from './services/api-client';

const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAllUsers()
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

  const deleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id))
    userService.deleteUser(id)
  }

  const updateUser = (user: User) => {
    const updatedUser = { ...user, name: user.name + '!' }
    setUsers(users.filter(u => u.id === user.id ? updatedUser : u));
  }
  const addUser = () => {

  }

  return (

    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button onClick={() => addUser()} className="btn btn-primary m-1" >Add User</button>
      <ul className='list-group '>
        {users.map((user) => <li className='list-group-item d-flex justify-content-between' key={user.id} >
          {user.name}
          <div >
            <button className='btn btn-outline-danger mx-1' onClick={() => deleteUser(user.id)}>Delete</button>
            <button className='btn btn-outline-secondary' onClick={() => updateUser(user)} >Update</button>
          </div>
        </li>)}

      </ul>
    </>
  )
}

export default App
