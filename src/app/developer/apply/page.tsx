import React from 'react'

import { checkEnvironment } from '@/lib/utils'
import type { Process } from '@prisma/client'

import { COMPANY_BUILDING_ICON, HORIZONTAL_VIEW_ICON, LOCATION_ICON, STACK_ICON } from '@/components/ui/SVGComponents'
import Link from 'next/link'

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
            <div className='w-full md:w-5/6 mx-auto py-4 bg-dark-primary'>
                <div className='text-center text-white'>
                    <h1 className=' text-4xl font-mono font-bold'>
                        Find your Dream Job in <span className='text-yellow-500'>Tech</span>
                    </h1>
                    <p>
                        Apply to multiple companies with a single application. Get evaluated by the best companies in the world.
                    </p>
                </div>
            </div >
            <div className='w-full bg-white py-8'>
                <div className='w-11/12 md:w-5/6 mx-auto grid grid-cols-1 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 md:gap-4'>
                    {processes.map((process: Process) => {
                        return (
                            <Link key={process.id} href={`/developer/apply/${process.id}`}>
                                <div className='w-full md:h-40 text-black bg-inherit border border-gray-300 rounded-md p-4 mt-4 md:mt-0 hover:border-gray-800 hover:cursor-pointer flex'>
                                    <div className='w-1/3 flex justify-center items-center'>
                                        <HORIZONTAL_VIEW_ICON />
                                    </div>
                                    <div className='w-2/3 my-auto'>
                                        <h1 className='text-xl font-semibold'>{process.role}</h1>
                                        <p className='text-base text-gray-600 font-semibold flex items-center space-x-2 mt-0.5 mb-1'>
                                            <span><COMPANY_BUILDING_ICON /></span>
                                            <span>{process.company_name?.toUpperCase()}</span>
                                        </p>
                                        <p className='text-sm text-gray-600 flex items-center space-x-2'>
                                            <span><LOCATION_ICON /></span>
                                            <span>{process.location_country}</span>
                                        </p>
                                        <p className='text-sm text-gray-600 flex items-start space-x-2'>
                                            <span className='mt-0.5'><STACK_ICON /></span>
                                            <span>{process.eligibility.trim().slice(0, 20)}</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default DeveloperApply