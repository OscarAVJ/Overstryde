import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { NavbarMovil } from '@/components/NavbarMovil'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
    return (
        <>
            <Navbar />
            <NavbarMovil/>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
