import { Button } from '../ui/button'
import { NavLink } from 'react-router-dom'
import { DrawerClose } from '../ui/drawer'
import useCart from '@/hooks/useCart'

export const CustomDrawerFooter = () => {
    const { cart } = useCart()
    const subtotal = cart?.total || 0
    const discounts = 0
    const total = subtotal - discounts

    return (
        <div className='flex flex-col gap-2'>
            <p>Sub total: ${subtotal}</p>
            <p>Descuentos: ${discounts}</p>
            <p>Total: ${total}</p>
            <DrawerClose asChild>
                <NavLink to="/checkoutPayment">
                    <Button className="w-full" disabled={!cart?.products?.length}>Ordenar</Button>
                </NavLink>
            </DrawerClose>
        </div>
    )
}
