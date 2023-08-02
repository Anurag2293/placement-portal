'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { useUser } from "@clerk/nextjs";

const navigation = [
    { name: 'Products', href: '/products' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Resources', href: '/resources' },
    { name: 'Pricing', href: '/pricing' },
]

const mobileNavigation = [
    { name: 'Products', href: '/products' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Resources', href: '/resources' },
    { name: 'Pricing', href: '/pricing' }
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function MainNav() {
    const currentPath = usePathname();
    const { isSignedIn: isDeveloperSignedIn } = useUser();

    return (
        <Disclosure as="nav" className="bg-white">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 lg:py-4">
                        <div className="relative flex h-16 items-center justify-between">

                            <div className="flex flex-1 items-center justify-center xl:items-stretch xl:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link className="pl-0 md:pl-8 font-bold text-2xl" href="/">
                                        <div className='flex items-center'>
                                            <span className='block'>HackerCode</span>
                                            <span className='block ml-0.5 text-brand-primary px-2 h-5 bg-brand-primary'></span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="hidden xl:ml-16 xl:block">
                                    <div className="flex space-x-6">
                                        {navigation.map((item) => {
                                            const current = currentPath === item.href;
                                            return (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        current ? 'text-brand-secondary' : 'text-black hover:text-brand-secondary',
                                                        'rounded-md px-3 py-2 text-sm font-semibold'
                                                    )}
                                                    aria-current={current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden xl:flex xl:items-center xl:space-x-3 xl:pr-2">
                                {!isDeveloperSignedIn && (
                                    <Link href="/developer/sign-in">
                                        <button className="text-black text-base font-medium">
                                            {"For candidates"}
                                        </button>
                                    </Link>
                                )}
                                {isDeveloperSignedIn && (
                                    <Link href="/developer">
                                        <button className="text-black text-base font-medium">
                                            {"For candidates"}
                                        </button>
                                    </Link>
                                )}
                                <div className='px-2'>{"|"}</div>
                                <Link href={"/demo"}>
                                    <button className="text-black bg-gray-200 font-medium px-4 py-2 rounded">
                                        {"Watch demo"}
                                    </button>
                                </Link>
                                <Link href={"/access-account"}>
                                    <button className="bg-brand-secondary text-white text-base font-medium px-4 py-2 rounded">
                                        {"Sign up"}
                                    </button>
                                </Link>
                            </div>
                            <div className="absolute inset-y-0 left-0 flex items-center xl:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel>
                        <div className="space-y-4 px-2 pt-2">
                            {navigation.map((item) => {
                                const current = currentPath === item.href;
                                return (
                                    <Link key={item.name} href={item.href} className={classNames(
                                        current ? 'text-brand-secondary' : 'text-black hover:text-brand-secondary',
                                        'block rounded-md px-3 py-2 text-md font-medium'
                                    )}>
                                        <Disclosure.Button
                                            as="div"
                                            aria-current={current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    </Link>
                                )
                            })}
                            {!isDeveloperSignedIn && (
                                <Link href="/developer/sign-in" className={classNames(
                                    (currentPath === "/developer") ? 'text-brand-secondary' : 'text-black hover:text-brand-secondary',
                                    'block rounded-md px-3 py-2 text-md font-medium'
                                )}>
                                    <Disclosure.Button
                                        key={"candidates-sign-in"}
                                        as="div"
                                        aria-current={'page'}
                                    >
                                        {"For candidates"}
                                    </Disclosure.Button>
                                </Link>
                            )}
                            {isDeveloperSignedIn && (
                                <Link href="/developer" className={classNames(
                                    (currentPath === "/developer") ? 'text-brand-secondary' : 'text-black hover:text-brand-secondary',
                                    'block rounded-md px-3 py-2 text-md font-medium'
                                )}>
                                    <Disclosure.Button
                                        key={"candidates-sign-in"}
                                        as="div"
                                        aria-current={'page'}
                                    >
                                        {"For candidates"}
                                    </Disclosure.Button>
                                </Link>
                            )}
                            <div className='bg-gray-800 block'>
                                <hr />
                            </div>
                            <Link
                                href={"/access-account"}
                                className="block text-center bg-brand-secondary text-white text-base font-medium px-12 py-3 rounded"
                            >
                                <button>{"Sign up"}</button>
                            </Link>
                            <Link
                                href={"/demo"}
                                className="block text-center text-black border border-black text-base px-12 py-3 rounded"
                            >
                                <button>{"Watch demo"}</button>
                            </Link>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
