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
import { Button } from '../ui/button'
import { Heart, Menu, X } from 'lucide-react'
import { NavTabs } from './NavTabs'
import { ShoppingBag, User } from "lucide-react";
import { NavLink } from 'react-router-dom'
import { CustomDrawer } from '../common/CustomDrawer'
import { ShoppingCart } from '../shoppingCart/ShoppingCart'
import { CustomDrawerHeader } from '../common/CustomDrawerHeader'


export const NavbarMovil = () => {

    return (
        <div className='flex w-full px-2 justify-between items-center bg-white shadow-md fixed z-50 md:hidden'>
            <CustomDrawer direction={"left"} icon={<Menu />} header={<CustomDrawerHeader title={"Explora OVERSTRYD"} description={"Encuentra ropa deportiva diseñada para rendimiento y estilo"} icon={<Heart size={25} className="transition-transform duration-300 hover:-translate-y-1" />
            } />} content={<NavTabs />
            } />
            <div>
                <h2>OVERSTRYDE</h2>
            </div>
            <div className="flex gap-2 align-middle">
                <NavLink to={"/register"} className={"py-3.5"}>
                    <User size={20} className="transition-transform duration-300 hover:-translate-y-1" />
                </NavLink>
                <CustomDrawer direction={"right"} icon={<ShoppingBag size={25} className="transition-transform duration-300 hover:-translate-y-1 text-black" />} header={<CustomDrawerHeader title={"Carrito de compras"} description={"Todas las prendas que tu escojas estarán aca"} icon={<DrawerClose>
                    <Button className={"bg-transparent"}><X size={25} /></Button>
                </DrawerClose>
                } />} content={<ShoppingCart />
                } />
            </div>
        </div>
    )
}
