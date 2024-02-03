import { useEffect, useState } from 'react';
import userService, { User } from './services/user-service';
import { CanceledError } from 'axios';

// just want to see if you are stalking my github. I made a million dollars out the dust. Always have them shooters in the cut. front a move and they'll fuck you up. bust a move you tryna get rich or what? Tokyo drift, car tricks haha. Realest shit i ever wrote. prolly not the realest shit i ever spoke.


const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {

    setLoading(true);

    userService
      .getAllUsers()
      .then(({ data: allUsers }) => {
        setUsers(allUsers);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)
      })
  }, [])

  return (
    <>
      {isLoading && <div className='spinner-border' ></div>}
      {error && <p className='text-danger' >{error}</p>}
      <ul className="list-group" >
        {users.map((user) => <li className='list-group-item' key={user.id} >{user.name}</li>)}
      </ul>
    </>
  )
}

export default App
