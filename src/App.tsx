import axios from 'axios';
import apiClient from './services/api-client';
import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {

    const controller = new AbortController();

    setLoading(true);

    apiClient
      .get('/users')
      .then(({ data: allUsers }) => {
        setUsers(allUsers);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message)
      })
    controller.abort();
  })

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
