import { useEffect, useState } from "react";
import userService from "./services/user-service";





const App = () => {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    userService.getAllUsers()
      .response.then((data: allUsers) {

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
