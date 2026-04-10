import React from 'react'
import { DrawerDescription, DrawerTitle } from '../ui/drawer'
import { NavLink } from 'react-router-dom'
import { Heart } from 'lucide-react'

export const CustomDrawerHeader = ({title, description, icon}) => {
    return (
        <div className='flex'>
            <div>
                <DrawerTitle>{title}</DrawerTitle>
                <DrawerDescription>
                    {description}
                </DrawerDescription>
            </div>
            <NavLink>
                {icon}
            </NavLink>
        </div>)
}
