'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Fragment, ReactNode, FunctionComponent, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from '@/redux/store';
import { logOut } from "@/redux/features/hire-auth-slice";
import { COMPANY_LOGO, DASHBOARD_ICON, CUSTOMERS_ICON, PROJECTS_ICON, SALES_ICON, SETTINGS_ICON, ACCOUNT_ICON, NOTIFICATIONS_ICON, INBOX_ICON, SIGNOUT_ICON } from "./SVGComponents";

const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/hire', icon: DASHBOARD_ICON },
    { name: 'Projects', href: '/hire/projects', icon: PROJECTS_ICON },
    { name: 'Sales', href: '/hire/sales', icon: SALES_ICON },
    { name: 'Customers', href: '/hire/customers', icon: CUSTOMERS_ICON },
]

interface NavigationItem {
    name: string;
    href: string;
    icon: ReactNode | any;
}


export default function HireNavbar() {
    const pathname = usePathname();
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const { isAuthenticated, name, hrName } = useAppSelector(state => state.hireAuth.value);
    const dispatch = useDispatch<AppDispatch>();

    const handleSignOut = () => {
        dispatch(logOut());
    }

    return (
        <>
            {/**${pathname === '/hire/sign-in' || pathname === '/hire/sign-up' ? 'hidden' : 'sticky top-0 z-10'} */}
            <header id="page-header" className={`flex flex-none items-center bg-white shadow-sm z-1 dark:bg-gray-800 ${pathname === '/hire/sign-in' || pathname === '/hire/sign-up' ? 'hidden' : 'sticky top-0 z-10'}`}>
                <div className="container xl:max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="flex justify-between py-4">
                        {/* Left Section */}
                        <div className="flex items-center">
                            <a href="#" className="group inline-flex items-center space-x-2 font-bold text-lg tracking-wide text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300">
                                <COMPANY_LOGO />
                                <span>Placement Portal X {name}</span>
                            </a>
                        </div>
                        {/* END Left Section */}

                        {/* Right Section */}
                        <div className="flex items-center space-x-2 lg:space-x-5">
                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center space-x-2">
                                {navigation.map((item) => (
                                    <Link key={item.href} href={item.href}>
                                        <div className={`group text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded-lg
                                        ${pathname === item.href ? 'text-blue-600 border border-blue-100 bg-blue-50 dark:text-white dark:bg-gray-700 dark:border-transparent' : 'text-gray-800 border border-transparent hover:text-blue-600 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700 dark:active:border-gray-600'} `}>
                                            <item.icon />
                                            <span>{item.name}</span>
                                        </div>
                                    </Link>
                                ))}
                            </nav>
                            {/* END Desktop Navigation */}

                            {/* User Dropdown */}
                            <Menu as="div" className="relative inline-block">
                                {/* Dropdown Toggle Button */}
                                <Menu.Button className="inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-3 py-2 leading-5 text-sm border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700">
                                    <span>{hrName}</span>
                                    <svg className="hi-mini hi-chevron-down inline-block w-5 h-5 opacity-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                                </Menu.Button>
                                {/* END Dropdown Toggle Button */}

                                {/* Dropdown */}
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="opacity-0 scale-90"
                                    enterTo="opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-90"
                                >
                                    <Menu.Items className="absolute right-0 origin-top-right z-10 mt-2 w-48 shadow-xl rounded-lg dark:shadow-gray-900 focus:outline-none">
                                        <div className="bg-white ring-1 ring-black ring-opacity-5 rounded-lg divide-y divide-gray-100 dark:bg-gray-800 dark:divide-gray-700 dark:ring-gray-700">
                                            <div className="p-2.5 space-y-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={`group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg border border-transparent ${active ? "text-blue-800 bg-blue-50 dark:text-white dark:bg-gray-700/75 dark:border-transparent" : "text-gray-700 hover:text-blue-800 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700/75 dark:active:border-gray-600"
                                                                }`}
                                                        >
                                                            <INBOX_ICON />
                                                            <span className="grow">Inbox</span>
                                                            <div className="font-semibold inline-flex px-1.5 py-0.5 leading-4 text-xs rounded-full border border-blue-200 text-blue-700 bg-blue-100 dark:text-blue-50 dark:bg-blue-700 dark:border-blue-700">2</div>
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={`group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg border border-transparent ${active ? "text-blue-800 bg-blue-50 dark:text-white dark:bg-gray-700/75 dark:border-transparent" : "text-gray-700 hover:text-blue-800 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700/75 dark:active:border-gray-600"
                                                                }`}
                                                        >
                                                            <NOTIFICATIONS_ICON />
                                                            <span className="grow">Notifications</span>
                                                            <div className="font-semibold inline-flex px-1.5 py-0.5 leading-4 text-xs rounded-full border border-blue-200 text-blue-700 bg-blue-100 dark:text-blue-50 dark:bg-blue-700 dark:border-blue-700">5</div>
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                            <div className="p-2.5 space-y-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={`group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg border border-transparent ${active ? "text-blue-800 bg-blue-50 dark:text-white dark:bg-gray-700/75 dark:border-transparent" : "text-gray-700 hover:text-blue-800 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700/75 dark:active:border-gray-600"
                                                                }`}
                                                        >
                                                            <ACCOUNT_ICON />
                                                            <span className="grow">Account</span>
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={`group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg border border-transparent ${active ? "text-blue-800 bg-blue-50 dark:text-white dark:bg-gray-700/75 dark:border-transparent" : "text-gray-700 hover:text-blue-800 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700/75 dark:active:border-gray-600"
                                                                }`}
                                                        >
                                                            <SETTINGS_ICON />
                                                            <span className="grow">Settings</span>
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                            <div className="p-2.5 space-y-1" onClick={handleSignOut}>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={`group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg border border-transparent ${active ? "text-blue-800 bg-blue-50 dark:text-white dark:bg-gray-700/75 dark:border-transparent" : "text-gray-700 hover:text-blue-800 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700/75 dark:active:border-gray-600"
                                                                }`}
                                                        >
                                                            <SIGNOUT_ICON />
                                                            <span className="grow">Sign out</span>
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                                {/* END Dropdown */}
                            </Menu>
                            {/* END User Dropdown */}

                            {/* Toggle Mobile Navigation */}
                            <div className="lg:hidden">
                                <button
                                    onClick={() => setMobileNavOpen(!mobileNavOpen)}
                                    type="button"
                                    className="inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-3 py-2 leading-5 text-sm border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                                >
                                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="hi-solid hi-menu inline-block w-5 h-5"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`lg:hidden ${mobileNavOpen ? "" : "hidden"}`}
                    >
                        <nav className="flex flex-col space-y-2 py-4 border-t dark:border-gray-700">
                            {navigation.map((item) => (
                                <Link key={item.href} href={item.href}>
                                    <div className={`group text-sm font-semibold flex items-center space-x-2 px-3 py-2 rounded-lg
                                        ${pathname === item.href ? 'text-blue-600 border border-blue-50 bg-blue-50 dark:text-white dark:bg-gray-700/75 dark:border-transparent' : 'text-gray-800 border border-transparent hover:text-blue-600 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700 dark:active:border-gray-600'} `}>
                                        <item.icon />
                                        <span>{item.name}</span>
                                    </div>
                                </Link>
                            ))}                            
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}