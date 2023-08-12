import type { Metadata } from 'next'

import HireNavbar from '@/components/HireNavbar'
import HireFooter from '@/components/HireFooter'

export const metadata: Metadata = {
	title: 'Hire - Placement Portal',
	description: 'Find the best talent for your company.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<section>
			<div id="page-container" className="flex flex-col mx-auto w-full min-h-screen min-w-[320px] bg-gray-100 dark:text-gray-100 dark:bg-gray-900">
				<HireNavbar />
				{children}
				<HireFooter />
			</div>
		</section>
	)
}
