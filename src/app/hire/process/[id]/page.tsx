'use client'
import React, { useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { reduxlogIn } from '@/redux/features/hire-slice';

import type { Process } from '@prisma/client';

type Props = {
    params: {
        id: string
    }
}

const ProcessHome = ({ params }: Props) => {
    // AUTH
    const { data: session } = useSession();

    // REDUX
    const dispatch = useDispatch<AppDispatch>();

    // UI
    const router = useRouter();
    const { id: process_id } = params;
    const [loading, setLoading] = useState(false);
    const [processDetails, setProcessDetails] = useState<Process>();
    const [applications, setApplications] = useState<any[]>([]);

    useEffect(() => {
        const fetchCompanyID = async (company_id: string) => {
            const res = await fetch(`/api/company?id=${company_id}`);
            const data = await res.json();
            if (data) {
                fetchProcess(String(data.id))
                dispatch(reduxlogIn(data))
            }
        }

        const fetchProcess = async (company_id: string) => {
            try {
                const { success, message, process } = await (await fetch(`/api/process?process_id=${process_id}`)).json();
                const result = await (await fetch(`/api/process/apply?process_id=${process_id}`)).json();
                if (!success) {
                    throw new Error(message);
                }
                setProcessDetails(process);
            } catch (error: any) {
                console.log(error);
            }
        }

        const fetchApplications = async () => {

        }

        if (!session) {
            router.push('/hire/sign-in');
            return;
        }
        else {
            const company_id = session.user.id;
            fetchCompanyID(company_id);
        }
    }, [session, router, dispatch, process_id])

    useEffect(() => {
        console.log({processDetails})
        console.log({applications})
    }, [processDetails, applications])

    return (
        <main id="page-content" className="flex flex-auto flex-col max-w-full">
            <div className="container xl:max-w-7xl mx-auto p-4 lg:p-8">
                <div className="min-h-full p-4 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700">
                    <h1>Process ID : {process_id}</h1>
                    <h1 className='text-4xl font-bold'>{processDetails?.role}</h1>
                    <p className='text-lg'>
                        <span className='font-medium'>{`Location : `}</span>
                        <span className=''>{`${processDetails?.location_city}, ${processDetails?.location_state}, ${processDetails?.location_country}`}</span>
                    </p>
                    <p className='text-base'>
                        <span className='font-medium'>{`Description : `}</span>
                        <span className='text-base'>{processDetails?.description}</span>
                    </p>

                </div>
            </div>
        </main>
    )
}

export default ProcessHome