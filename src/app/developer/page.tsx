'use client'

import React, { useEffect } from 'react'
import { useAuth, useUser  } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'

type Props = {}

const DeveloperHome = (props: Props) => {
    const { isSignedIn, user } = useUser();
    const router = useRouter()

    useEffect(() => {
        if (isSignedIn) {
            console.log('User is signed in')
            console.log({user})
        } else {
            console.log('User is not signed in')
        }
    }, [isSignedIn, user])

    return (
        <div>
            <h1 className='text-3xl font-bold'>Welcome, {user?.firstName}!</h1>
        </div>
    )
}

export default DeveloperHome