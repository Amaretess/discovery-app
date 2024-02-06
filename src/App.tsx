import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
}

const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')

  }, [])


  return (
    <>
      <ul>
        {users.map((user) => {
          <li>{user.name}</li>
        })}
      </ul>
    </>
  )
}

export default App;