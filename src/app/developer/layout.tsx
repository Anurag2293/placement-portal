import type { Metadata } from 'next'



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
        <section className='h-screen bg-gray-200'>
            {children}
        </section>
    )
}