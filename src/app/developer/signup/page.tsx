import React from 'react'
import SignUp from './sign-up'

type Props = {}

const DeveloperSignUp = (props: Props) => {
    return (
        <>
            <section className='h-5/6 flex justify-center items-center'>
                <SignUp />
            </section>
        </>
    )
}

export default DeveloperSignUp