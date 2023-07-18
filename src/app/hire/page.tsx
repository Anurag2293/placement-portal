'use client'

import React, { useEffect } from 'react'
import { useAppSelector } from '@/redux/store'
import { useRouter} from 'next/navigation'

import HireDashboardComponent from '@/components/HireDashboard'

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
            <HireDashboardComponent />
        </div>
    )
}

export default HireDashboard