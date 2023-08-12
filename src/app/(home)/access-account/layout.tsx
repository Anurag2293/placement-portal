import type { Metadata } from 'next'

import MainNav from '@/components/MainNav'

export const metadata: Metadata = {
    title: 'Access Account - HackerCode',
    description: 'Access Account - HackerCode',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className='h-screen'>
            <header>
                <MainNav />
            </header>
            {children}
        </section>
    )
}
