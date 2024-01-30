import axios from "axios";
import { useEffect, useState } from "react";

interface Users {
  id: number;
  name: string;
}

const App = () => {

  const [users, setUsers] = useState<Users[]>([]);
  const [err, setErr] = useState('');

  useEffect(() => {

    const controller = new AbortController();

    axios.get<Users[]>('https://jsonplaceholder.typicode.com/users')
      .then(res => setUsers(res.data))
      .catch(err => setErr(err.message));

    return () => controller.abort();

  }, [])

  return (
    <>
      {err && <p className="text-danger" >{err}</p>}
      <ul>
        {users.map(user => <li className="text-danger" key={user.id} >{user.name}</li>)}
      </ul>
    </>
  )
}

export default App
