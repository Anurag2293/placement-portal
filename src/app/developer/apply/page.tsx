import React from 'react'

import { checkEnvironment } from '@/lib/utils'

type Props = {}

const DeveloperApply = async (props: Props) => {
    const fetchProcesses = async (companyid: string | number) => {
        const baseurl = checkEnvironment()
        try {
            const res = await fetch(`${baseurl}/api/process?company_id=${companyid}`, { next: { revalidate: 30 } })
            const { success, message, processes } = await res.json()
            if (!success) {
                throw new Error(message)
            }
            return processes;
        } catch (error: any) {
            console.log(error)
            return []
        }
    }
    let processes = []
    processes = await fetchProcesses('all')

    return (
        <>
            <div className='w-full md:w-5/6 mx-auto py-4'>
                <div className='w-11/12 mx-auto md:w-1/4 rounded-md p-4 mt-4 md:mt-0'>
                    <h1 className='text-white text-xl font-semibold'>Find the best openings here</h1>
                </div>
                <div className='w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-4'>
                    {processes.map((process: any) => {
                        return (
                            <div className='w-full bg-dark-gray rounded-md p-4 mt-4 md:mt-0'>
                                <h1 className='text-white text-xl font-semibold'>{process.role}</h1>
                                <p className='text-white text-sm font-light'>{process.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default DeveloperApply