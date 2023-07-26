'use client'

import React, { useState, useEffect } from 'react'
import { useUser } from "@clerk/nextjs";

type Props = {
    process_id: number
}

const ApplicationButton = ({ process_id }: Props) => {
    const { user, isSignedIn } = useUser()
    const [developerId, setDeveloperId] = useState<number>(-1)
    const [applied, setApplied] = useState<boolean>(false)

    const checkApplication = async (process_id: number, developer_id: number) => {
        try {
            const res = await fetch(`/api/process/apply?process_id=${process_id}&developer_id=${developer_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const { success, message, filteredApplication } = await res.json()
            if (!success) {
                throw new Error(message)
            }
            if (filteredApplication.length === 0) {
                throw new Error('No application found')
            }
            setApplied(true)
        } catch (error: any) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        const fetchDeveloperId = async (developerExternalId: string, setDeveloperIdHook: any) => {
            try {
                const res = await fetch(`/api/developer?external_id=${developerExternalId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const { success, message, developer } = await res.json()
                if (!success) {
                    throw new Error(message)
                }
                setDeveloperIdHook(developer.id)
                checkApplication(process_id, developer.id)
            } catch (error: any) {
                console.error(error.message)
            }
        }

        if (isSignedIn) {
            fetchDeveloperId(user.id, setDeveloperId)
        } else {
            console.log('User is not signed in')
        }
    }, [isSignedIn, user, applied, setApplied, process_id])

    const handleApplication = async () => {
        try {
            const res = await fetch('/api/process/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ process_id, developer_id: developerId })
            })
            const { success, message, application } = await res.json()
            if (!success) {
                throw new Error(message)
            }
            console.log({application})
            checkApplication(process_id, developerId)
            alert(message)
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <>
            {applied ? (
                <button
                    className='w-full md:w-min py-2 px-16 rounded-md italic text-white font-medium bg-dark-gray hover:cursor-not-allowed'>
                    Applied
                </button>
            ) : (
                <button
                    onClick={handleApplication}
                    className='w-full md:w-min py-2 px-16 rounded-md bg-brand-secondary text-white hover:bg-green-900 font-medium'>
                    Apply
                </button>
            ) }
        </>
    )
}

export default ApplicationButton