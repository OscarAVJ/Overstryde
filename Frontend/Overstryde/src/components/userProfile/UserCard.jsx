import React from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export const UserCard = () => {
    return (
        <div className='bg-gray-100 shadow-md w-full h-auto'>
            <div className='flex justify-evenly items-center p-4 md:flex-row flex-col gap-2 w-full h-full'>
                <img src="https://picsum.photos/300/300" loading='lazy' alt="" className='rounded-full h-45 shadow-xl' />
                <div className='flex flex-col items-center gap-2 md:items-start'>
                    <h1 className='text-xl font-semibold'>Oscar Abel Velasquez</h1>
                    <p>oscar.joyar@gmail.com</p>
                    <Badge>Activo</Badge>
                </div>
                <div className='flex flex-col gap-2 mt-1'>
                    <Button>Editar perfil</Button>
                    <Button variant='secondary'>Verificar cuenta</Button>
                </div>
            </div>
        </div>
    )
}
