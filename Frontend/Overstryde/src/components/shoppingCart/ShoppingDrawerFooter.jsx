import React from 'react'
import { Button } from '../ui/button'

export const CustomDrawerFooter = () => {
    return (
        <div className='flex flex-col gap-2'>
            <p>Sub total: $190</p>
            <p>Descuentos: $20</p>
            <p>Total: $170</p>
            <Button>Ordenar</Button>
        </div>
    )
}
