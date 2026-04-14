import React from 'react'
import { Button } from '../ui/button'
import { NavLink } from 'react-router-dom'
import { DrawerClose } from '../ui/drawer'

export const CustomDrawerFooter = () => {

    return (
        <div className='flex flex-col gap-2'>
            <p>Sub total: $190</p>
            <p>Descuentos: $20</p>
            <p>Total: $170</p>
            <DrawerClose asChild>
                <NavLink to="/checkoutPayment">
                    <Button className="w-full">Ordenar</Button>
                </NavLink>
            </DrawerClose>
        </div>
    )
}
