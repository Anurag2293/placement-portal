'use client'
import React from 'react'
import { ThemeProvider } from "@material-tailwind/react";
import ReduxProvider from '@/redux/provider';

const Providers = ({children} : {children: React.ReactNode}) => {
    return (
        <ThemeProvider>
            <ReduxProvider>
                {children}
            </ReduxProvider>
        </ThemeProvider>
    )
}

export default Providers