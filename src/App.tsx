import { CanceledError } from "axios";
import userService from "./services/user-service";
import { useEffect, useState } from "react";
import { User } from "./services/user-service";


const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);


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
  }, [])

  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="danger-text"></p>}
      <ul>
        {users.map(user => <li key={user.id} >{user.name}</li>)}
      </ul>
    </>
  )
}

export default App
