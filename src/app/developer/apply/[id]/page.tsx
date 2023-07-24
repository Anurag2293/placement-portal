import React from 'react'

type Props = {
    params: {
        id: string
    }
}

const ProcessApplication = ({ params }: Props) => {

    return (
        <div className='text-white'>This is Job Application for Job ID : {params.id}</div>
    )
}

export default ProcessApplication