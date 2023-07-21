'use client'
import React from 'react'
import { ThemeProvider } from "@material-tailwind/react";
import ReduxProvider from '@/redux/provider';
import { SessionProvider } from 'next-auth/react';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <ThemeProvider>
                <ReduxProvider>
                    {children}
                </ReduxProvider>
            </ThemeProvider>
        </SessionProvider>
    )
}

export default Providers