'use client'

import React, { useEffect } from 'react'
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

import DevActionMenu from '@/components/ui/DevNavMenu';
import HireTable from '@/components/HireTable';

type Props = {}

const DeveloperHome = (props: Props) => {
    const router = useRouter()
    const { isSignedIn, user } = useUser();
    const [applications, setApplications] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [developerId, setDeveloperId] = React.useState<Number>(-1)

    useEffect(() => {
        if (isSignedIn) {
            router.refresh()
        } else {
            console.log('User is not signed in')
        }
    }, [isSignedIn, user, router])

    const fetchDeveloperApplications = async () => {
        try {
            const res = await fetch(`/api/process/apply?developer_id=${developerId}`)
            const { success, message, populatedApplications } = await res.json()

            if (!success) {
                throw new Error(message)
            }

            setApplications(populatedApplications)
        } catch (error: any) {
            setApplications([])
            alert(error.message)
        }
    }

    useEffect(() => {
        const fetchDeveloperId = async () => {
            try {
                const res = await fetch(`/api/developer?external_id=${user?.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const { success, message, developer } = await res.json()
                if (!success) {
                    throw new Error(message)
                }
                setDeveloperId(developer.id)
            } catch (error: any) {
                console.error(error.message)
            }
        }

        router.refresh();
        setLoading(true);
        fetchDeveloperId();
        fetchDeveloperApplications();
        setLoading(false);
    }, [developerId, user?.id, router])

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
                    <h1 className='text-white text-xl font-semibold'>Applications</h1>
                    {applications.length > 0 ? (
                        <HireTable applications={applications} />
                    ) : loading ? (
                        <div className='w-full md:w-1/2'>
                            <p className='text-white text-center text-md font-semibold'>Loading...</p>
                        </div>
                    ) : (
                        <div className='w-full md:w-1/2'>
                            <p className='text-white text-sm font-light'>You have not applied to any processes yet</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default DeveloperHome