import SideNav from "@/app/ui/habits/sidenav";
import React from 'react';

export default function Layout( { children } : {children : React.ReactNode}) {
    return (
        <div className = "flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className = "w-full flex-none md:w-64">
                <SideNav/>
            </div>
            <div className = "flex-grow p-6 md:overflow-y0auto md:p-12">{children}
            </div>
        </div>
    );
}