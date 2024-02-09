// i am so mad at you but i still love you. It's maddening

import { useEffect, useState } from "react"
import userService from "./services/user-service";

interface User {
  id: number;
  name: string;
}

const App = () => {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    userService.getAllUsers()
      .request.then((res) => {
        setUsers(res.data)
      })
  }, [])

  return (
    <div>

    </div>
  )
}

export default App
