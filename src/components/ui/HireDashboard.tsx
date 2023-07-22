import { useState } from "react";
import Link from "next/link";

export default function HireDashboardComponent() {
    return (
        <main id="page-content" className="flex flex-auto flex-col max-w-full">
            <div className="container xl:max-w-7xl mx-auto p-4 lg:p-8">
                <div className="min-h-full p-4 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700">
                    <div className="text-black">
                        <p className="font-semibold">Welcome to the Dashboard!</p>
                        <p>Every Opening for a Role / Post is called a "Process" in the system. </p>
                        <p>You can create a new Process by clicking on the "Create Process" button below.</p>
                        <p>The summary of existing Processes is shown below.</p>
                    </div>
                    <div>
                        <Link href="/hire/create-process">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded">
                                Create Process
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}