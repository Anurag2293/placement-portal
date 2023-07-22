'use client'

import React, { useEffect } from 'react'
import { useAuth, useUser  } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'
import DeveloperNavbar from '@/components/ui/DeveloperNavbar'

type Props = {}

const DeveloperHome = (props: Props) => {
    const { isSignedIn, user } = useUser();
    const router = useRouter()

    useEffect(() => {
        const validateUserWithBackend = async () => {
            try {
                const res = await fetch('/api/developer/validate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({})
                })
                const { success, message, developer } = await res.json()
                if (!success) {
                    throw new Error(message)
                }
                console.log(message)
            } catch (error: any) {
                console.log(error.message)
            }
        }

        if (isSignedIn) {
            validateUserWithBackend()
        } else {
            console.log('User is not signed in')
        }
    }, [isSignedIn, user])

    return (
        <div>
            <DeveloperNavbar />
            <h1 className='text-3xl font-bold'>Welcome, {user?.firstName}!</h1>
        </div>
    )
}

export default DeveloperHome