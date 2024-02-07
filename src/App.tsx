import { useEffect, useState } from "react";
import userService from "./services/user-service";
import { User } from './services/user-service';



const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    userService.getAllUsers()
      .response.then(({ data: allUsers }) => {
        setUsers(allUsers)
        setLoading(false);
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
