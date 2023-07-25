'use client'

import React, { useEffect } from 'react'
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

import DevActionMenu from '@/components/ui/DevNavMenu';

type Props = {}

const DeveloperHome = (props: Props) => {
    const router = useRouter()
    const { isSignedIn, user } = useUser();

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
            router.refresh()
            console.log(user)
        } else {
            console.log('User is not signed in')
        }
    }, [isSignedIn, user])

    return (
        <>
            <section className='w-full bg-[#050c1b] md:bg-dark-secondary'>
                <div className='w-full md:w-5/6 mx-auto py-4'>
                    <div className='w-full md:w-1/4 rounded-md p-4 mt-4 md:mt-0'>
                        <h1 className='text-white text-xl font-semibold'>Welcome, {user?.fullName}</h1>
                        <p className='text-white text-sm font-light'>You are logged in as a developer</p>
                    </div>
                    <div className='ml-4 my-0 md:my-4'>
                        <DevActionMenu />
                    </div>
                </div>
            </section>
            <section>
                <div id='applications' className='w-full md:w-5/6 mx-auto py-4'>
                    <h1>Applications</h1>
                    
                </div>
            </section>
        </>
    )
}

export default DeveloperHome