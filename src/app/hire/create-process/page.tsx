'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAppSelector } from '@/redux/store'
import ProcessForm from './Form'

type Props = {}

const CreateProcess = (props: Props) => {
    const router = useRouter();
    const { isAuthenticated, name, hrName, id } = useAppSelector(state => state.hireAuth.value);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/hire/sign-in');
        }
    }, [isAuthenticated, router])

    return (
        <main id="page-content" className="flex flex-auto flex-col max-w-full">
            <div className="container xl:max-w-7xl mx-auto p-4 lg:p-8">
                <div className="min-h-full p-4 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700">
                    <ProcessForm company_id={id} />
                </div>
            </div>
        </main>
    )
}

export default CreateProcess