'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const LoginPage = () => {
  const Router = useRouter()

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      console.log("Login Success", response.data, "\n\n", response);
      Router.push('/profile')

    } catch (error: any) {
      console.log("Login Failed")
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }

  }, [user])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <br />
      <hr className='text-white border-white border w-screen' />
      <hr className='text-white border-white border w-screen' />

      <br />
      <hr className='text-white border-white border w-screen' />
      <label htmlFor="email">Email</label>
      <input type="text"
        name="email"
        id="email"
        value={user.email}
        onChange={e => setUser({ ...user, email: e.target.value })}
        placeholder='email'
        className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black' />
      <hr />

      <br />
      <hr className='text-white border-white border w-screen' />
      <label htmlFor="username">Password</label>
      <input type="password"
        name="password"
        id="password"
        value={user.password}
        onChange={e => setUser({ ...user, password: e.target.value })}
        placeholder='password'
        className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black' />
      <hr className='text-white border-white border w-screen' />

      <button className="p-5 m-4 border-white border disabled:border-white"
        disabled={buttonDisabled}
        onClick={onLogin}>
        {buttonDisabled ? 'Please Fill The Details' : "Login"}
      </button>

      <Link href="/signup">Visit Signup Page</Link>

    </div>
  )
}

export default LoginPage