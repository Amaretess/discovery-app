import axios from "axios";
import { useEffect, useState } from "react"

const App = () => {

  const [users, setUsers] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    axios.get()
  }, [])

  return (
    <div>

    </div>
  )
}

export default App
