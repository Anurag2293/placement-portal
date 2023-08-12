'use client'

import React, { useState, useEffect } from 'react'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { reduxlogIn } from '@/redux/features/hire-slice';

import type { Process } from '@prisma/client';
import HireProcessTable from '@/components/HireProcessTable';

type Props = {}

const HireDashboard = (props: Props) => {
    // AUTH
    const { data: session } = useSession();

    // REDUX
    const dispatch = useDispatch<AppDispatch>();

    // UI
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [processes, setProcesses] = useState<Process[]>([]);
    const [processesWithApplication, setProcessesWithApplication] = useState<any[]>([])

    useEffect(() => {
        const fetchProcesses = async (company_id: string) => {
            try {
                console.log("fetching processes")
                setLoading(true)
                const res = await fetch(`/api/process?company_id=${company_id}`, {
                    method: 'GET',
                });
                const data = await res.json();
                setLoading(false);
                setProcesses(data.processes);
                applicationsForProcess(data.processes);
                console.log({ fetchedProcesses: data.processes})
            } catch (error) {
                alert("Error in fetching process")   
            }
        }

        const applicationsForProcess = async (processes: Process[]) => {
            try {
                const PopulatedApplications: any[] = await Promise.all(processes.map(async (process: Process) => {
                    const response = await fetch(`/api/process/apply?process_id=${process.id}`);
                    const { success, message, applications, populatedApplications } = await response.json();
                    return populatedApplications;
                }));
                setProcessesWithApplication(PopulatedApplications);
                console.log({PopulatedApplications})
            } catch (error) {
                alert("Error in fetching process in applications")
            }
        }

        const fetchCompany = async (company_id: string) => {
            const res = await fetch(`/api/company?id=${company_id}`, {
                method: 'GET',
            });
            const data = await res.json();
            if (data) {
                fetchProcesses(String(data.id));
            }
            dispatch(reduxlogIn(data));
        }

        if (!session) {
            router.push('/hire/sign-in');
        } 
        else if (session) {
            const company_id = session.user?.id;
            fetchCompany(company_id);
        }
    }, [session, router, dispatch]);

    return (
        <main id="page-content" className="flex flex-auto flex-col max-w-full">
            <div className="container xl:max-w-7xl mx-auto p-4 lg:p-8">
                <div className="min-h-full space-y-4 p-4 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700">
                    <p className="font-semibold text-black">{`Welcome to the Dashboard!`}</p>
                    <div className="text-black">
                        <p>{`Every Opening for a Role / Post is called a "Process" in the system. `}</p>
                        <p>{`You can create a new Process by clicking on the Create Process button below.`}</p>
                        <Link href="/hire/create-process">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded">
                                {`Create Process`}
                            </button>
                        </Link>
                    </div>
                    <div>
                        <p className="font-semibold text-black">{`Summary of Processes`}</p>
                        {!loading && processes.length === 0 && <p>{`No Process Found.`}</p>}
                        {loading && <p>{`Loading...`}</p>}
                        {processes.length > 0 
                            && processesWithApplication.length > 0 
                            && <HireProcessTable processes={processes} processesWithApplication={processesWithApplication} />}
                    </div>

                </div>
            </div>
        </main>
    )
}

export default HireDashboard