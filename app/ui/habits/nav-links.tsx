'use client';  // This will be apart of the client bundle because this is the UI navbar

import {
    ChartBarIcon,
    HomeIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link'; // Prefetch pages and allows to link between pages
import { usePathname } from 'next/navigation'; // Allows us to get the current pathname
import clsx from 'clsx';    // Conditionally apply classNames


// Map of links to display in side navigation
const links = [
    {
        name: 'Home',
        href: '/',
        icon: HomeIcon,
    },
    {
        name: 'Habits',
        href: '/habits',
        icon: ChartBarIcon,
    },
    {
        name: 'Profile',
        href: '/profile',
        icon: UserCircleIcon,
    },
];

export default function NavLinks() {
    const pathname = usePathname(); // Get the current pathname
    
    return (
        <>
        {links.map((link) => {
            const LinkIcon = link.icon;
            return (
                <Link
                    key = {link.name}
                    href = {link.href} 
                    // If the link is the current page, highlight it in the navbar
                    className = {clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md text-black bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                    {
                        'bg-sky-100 text-blue-600': pathname === link.href, // Highlight the current page if selected
                    },
                    )}
                >
                    <LinkIcon className = "w-6" />
                    <p className = "hidden md:block">{link.name}</p> 
                </Link>
            );
        })}
        </>
    );
}