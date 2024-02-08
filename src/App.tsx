import { useEffect, useState } from "react";
import { User } from "./services/user-service";
import userService from "./services/user-service";
import { CanceledError } from "./services/api-client";

const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAllUsers()
    request.then(({ data: allUsers }) => {
      setUsers(allUsers);
      setLoading(false);
    }).catch((err) => {
      if (err instanceof CanceledError)
        setError(err.message);
      setLoading(false);
    })
    return () => cancel();
  }, [])

  const deleteUser = (id: number) => {
    setUsers(users.filter((u) => {
      if (u.id !== id) return;
    }))
  }

  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <ul>
        {users.map((user) => <li key={user.id}>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
          <button onClick={() => updateUser()}>Update</button>
          {user.name}
        </li>)}
      </ul>
    </>
  )
}

export default App;
