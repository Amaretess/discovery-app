import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

const App = () => {


  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('')
  }, [])


  return (
    <>
      <ul>
        {users.map(users) => <li>{users.name}</li>}
      </ul>
    </>
  )
}

export default App



