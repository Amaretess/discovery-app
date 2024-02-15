import { useEffect, useState } from "react"
import userService, { User } from "./services/user-service";

const App = () => {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const { request, cancel } = userService.getAll<User[]>();
    request.then(({ data: allUsers }) {
      setUsers(allUsers)
    })
  }, [])

  return (
    <>
      <ul>
      </ul>
    </>
  )
}

export default App
