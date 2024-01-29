import axios from "axios";
import { useEffect, useState } from "react"

interface User {
  id: number;
  name: string;
}

const App = () => {


  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // <User[]> tells axios what kind of data we are using
    axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .then(res => setUsers(res.data))
  }, [])

  return (
    <ul>
      <li></li>

    </ul>
  )
}

export default App
