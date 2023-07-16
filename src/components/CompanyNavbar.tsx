'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Collapse,
} from "@material-tailwind/react";

import CloseNavIcon from "./CloseNavIcon";
import OpenNavIcon from "./OpenNavIcon";

const navHeaders = [
    {
        label: "Dashboard",
        href: "/hire",
    },
    {
        label: "Profile",
        href: "/hire/profile",
    }
]

export default function CompanyNavbar() {
    const pathname = usePathname();
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));

        return () => {
            console.log('Component unmounted')
            window.removeEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
        }
    }, []);

    const navList = (
        <ul className="mb-4 mt-2 text-white flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {navHeaders.map(({ label, href }) => (
                <Link key={label} href={href}>
                    <Typography key={href} className={`text-lg font-medium ${pathname === href ? 'text-white' : 'text-gray-300'}`}>
                        {label}
                    </Typography>
                </Link>
            ))}
        </ul>
    );

    return (
        <Navbar
            variant="gradient"
            color="blue-gray"
            className={`mx-auto max-w-screen-4xl py-2 px-4 lg:px-8 lg:py-4 from-blue-gray-900 to-blue-gray-800 
                    ${pathname === '/hire/sign-in' || pathname === '/hire/sign-up' ? 'hidden' : 'sticky top-0 z-10'}`}
        >
            <div className="w-full mx-auto flex items-center justify-between text-white">
                <Link href={"/"}>
                    <Typography
                        className="mr-4 cursor-pointer py-1.5 font-bold text-2xl tracking-tighter leading-tight"
                    >
                        Placement Portal
                    </Typography>
                </Link>
                <div className="hidden lg:block">{navList}</div>
                <Button variant="gradient" size="sm" className="hidden lg:inline-block">
                    <span>Buy Now</span>
                </Button>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (<OpenNavIcon />) : (<CloseNavIcon />)}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <div className="container mx-auto">
                    {navList}
                    <Button variant="gradient" size="sm" fullWidth className="mb-2">
                        <span>Buy Now</span>
                    </Button>
                </div>
            </Collapse>
        </Navbar>
    );
}