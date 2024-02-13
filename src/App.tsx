// it's always the same, "my ex taught me"

import useUsers from "./hooks/useUsers";

const App = () => {

  const { users, error, isLoading, setUsers, setError } = useUsers();

  // these funcs specific to component
  const updateUser = () => {

  }

  const deleteUser = () => {

  }

  return (

    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary m-1" >Add User</button>
      <ul className="list-group">
        {users.map((user) => <li className="list-group-item d-flex justify-content-betweeen" key={user.id}>
          {user.name}
          <div>
            <button onClick={() => updateUser()} className="btn btn-outline-secondary" >Update</button>
            <button onClick={() => deleteUser()} className="btn btn-outline-secondary" >Delete</button>
          </div>
        </li>)}

      </ul>
    </>
  )
}

export default App
