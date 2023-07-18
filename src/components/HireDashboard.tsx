import { useState } from "react";


export default function HireDashboardComponent() {
    return (
        <main id="page-content" className="flex flex-auto flex-col max-w-full">
            <div className="container bg-red-100 xl:max-w-7xl mx-auto p-4 lg:p-8">
                <div className="w-full h-full flex rounded-xl bg-green-100 border-2 border-dashed border-gray-200 text-gray-400 py-64 dark:bg-gray-800 dark:border-gray-700">
                    Content (max width 1280px)
                </div>
            </div>
        </main>
    )
}