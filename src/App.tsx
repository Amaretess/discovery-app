import { useEffect, useState } from "react";
import userService from "./services/user-service";
import { User } from './services/user-service';



const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    userService.getAllUsers()
      .response.then()
  }, [])


  return (
    <>
      <ul>

      </ul>
    </>
  )
}

export default App
