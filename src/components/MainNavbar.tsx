'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

import { Collapse, IconButton, } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, } from "@heroicons/react/24/outline";

export default function MainNavbar() {
    const [openNav, setOpenNav] = useState(false);
    const { isSignedIn: isDeveloperSignedIn } = useUser();

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    return (
        <div className="w-screen bg-blue-200 drop-shadow-2xl">
            <nav className="mx-auto w-full">
                <div className="md:w-4/6 mx-auto flex items-center justify-between text-blue-gray-900">
                    <div className="mr-4 cursor-pointer py-1.5 lg:ml-2">
                        <Link href="/">
                            Placement Portal
                        </Link>
                    </div>
                    <div className="hidden gap-2 lg:flex items-center">
                        <button className="rounded-lg border-2 p-4 drop-shadow-lg">
                            <Link href="/hire/sign-in">{"Log In"}</Link>
                        </button>
                        <button className="text-white font-medium text-base bg-brand-secondary rounded-lg px-4 py-3">
                            <Link href="/hire/sign-up">{"Sign up"}</Link>
                        </button>
                        {!isDeveloperSignedIn && (
                            <button className="rounded-lg border-2 p-4 drop-shadow-lg">
                                <Link href="/developer/sign-in">
                                    {"Candidate Sign In"}
                                </Link>
                            </button>
                        )}
                        {isDeveloperSignedIn && (
                            <button className="rounded-lg border-2 p-4 drop-shadow-lg">
                                <Link href="/developer">
                                    {"Candidate Dashboard"}
                                </Link>
                            </button>
                        )}
                        <button className="rounded-lg border-2 p-4 drop-shadow-lg">
                            <Link href="/developer/sign-up">{"Candidate Sign Up"}</Link>
                        </button>
                    </div>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="lg:hidden"
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                        ) : (
                            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                        )}
                    </IconButton>
                </div>
                
                <Collapse open={openNav}>
                    <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                        <button>
                            Sign In
                        </button>
                        <button>
                            Sign Up
                        </button>
                    </div>
                </Collapse>
            </nav>
        </div>
    );
}