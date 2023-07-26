import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Applications - Placement Portal',
    description: 'Apply to companies and get hired!',
}

export default function DeveloperLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className='h-min min-h-screen bg-gray-200'>
            {children}
        </section>
    )
}
