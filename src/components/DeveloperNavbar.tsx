'use client'

// NATIVE
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// AUTH
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

// UI
import DevMobileNavList from "./ui/DevMobileNavList";

export default function DeveloperNavbar() {
    const pathname = usePathname();
    const { isSignedIn } = useUser();

    return (
        <nav className="flex justify-between items-center md:justify-between md:items-center h-14 bg-dark-primary text-black shadow-sm" role="navigation">
            <div className="pl-4 md:hidden">
                <DevMobileNavList />
            </div>
            <div className="flex justify-start items-center text-white ">
                <Link className="pl-0 md:pl-8 font-semibold text-xl" href="/">
                    <span>Hacker</span>
                    <span className="text-brand-primary">Code</span>
                </Link>
                <div className="mx-5 md:block hidden text-dark-gray">|</div>
                <div className="md:block hidden">
                    <div className="flex justify-between items-center space-x-4">
                        <div className="">
                            <Link className={`px-4 pb-4 text-gray-400 hover:text-white ${pathname === '/developer' && 'border-b-4 border-brand-primary text-white'}`} href="/developer">
                                Dashboard
                            </Link>
                        </div>
                        <div>
                            <Link className={`px-4 pb-4 text-gray-400 hover:text-white ${pathname === '/developer/apply' && 'border-b-4 border-brand-primary text-white'}`} href="/developer/apply">
                                Apply
                            </Link>
                        </div>
                        <div>
                            <Link className={`px-4 pb-4 text-gray-400 hover:text-white ${pathname === '/developer/practice' && 'border-b-4 border-brand-primary text-white'}`} href="/developer/practice">
                                Practice
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pr-8 md:block">
                {isSignedIn ? <UserButton /> : <Link href="/developer/sign-in">Sign In</Link>}
            </div>
        </nav>
    );
}