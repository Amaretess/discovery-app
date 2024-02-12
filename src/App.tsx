import { useEffect, useState } from 'react'
import userService from './services/user-service';

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
        setError(err.message);
        setLoading(false);
      })
    return () => cancel();

  }, [])

  return (

    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary m-1" >Add User</button>
      <ul className='list-group '>
        {users.map((user) => <li className='list-group-item d-flex justify-content-between' key={user.id} >
          {user.name}
          <div >
            <button className='btn btn-outline-danger mx-1'  >Delete</button>
            <button className='btn btn-outline-secondary'  >Update</button>
          </div>
        </li>)}

      </ul>
    </>
  )
}

export default App
