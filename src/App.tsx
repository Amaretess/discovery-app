import axios from 'axios';
import apiClient from './services/api-client';
import React, { useEffect, useState } from 'react'

const App = () => {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {
    apiClient
  })

  return (
    <>
      <ul>

      </ul>
    </>
  )
}

export default App
