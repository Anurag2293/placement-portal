'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/store'

type Props = {}

const DeveloperHome = (props: Props) => {
    const router = useRouter()
    const isAuthenticated = useAppSelector((state) => state.authReducer.value.isAuthenticated);
    const developerName = useAppSelector((state) => state.authReducer.value.name);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/developer/login')
        } 
    }, [isAuthenticated])

    return (
        <div>
            <h1 className='text-3xl font-bold'>Welcome! {developerName}</h1>
        </div>
    )
}

export default DeveloperHome