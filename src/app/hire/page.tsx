'use client'

import React, { useEffect } from 'react'
import { useAppSelector } from '@/redux/store'
import { useRouter} from 'next/navigation'

type Props = {}

const HireDashboard = (props: Props) => {
    const router = useRouter();
    const {isAuthenticated, name, hrName } = useAppSelector(state => state.hireAuth.value);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/hire/sign-in');
        }
    }, [isAuthenticated])

    return (
        <div>
            <h1 className='text-2xl font-bold'>Welcome, {name}!</h1>
        </div>
    )
}

export default HireDashboard