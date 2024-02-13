// it's always the same, "my ex taught me"

import useUsers from "./hooks/useUsers";
import userService, { User } from "./services/user-service";

const App = () => {

  const { users, error, isLoading, setUsers, setError } = useUsers();

  // these funcs specific to component
  const updateUser = (user: User) => {
    const updatedUser = { ...user, id: 0, name: user.name + '!' }
    setUsers(users.map((u) => u.id === user.id ? updatedUser : u))
    userService.update(user)

  }

  const deleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id))
    userService.delete(id)
  }

  return (

    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary m-1" >Add User</button>
      <ul className="list-group">
        {users.map((user) => <li className="list-group-item d-flex justify-content-between" key={user.id}>
          {user.name}
          <div>
            <button onClick={() => updateUser(user)} className="btn btn-outline-secondary mx-1" >Update</button>
            <button onClick={() => deleteUser(user.id)} className="btn btn-outline-danger" >Delete</button>
          </div>
        </li>)}

      </ul>
    </>
  )
}

export default App
