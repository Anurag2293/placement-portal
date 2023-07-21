'use client'

import React from 'react'
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react'

type Props = {}

const HireDashboard = (props: Props) => {
    // AUTH
    const { data: session, status } = useSession();

    // REDUX
    // const dispatch = useDispatch();

    // DATA
    const [processes, setProcesses] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const fetchProcesses = async (company_id: string) => {
        const res = await fetch(`/api/process?company_id=${company_id}`, {
            method: 'GET',
        });
        const data = await res.json();
        setProcesses(data.processes);
    }

    const fetchCompany = async (company_id: string) => {
        const res = await fetch(`/api/company?id=${company_id}`, {
            method: 'GET',
        });
        const data = await res.json();
        if (data.company) {
            fetchProcesses(data.company.id);
        }
    }

    React.useEffect(() => {
        if (session) {
            console.log({session, status})
        }
    }, [session]);

    return (
        <main id="page-content" className="flex flex-auto flex-col max-w-full">
            <div className="container xl:max-w-7xl mx-auto p-4 lg:p-8">
                <div className="min-h-full space-y-4 p-4 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700">
                    <button className='' onClick={() => signOut()}>
                        sign out
                    </button>
                    <p className="font-semibold text-black">Welcome to the Dashboard!</p>
                    <div className="text-black">
                        <p>{"Every Opening for a Role / Post is called a \"Process\" in the system. "}</p>
                        <p>{"You can create a new Process by clicking on the Create Process button below."}</p>
                        <Link href="/hire/create-process">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded">
                                Create Process
                            </button>
                        </Link>
                    </div>
                    <div>
                        <p className="font-semibold text-black">Summary of Processes</p>
                        <div className="flex flex-col my-2">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden border-b border-gray-200 dark:border-gray-700 shadow sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-800">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Process Name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Created On
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th scope="col" className="relative px-6 py-3">
                                                        <span className="sr-only">Edit</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                                {processes.map((process: any) => (
                                                    <tr key={process.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                                                            {process.role}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                            {new Date(process.createdAt).toLocaleDateString('en-GB').replaceAll('/', '-')}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {process.status === 'open' && (
                                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                    Open
                                                                </span>
                                                            )}
                                                            {process.status === 'closed' && (
                                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                                    Open
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <Link href={`/hire/process/${process.id}`}>
                                                                <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default HireDashboard