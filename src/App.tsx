import axios, { CanceledError } from 'axios';
import { useState, useEffect } from 'react';


const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {

    const controller = new AbortController();

    setLoading(true);

    axios.get<User[]>('/users', { signal: controller.signal })
      .then(({ data: allUsers }) => {
        setUsers(allUsers)
        setLoading(false)
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)
      })

    return () => controller.abort()

  }, []);

  const deleteUser = (user: User) => {
    setUsers(users.filter((u) => u.id !== user.id))


  }


  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group" >
        {users.map((user) => <li className="list-group-item" key={user.id}>
          <div className="d-flex justify-content-between" >
            {user.name}
            <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>delete</button>

          </div>
        </li>)}
      </ul>
    </>
  )
}

export default App;