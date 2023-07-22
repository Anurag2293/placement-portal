'use client'

import React, { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import {
    Navbar,
    Typography,
    IconButton,
    Collapse,
    Menu
} from "@material-tailwind/react";
import {
    Bars2Icon,
} from "@heroicons/react/24/outline";

import DeveloperNavList from "./ui/DeveloperNavList";


export default function DeveloperNavbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    useEffect(() => {
        window.addEventListener("resize",() => window.innerWidth >= 960 && setIsNavOpen(false));

        return () => {
            window.removeEventListener("resize",() => window.innerWidth >= 960 && setIsNavOpen(false));
        }
    }, []);

    return (
        <Navbar className="sticky top z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
            <div className="relative mx-auto flex justify-between items-center text-blue-gray-900">
                <Typography
                    as="a"
                    href="/"
                    className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
                >
                    <h1 className="text-2xl font-bold">{"Placement Portal"}</h1>
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
                <div>
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
            <Collapse open={isNavOpen} className="overflow-scroll">
                <DeveloperNavList />
            </Collapse>
        </Navbar>
    );
}