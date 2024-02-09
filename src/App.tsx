// i am so mad at you but i still love you. It's maddening

import { useEffect, useState } from "react"
import userService, { User } from "./services/user-service";
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
    })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      })
    return () => cancel();

  }, [])

  const deleteUser = (user: User) => {
    // update the UI
    const originalUsers = [...users]
    setUsers(users.filter((u) => u.id !== user.id))

    // sending a request to the server
    userService.deleteUser(user.id)
      .catch((err) => {
        setError(err.message)
        setUsers(originalUsers);
      })
  }
  const updateUser = (user: User) => {

    const updatedUser = { ...user, name: user.name + '!' }
    setUsers(users.map(u => u.id === user.id ? updatedUser : u))

    // call server to save changes
    userService.updateUser(user)
  }

  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group" >
        {users.map((user) => <li key={user.id} className="list-group-item d-flex justify-content-between" >
          {user.name}
          <div>
            <button className="btn btn-outline-danger mx-1" onClick={() => deleteUser(user)} >Delete</button>
            <button className="btn btn-outline-secondary" onClick={() => updateUser(user)} >Update</button>
          </div>
        </li>)}
      </ul>
    </>
  )
}

export default App
