import React from 'react'
import Link from 'next/link'

import { checkEnvironment } from '@/lib/utils'
import { COMPANY_BUILDING_ICON, LOCATION_ICON } from '@/components/ui/SVGComponents'
import HorizontalSeparator from '@/components/ui/HorizontalSeparator'
import { Process } from '@prisma/client'

type Props = {
    params: {
        id: string
    }
}

const ProcessApplication = async ({ params }: Props) => {
    const { id } = params
    const fetchProcessByProcessId = async (process_id: string | number) => {
        const baseurl = checkEnvironment()
        try {
            const res = await fetch(`${baseurl}/api/process?process_id=${process_id}`, { next: { revalidate: 30 } })
            const { success, message, process } = await res.json()
            if (!success) {
                throw new Error(message)
            }
            return process;
        }
        catch (error: any) {
            console.log(error.message)
            return null
        }
    }
    const process: Process = await fetchProcessByProcessId(id)

    if (!process) {
        return (
            <div className='w-full bg-white py-8'>
                <div className='w-11/12 md:w-5/6 mx-auto'>
                    <h1 className='text-4xl font-semibold'>No Process Found</h1>
                    <Link href='/developer/apply'>
                        <button className='bg-dark-primary text-white px-4 py-2 mt-4 rounded-md'>Go Back</button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full min-h-full bg-white py-16'>
            <div className='w-11/12 md:w-5/6 mx-auto md:flex'>
                <div className='w-full md:w-1/4 text-black bg-inherit md:mr-16'>
                    <h1 className='text-5xl font-bold'>{process.role}</h1>
                    <div className='w-full my-8'>
                        <p className='text-base text-gray-800 font-medium flex items-center space-x-2 mt-0.5 mb-1'>
                            <span><COMPANY_BUILDING_ICON /></span>
                            <span>{process.companyName?.toUpperCase()}</span>
                        </p>
                        <HorizontalSeparator color={"gray-500"} />
                        <p className='text-base text-gray-800 flex items-center space-x-2'>
                            <span><LOCATION_ICON /></span>
                            <span>{process.location_country}</span>
                        </p>
                    </div>
                    <div className='w-full my-8'>
                        <button className='w-full md:w-min py-2 px-16 rounded-md bg-brand-secondary text-white hover:bg-green-900 font-medium'>Apply</button>
                    </div>
                </div>
                <div className='w-full md:w-3/4 bg-inherit border border-gray-300 rounded-md md:p-8 mt-4 md:mt-0'>
                    <div>
                        <p className='text-gray-500'>{process.description}</p>
                    </div>
                    <div className='mt-2'>
                        <h1 className='text-lg text-gray-800'>{"Eligibility"}</h1>
                        <p className='text-gray-500'>{process.eligibility}</p>
                    </div>
                    <div className='mt-2'>
                        <h1 className='text-lg text-gray-800'>{"Compensation"}</h1>
                        <p className='text-gray-500'>{"Rs. "}{process.compensation}{" per annum"}</p>
                    </div>
                    <div className='mt-2'>
                        <h1 className='text-lg text-gray-800'>{"Location"}</h1>
                        <p className='text-gray-500'>{`${process.location_city}, ${process.location_state}, ${process.location_country}`}</p>
                    </div>
                    <div className='mt-2'>
                        <h1 className='text-lg text-gray-800'>{"Mode of Work"}</h1>
                        <p className='text-gray-500'>{process.mode_of_work}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProcessApplication