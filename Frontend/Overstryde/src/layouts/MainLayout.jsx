import { Footer } from '@/components/common/Footer'
import { Navbar } from '@/components/home/Navbar'
import { NavbarMovil } from '@/components/home/NavbarMovil'
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
