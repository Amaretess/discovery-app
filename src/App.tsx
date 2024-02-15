import { useEffect, useState } from "react"
import userService, { User } from "./services/user-service";
import { CanceledError } from "./services/api-client";

const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<User>();
    request.then(({ data: allUsers }) => {
      setUsers(allUsers);
      setLoading(false);
    }).catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
      setLoading(false);
    })
  }, [])

  const updateUser = () => {

  }

  const deleteUser = () => {

  }

  // git push to practice

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <p className="spinner-border">{error}</p>}
      <ul className="list-group" >
        {users.map((user) => (
          <li className="list-group-item d-flex justify-content-between" key={user.id}>
            {user.name}
            <div>
              <button className="btn btn-outline-secondary" onClick={() => updateUser()} >Update</button>
              <button className="btn btn-outline-danger" onClick={() => deleteUser()} >Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
