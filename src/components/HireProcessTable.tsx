import React from 'react'
import Link from 'next/link';
import type { Process } from '@prisma/client';

type Props = {
    processes: Process[],
    processesWithApplication: any[]
}

const HireProcessTable = ({ processes, processesWithApplication }: Props) => {
    return (
        <div className="flex flex-col my-2">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-b border-gray-200 dark:border-gray-700 shadow sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        {`Process Name`}
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        {`Created On`}
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        {`Applicants`}
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        {`Status`}
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">{`Edit`}</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                {processes.map((process: Process, index) => (
                                    <tr key={process.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                                            {process.role}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            {new Date(process.createdAt).toLocaleDateString('en-GB').replaceAll('/', '-')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                            <span className='block text-left ml-8'>{processesWithApplication[index].length}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {process.status === 'open' && (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {`Open`}
                                                </span>
                                            )}
                                            {process.status === 'closed' && (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                    {`Open`}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href={`/hire/process/${process.id}`}>
                                                <button className="text-indigo-600 hover:text-indigo-900">{`View Details`}</button>
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
    )
}

export default HireProcessTable