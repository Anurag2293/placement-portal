'use client'

import React from "react";
import Link from "next/link";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import {
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

import { UserButton } from "@clerk/nextjs";

export default function MainNavbar() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    return (
        <Navbar className="mx-auto max-w-screen-xl px-4 py-2">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5 lg:ml-2"
                >
                    Material Tailwind
                </Typography>

                <div className="hidden gap-2 lg:flex">
                    <Button variant="text" size="sm" color="blue-gray">
                        <Link href="/developer/sign-in">Sign In</Link>
                    </Button>
                    <Button variant="gradient" size="sm">
                        <Link href="/developer/sign-up">Sign Up</Link>
                    </Button>
                    <div>
                        <UserButton afterSignOutUrl="/" />
                    </div>
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
                    <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
                        Sign In
                    </Button>
                    <Button variant="gradient" size="sm" fullWidth>
                        Sign Up
                    </Button>
                </div>
            </Collapse>
        </Navbar>
    );
}