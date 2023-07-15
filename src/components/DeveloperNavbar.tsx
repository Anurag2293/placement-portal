'use client'

import React, { useState, useEffect } from "react";
import { useAppSelector } from '@/redux/store';
import {
    Navbar,
    MobileNav,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import {
    Bars2Icon,
} from "@heroicons/react/24/outline";

import DeveloperProfileMenu from "./DeveloperProfileMenu";
import DeveloperNavList from "./DeveloperNavList";


export default function DeveloperNavbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const isAuthenticated = useAppSelector((state) => state.authReducer.value.isAuthenticated);

    useEffect(() => {
        window.addEventListener("resize",() => window.innerWidth >= 960 && setIsNavOpen(false));

        return () => {
            window.removeEventListener("resize",() => window.innerWidth >= 960 && setIsNavOpen(false));
        }
    }, []);

    return (
        // <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
        <Navbar className="sticky top z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
            <div className="relative mx-auto flex items-center text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
                >
                    Placement Portal
                </Typography>
                <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
                    <DeveloperNavList />
                </div>
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden"
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>
                {isAuthenticated && <DeveloperProfileMenu />}
            </div>
            <MobileNav open={isNavOpen} className="overflow-scroll">
                <DeveloperNavList />
            </MobileNav>
        </Navbar>
    );
}