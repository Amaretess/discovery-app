// ugh i fucking miss you it's hard doing this w/out you. 

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
      if (err instanceof CanceledError) return;
      setError(err.message);
      setLoading(false);
    })
    return () => cancel();
  }, [])

  const deleteUser = (user: User) => {
    setUsers(users.filter((u) => u.id !== user.id))
    userService.deleteUser(user.id)
  }

  const updateUser = (user: User) => {
    const updatedUser = { ...user, name: user.name + '!' }
    // --------------------> if the id of the current user equals the id of the user passed in func return updatedUser
    setUsers(users.map((u) => u.id === user.id ? updatedUser : u))
    userService.updateUser(user, updatedUser);
  }

  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {users.map((user) => <li className="list-item d-flex justify-content-between mx-1" key={user.id}>
          {user.name}
          <div>
            <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>Delete</button>
            <button onClick={() => updateUser(user)}>Update</button>
          </div>
        </li>)}
      </ul>
    </>
  )
}

export default App;
