'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'
import { useAppSelector } from '@/redux/store'
import ProcessForm from './Form'

type Props = {}

const CreateProcess = (props: Props) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { id: hire_id } = useAppSelector(state => state.hire.value);

    useEffect(() => {
        if (!session) {
            router.push('/hire/sign-in');
        }
    }, [session, router])

    return (
        <main id="page-content" className="flex flex-auto flex-col max-w-full">
            <div className="container xl:max-w-7xl mx-auto p-4 lg:p-8">
                <div className="min-h-full p-4 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700">
                    <ProcessForm hire_id={hire_id} />
                </div>
            </div>
        </main>
    )
}

export default CreateProcess