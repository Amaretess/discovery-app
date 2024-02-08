import { useEffect, useState } from "react";
import { User } from "./services/user-service";
import userService from "./services/user-service";

const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    userService.getAllUsers()
      .request.then(({ data: allUsers }) => {
        setUsers(allUsers);
      })
  }, [])

  return (
    <ul>
      {users.map((user) => <li key={user.id}>{user.name}</li>)};
    </ul>
  )
}

export default App
