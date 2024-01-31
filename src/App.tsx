import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}


const App = () => {


  const [users, setUsers] = useState<User[]>([]);
  const [err, setErr] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {

    const controller = new AbortController();

    setLoading(true);

    axios.get<User[]>('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
      .then(res => {
        setUsers(res.data)
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setErr(err.message)
      });

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users]
    setUsers(users.filter(u => u.id !== user.id))

    axios.delete('https://jsonplaceholder.typicode.com/users/' + user.id)
      .catch(err => {
        setErr(err.message)
        setUsers(originalUsers);
      })
  }

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 1, name: 'Ash' };
    setUsers([newUser, ...users]);

    axios.post('https://jsonplaceholder.typicode.com/users/' + newUser)
      .catch(err => {
        setErr(err);
        setUsers(originalUsers)
      })
  };

  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {err && <p className="text-danger" >{err}</p>}
      <button onClick={() => addUser()} className="btn btn-outline-primary" >Add</button>
      <ul className="list-group" >
        {users.map((user) => (
          <li className="list-group-item d-flex justify-content-between" key={user.id} >
            {user.name}
            <button onClick={() => deleteUser(user)} className="btn btn-outline-danger">Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
