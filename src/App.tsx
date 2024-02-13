import { useEffect, useState } from "react"


const App = () => {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {

  }, [])

  return (
    <>
      <ul>
        {users.map(user => <li></li>)}
      </ul>

    </>
  )
}

export default App
