import React from 'react'
import { IconRounded } from '../common/IconRounded'
import { Pencil } from 'lucide-react'

export const DirectionsCard = () => {
    return (
        <div className='flex flex-col shadow-xl border border-gray-200 rounded-2xl'>
            <div className="relative p-3">
                <div className="absolute top-2 right-2 hover:-translate-y-1 duration-300">
                    <IconRounded icon={<Pencil color="#dfc201" />} />
                </div>
                <h1 className='font-semibold'>Casa de lucia</h1>
                <div className='flex flex-col gap-2 items-start pt-6'>
                    <p>Dirección: San Jacinto, Colonia Santa, Clara Casa #6</p>
                    <p>Pais: El Salvador</p>
                    <p>Departamento: San Salvador</p>
                </div>
            </div>
        </div>
    )
}
