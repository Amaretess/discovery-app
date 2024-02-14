import { useEffect, useState } from "react"
import userService, { User } from "./services/user-service"
import { CanceledError } from "axios";



const App = () => {

  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAllUsers();
    request.then(({ data: allUsers }) => {
      setUsers(allUsers);
      setLoading(false);
    }).catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message)
      setLoading(false);
    })
    return () => cancel();
  }, [])

  const updateUser = (user: User) {
    const updatedUser = { ...user, name: user.name + '!' }
    // writing this function looks weird at first, compiler figures it out
    setUsers(users.map(u => u.id === user.id ? updatedUser : u))
  }

  const deleteUser = (id: number) {

  }



  return (
    <>
      { }
      {error && <p className="text-danger" >{error}</p>}
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item d-flex justify-content-between" key={user.id}>
            {user.name}
            <div>
              <button onClick={() => updateUser(user)} >update</button>
              <button onClick={() => deleteUser(user.id)} >delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
