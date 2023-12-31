import type { Metadata } from 'next'

import DeveloperNavbar from '@/components/DeveloperNavbar'

export const metadata: Metadata = {
    title: 'Placement Portal',
    description: 'Generated by create next app',
}

export default function DeveloperLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className='h-min min-h-screen bg-dark-primary'>
            <DeveloperNavbar />
            {children}
        </section>
    )
}
