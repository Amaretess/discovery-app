import { useEffect, useState } from "react";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";


const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(''); // the data is gonna be a string (message)
  const [isLoading, setLoading] = useState(false); // data is a boolean


  useEffect(() => {
    setLoading(true);

    const { cancel, request } = userService.getAllUsers()
    request.then(res => {
      setUsers(res.data)
      setLoading(false);
    })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message)
        setLoading(false);
      });

    return () => cancel();
  }, []) // DON'T FORGET THE DEPENDENCY

  const addUser = () => {
    const originalUsers = [...users]
    const newUser = { id: 0, name: 'Ash' };
    userService.addUser(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch(err => {
        setError(err.message);
        setUsers(originalUsers);
      })
  }

  const deleteUser = (user: User) => {
    const originalUsers = [...users]
    setUsers(users.filter(u => u.id !== user.id))

    userService.deleteUser(user.id)
      .catch(err => {
        setError(err.message)
        setUsers(originalUsers)
      })
  }

  const updateUser = (user: User) => {
    const originalUsers = [...users]
    const updatedUser = { ...user, name: user.name + '!' };
    setUsers(users.map(u => u.id === user.id ? updatedUser : u));

    userService.updateUser(updatedUser)
      .catch(err => {
        setError(err.message);
        setUsers(originalUsers);
      })
  }


  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger" >{error}</p>}
      <button className="btn btn-primary" onClick={() => addUser()} >Add User</button>
      <ul className="list-group" >
        {users.map(user =>
          <li className="list-group-item d-flex justify-content-between" key={user.id} >
            {user.name}
            <div className="">
              <button className="btn btn-outline-secondary mx-1" onClick={() => updateUser(user)} >Update</button>
              <button className='btn btn-outline-danger' onClick={() => deleteUser(user)} >Delete</button>

            </div>
          </li>)}
      </ul>

    </>
  )
}

export default App
