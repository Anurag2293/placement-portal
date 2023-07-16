'use client'

import React, { useEffect } from 'react'
import { useAppSelector } from '@/redux/store'
import { useRouter} from 'next/navigation'

type Props = {}

const HireHome = (props: Props) => {
    const router = useRouter();
    const {isAuthenticated, name} = useAppSelector(state => state.hireAuth.value);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/hire/sign-in');
        }
    }, [isAuthenticated])

    return (
        <div>
            <h1>Welcome, {name}!</h1>
            <p>Your search ends for talented devs!</p>
        </div>
    )
}

export default HireHome