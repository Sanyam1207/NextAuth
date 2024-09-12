"use client"

import axios from 'axios';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const VarifyEmailPage = () => {

  // const router = useRouter()
  const [token, setToken] = useState("");
  const [varified, setVarified] = useState(false)
  const [error, setError] = useState(false)

  const varifyUserEmail = async () => {
    try {
      await axios.post('/api/users/varifyemail', { token })
      setVarified(true)
    } catch (error: any) {
      setError(true)
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];

    // const { query } = router
    // const urlToken = query.token
    setToken(urlToken || "")
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      varifyUserEmail()
    }
  }, [token])



  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl text-center'> Varify Email </h1>
      <h2 className='p-4 bg-orange-400 text-black'>
        {token ? `${token}` : "No Token"}
      </h2>
      {varified && (
        <div>
          <h2>Varified</h2>
          <Link href='/login'>Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2>error</h2>
          <Link href='/login'>Login</Link>
        </div>
      )}
    </div>
  )
}

export default VarifyEmailPage