// glad you beat it ~ wish you the best

const App = () => {


  return (

    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button onClick={() => addUser()} className="btn btn-primary m-1" >Add User</button>
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
