import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}


const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(''); // the data is gonna be a string (message)
  const [isLoading, setLoading] = useState(false) // data is a boolean


  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);

    axios.get<User[]>('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
      .then(res => {
        setUsers(res.data)
        setLoading(false);
      })
      .catch(err => {
        setError(err.message)
        setLoading(false);
      });
  }, []) // DON'T FORGET THE DEPENDENCY

  const addUser = () => {
    const newUser = { id: 0, name: 'Ash' };
    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then(res => setUsers([res.data, ...users]))
  }

  const deleteUser = (user: User) => {
    const originalUsers = [...users]
    setUsers(users.filter(u => u.id !== user.id))

    axios.delete('https://jsonplaceholder.typicode.com/users/' + user.id)
      .catch(err => {
        setError(err.message)
        setUsers(originalUsers)
      })
  }


  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger" >{error}</p>}
      <button className="btn btn-primary" onClick={() => addUser()} >Add User</button>
      <ul className="list-group" >
        {users.map(user =>
          <li className="list-group-item d-flex justify-content-between" key={user.id} >
            {user.name}
            <button className='btn btn-outline-danger' onClick={() => deleteUser(user)} >Delete</button>
          </li>)}
      </ul>

    </>
  )
}

export default App
