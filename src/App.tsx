// glad you beat it ~ wish you the best

import { useState } from "react"

const App = () => {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  return (

    <>
      {<p className="text-danger"></p>}
      {<div className="spinner-border"></div>}
      <button className="btn btn-primary m-1" >Add User</button>
      <ul className='list-group '>

        <li className='list-group-item d-flex justify-content-between'>
          <div >
            <button className='btn btn-outline-danger mx-1' >Delete</button>
            <button className='btn btn-outline-secondary' >Update</button>
          </div>
        </li>

      </ul>
    </>
  )
}

export default App
