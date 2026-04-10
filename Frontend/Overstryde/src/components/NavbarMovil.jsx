import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from './ui/button'
import { Heart, Menu } from 'lucide-react'
import { NavTabs } from './NavTabs'
import { ShoppingBag, User } from "lucide-react";
import { NavLink } from 'react-router-dom'

export const NavbarMovil = () => {
    return (
        <div className='flex w-full px-2 justify-between items-center bg-white shadow-md fixed z-50 md:hidden'>
            <Drawer direction={"left"}>
                <DrawerTrigger asChild className={"bg-transparent"}>
                    <Button className={"h-12"}><Menu /></Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader className={"flex flex-row"}>
                            <div>
                                <DrawerTitle>Explora OVERSTRYD</DrawerTitle>
                                <DrawerDescription>
                                    Encuentra ropa deportiva diseñada para rendimiento y estilo.
                                </DrawerDescription>
                            </div>
                                <NavLink>
                                    <Heart size={25} className="transition-transform duration-300 hover:-translate-y-1" />
                                </NavLink>
                        </DrawerHeader>
                        <DrawerHeader>
                            <NavTabs />
                        </DrawerHeader>
                    </div>
                </DrawerContent>
            </Drawer>
            <div>
                <h2>OVERSTRYDE</h2>
            </div>
            <div className="flex gap-2 align-middle">
                <NavLink to={"/register"} className={""}>
                    <User size={25} className="transition-transform duration-300 hover:-translate-y-1" />
                </NavLink>
                <NavLink>
                    <ShoppingBag size={25} className="transition-transform duration-300 hover:-translate-y-1" />
                </NavLink>
            </div>
        </div>
    )
}
