'use client'

import React, { useState } from 'react'
import axios from 'axios'
import {
    toast
} from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const ProfilePage = () => {

    const router = useRouter()
    const [data, setData] = useState("")
    
    const getUserDetails = async () => {

        const res = await axios.post('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    const logout = async () => {
        try {
            axios.get('/api/users/api')
            toast.success("Logout Success")
            router.push("/login")
        } catch (error:any) {
           console.log(error.message);
           toast.error(error.message)
            
        }
    }

    return (
        <div>
            <h1>
                Profile Page
            </h1>
            <h2>
                {data === '' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
            <button onClick={logout}>Logout</button>
            <button onClick={getUserDetails}>GetUserDetails</button>
        </div>
    )
}

export default ProfilePage