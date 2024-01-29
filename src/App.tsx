import axios from "axios";
import { useEffect, useState } from "react"

interface User {
  id: number;
  name: string;
}

const App = () => {


  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // <User[]> tells axios what kind of data we are using
    axios.get<User[]>('https://jsonplaceholder.typicode.com/xusers')
      .then(res => setUsers(res.data))
      .catch(err => setError(err.message))
  }, [])

  return (
    <ul>
      {error && <p className="text-danger" >{error}</p>}
      {users.map(user => <li key={user.id}>{user.name}</li>)}

    </ul>
  )
}

export default App
