import Link from 'next/link'
import React from 'react'

type Props = {}

const AccessAccount = (props: Props) => {
    return (
        <section className='xl:flex xl:h-5/6'>
            <div className='text-center text-gray-800 xl:text-black xl:w-1/2 xl:mx-auto xl:my-auto'>
                <div className='relative'>
                    <h3 className='w-fit mt-8 mb-2 mx-auto rounded text-white bg-brand-secondary text-xs px-2 py-1 uppercase font-medium'>{"BUSINESS"}</h3>
                    <h1 className='mb-6 text-4xl'>{"For "} <span className='text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary '>{"Companies"}</span>
                    </h1>
                    <div className='w-96 xl:w-3/5 mx-auto'>
                        <p className='mb-6 mx-auto text-lg'>{"We are the market–leading technical interview platform to identify and hire developers with the right skills."}</p>
                    </div>
                    <div className='my-8'>
                        <Link
                            href="/hire/sign-in"
                            className='px-20 py-4 rounded text-base text-white bg-brand-secondary'>
                            {"Login"}
                        </Link>
                    </div>
                    <div>
                        <h2 className='text-base'>{"Don't have an account?"}</h2>
                        <Link className='text-base font-medium hover:cursor-pointer hover:underline' href="/hire/sign-up">{"Get Started"}</Link>
                    </div>
                </div>
            </div>
            <div className='mt-32 text-center text-gray-800 xl:text-black xl:w-1/2 xl:mx-auto xl:my-auto relative'>
                <div>
                    <h1 className='mb-6 text-4xl'>{"For "} <span className='text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary '>{"Developers"}</span>
                    </h1>
                    <div className='w-96 xl:w-3/5 mx-auto'>
                        <p className='mb-6 mx-auto text-lg'>{"Join over 21 million developers, practice coding skills, prepare for interviews, and get hired."}</p>
                    </div>
                    <div className='my-8'>
                        <Link
                            href="/developer/sign-in"
                            className='px-20 py-4 rounded text-base border border-black'>
                            {"Login"}
                        </Link>
                    </div>
                    <div>
                        <h2 className='text-base'>{"Don't have an account?"}</h2>
                        <Link className='text-base font-medium hover:cursor-pointer hover:underline' href="/sign-up">{"Sign up"}</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AccessAccount