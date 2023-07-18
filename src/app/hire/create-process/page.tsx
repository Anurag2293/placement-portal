import React from 'react'

import ProcessForm from './Form'

type Props = {}

const CreateProcess = (props: Props) => {
    return (
        <main id="page-content" className="flex flex-auto flex-col max-w-full">
            <div className="container xl:max-w-7xl mx-auto p-4 lg:p-8">
                <div className="min-h-full p-4 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700">
                    <ProcessForm />
                </div>
            </div>
        </main>
    )
}

export default CreateProcess